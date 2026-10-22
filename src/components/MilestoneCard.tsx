"use client";

import React, { useState } from "react";
import { Milestone } from "@/lib/types";
import { CheckCircle2, ShieldCheck, AlertCircle, ArrowUpRight, Lock, DollarSign, Bot, Loader2, Sparkles } from "lucide-react";

interface MilestoneCardProps {
  milestone: Milestone;
  onUpdate: (updated: Milestone) => void;
}

export function MilestoneCard({ milestone, onUpdate }: MilestoneCardProps) {
  const [deliverableInput, setDeliverableInput] = useState(milestone.deliverableValue || "");
  const [funding, setFunding] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [releasing, setReleasing] = useState(false);

  const handleFundWithPayPal = async () => {
    setFunding(true);
    try {
      const res = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: milestone.amount,
          currency: milestone.currency,
          milestoneTitle: milestone.title,
        }),
      });
      const data = await res.json();
      if (data.success) {
        onUpdate({
          ...milestone,
          status: "funded",
          paypalOrderId: data.order.id,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFunding(false);
    }
  };

  const handleVerifyDeliverable = async () => {
    if (!deliverableInput) return;
    setVerifying(true);
    try {
      const res = await fetch("/api/contracts/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          milestone,
          deliverableValue: deliverableInput,
        }),
      });
      const data = await res.json();
      if (data.success) {
        onUpdate({
          ...milestone,
          deliverableValue: deliverableInput,
          status: data.report.passed ? "verified" : "in_review",
          verificationReport: data.report,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setVerifying(false);
    }
  };

  const handleReleaseFunds = async () => {
    if (!milestone.paypalOrderId) return;
    setReleasing(true);
    try {
      const res = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: milestone.paypalOrderId }),
      });
      const data = await res.json();
      if (data.success) {
        onUpdate({
          ...milestone,
          status: "verified",
          paypalCaptureId: data.capture.id,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setReleasing(false);
    }
  };

  const getStatusBadge = () => {
    switch (milestone.status) {
      case "pending_funding":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20"><Lock className="w-3 h-3" /> Unfunded Hold</span>;
      case "funded":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"><ShieldCheck className="w-3 h-3" /> PayPal Escrow Active</span>;
      case "in_review":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20"><Bot className="w-3 h-3" /> AI Evaluating</span>;
      case "verified":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><CheckCircle2 className="w-3 h-3" /> Verified & Released</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#121826] border border-gray-800 rounded-2xl p-6 shadow-xl hover:border-gray-700 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-gray-800/80">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-white tracking-tight">{milestone.title}</h3>
            {getStatusBadge()}
          </div>
          <p className="text-sm text-gray-400 mt-1 max-w-2xl">{milestone.description}</p>
        </div>
        <div className="flex sm:flex-col items-baseline sm:items-end justify-between">
          <span className="text-2xl font-bold text-white tracking-tight flex items-center">
            <span className="text-gray-400 text-lg mr-1">$</span>{milestone.amount.toLocaleString()}
          </span>
          <span className="text-xs text-gray-400 uppercase tracking-wider font-mono">USD Escrow</span>
        </div>
      </div>

      {/* Acceptance Criteria */}
      <div className="my-5">
        <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Automated Acceptance Criteria
        </h4>
        <div className="grid grid-cols-1 gap-2">
          {milestone.acceptanceCriteria.map((crit, i) => (
            <div key={i} className="flex items-start gap-2.5 bg-[#0D121F] border border-gray-800/60 rounded-lg p-2.5 text-xs text-gray-300">
              <span className="text-blue-400 font-mono font-bold">{i + 1}.</span>
              <span>{crit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Zone */}
      <div className="pt-4 border-t border-gray-800/80 flex flex-col gap-4">
        {milestone.status === "pending_funding" && (
          <div className="flex items-center justify-between bg-blue-950/20 border border-blue-900/40 rounded-xl p-4">
            <div className="text-xs text-gray-300">
              <span className="font-semibold text-blue-300">Client Action Required:</span> Fund this milestone into secure PayPal escrow hold to authorize freelancer development.
            </div>
            <button
              onClick={handleFundWithPayPal}
              disabled={funding}
              className="px-5 py-2.5 bg-[#0070BA] hover:bg-[#003087] text-white font-medium text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
            >
              {funding ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <DollarSign className="w-3.5 h-3.5" />}
              Fund with PayPal (${milestone.amount})
            </button>
          </div>
        )}

        {milestone.status === "funded" && (
          <div className="bg-[#0E1424] border border-gray-800 rounded-xl p-4">
            <label className="block text-xs font-medium text-gray-300 mb-2">
              Freelancer Deliverable Submission (Live URL or GitHub Repository):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="https://github.com/my-org/repo or https://my-app.vercel.app"
                value={deliverableInput}
                onChange={(e) => setDeliverableInput(e.target.value)}
                className="flex-1 bg-[#090D16] border border-gray-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleVerifyDeliverable}
                disabled={verifying || !deliverableInput}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-medium text-xs rounded-xl transition-all flex items-center gap-2 whitespace-nowrap"
              >
                {verifying ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Bot className="w-3.5 h-3.5" />}
                Trigger AI Audit
              </button>
            </div>
          </div>
        )}

        {/* Verification Report */}
        {milestone.verificationReport && (
          <div className="bg-[#0B0F19] border border-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-200">Autonomous Verification Telemetry</span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${milestone.verificationReport.passed ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
                  Score: {milestone.verificationReport.score}/100
                </span>
              </div>
              <span className="text-[10px] text-gray-500 font-mono">
                {new Date(milestone.verificationReport.verifiedAt).toLocaleTimeString()}
              </span>
            </div>
            <div className="space-y-1.5 mb-4">
              {milestone.verificationReport.findings.map((f, idx) => (
                <div key={idx} className="text-xs text-gray-300 font-mono bg-black/40 px-2.5 py-1 rounded">
                  {f}
                </div>
              ))}
            </div>

            {milestone.status !== "verified" && milestone.verificationReport.passed && (
              <div className="flex items-center justify-between pt-3 border-t border-gray-800/80">
                <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4" /> All acceptance criteria verified! Ready for instant disbursal.
                </span>
                <button
                  onClick={handleReleaseFunds}
                  disabled={releasing}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-emerald-950"
                >
                  {releasing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                  Release PayPal Funds (${milestone.amount})
                </button>
              </div>
            )}
          </div>
        )}

        {milestone.status === "verified" && (
          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Funds released via PayPal. Capture ID: <code className="font-mono text-white">{milestone.paypalCaptureId || "CAP-SIMULATED"}</code></span>
            </div>
            <span className="text-xs text-gray-400 font-mono">Completed</span>
          </div>
        )}
      </div>
    </div>
  );
}
