"use client";

import React, { useState } from "react";
import { Contract, Milestone } from "@/lib/types";
import { MilestoneCard } from "@/components/MilestoneCard";
import { Shield, Sparkles, Bot, DollarSign, ArrowRight, CheckCircle2, Lock, Cpu, Globe, ExternalLink, Loader2 } from "lucide-react";

const INITIAL_PROMPT = "Design and build an enterprise Next.js web application with PostgreSQL database, OAuth auth, PayPal checkout flow, and 95+ mobile Lighthouse performance.";

export default function Home() {
  const [prompt, setPrompt] = useState(INITIAL_PROMPT);
  const [budget, setBudget] = useState(1500);
  const [generating, setGenerating] = useState(false);
  const [contract, setContract] = useState<Contract | null>(null);

  const handleGenerateContract = async (customPrompt = prompt, customBudget = budget) => {
    setGenerating(true);
    try {
      const res = await fetch("/api/contracts/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: customPrompt,
          totalBudget: customBudget,
          clientName: "Horizon Digital Inc.",
          freelancerName: "Ashok Pasala & Team",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setContract(data.contract);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  const handleUpdateMilestone = (updated: Milestone) => {
    if (!contract) return;
    const newMilestones = contract.milestones.map((m) => (m.id === updated.id ? updated : m));
    setContract({
      ...contract,
      milestones: newMilestones,
    });
  };

  // Financial summary stats
  const totalAmount = contract ? contract.totalAmount : 0;
  const fundedAmount = contract
    ? contract.milestones
        .filter((m) => m.status === "funded" || m.status === "in_review" || m.status === "verified")
        .reduce((sum, m) => sum + m.amount, 0)
    : 0;
  const releasedAmount = contract
    ? contract.milestones
        .filter((m) => m.status === "verified")
        .reduce((sum, m) => sum + m.amount, 0)
    : 0;

  return (
    <div className="min-h-screen bg-[#0A0D14] text-gray-100 flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="border-b border-gray-800/80 bg-[#0E131F]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/30">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-white flex items-center gap-2">
                PactFlow <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-semibold">AI Escrow</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="hidden sm:flex items-center gap-2 bg-[#121826] border border-gray-800 px-3 py-1.5 rounded-full text-gray-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>PayPal Orders v2 Sandbox</span>
            </div>
            <a
              href="https://github.com/ashokwebs/pactflow"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-white transition flex items-center gap-1"
            >
              GitHub <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-10 flex-1 w-full space-y-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" /> Built for the PayPal AI Global Hackathon 2026
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Autonomous Milestone Escrow <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-400">
              Verified by AI. Powered by PayPal.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Eliminate scope disputes, delayed payments, and manual milestone tracking. Turn natural language agreements into PayPal-backed smart milestone contracts with autonomous criteria evaluation.
          </p>
        </div>

        {/* Contract Prompt Box */}
        <div className="bg-[#121826] border border-gray-800 rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <Bot className="w-4 h-4 text-blue-400" /> Natural Language Project Scope to Milestone Contract
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400">Budget ($):</span>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-20 bg-[#0A0D14] border border-gray-700 rounded-lg px-2 py-1 text-white font-mono text-xs focus:outline-none focus:border-blue-500 text-right"
              />
            </div>
          </div>

          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the project scope, required features, and deliverables..."
            className="w-full bg-[#0A0D14] border border-gray-700/80 rounded-xl p-3.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none font-sans leading-relaxed"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-gray-800">
            <div className="flex flex-wrap gap-2 text-[11px] text-gray-400">
              <span className="text-gray-500 py-1">Presets:</span>
              <button
                type="button"
                onClick={() => {
                  const p = "E-Commerce multi-vendor storefront with Next.js, Stripe & PayPal split payouts, and automated order fulfillment.";
                  setPrompt(p);
                  setBudget(2400);
                  handleGenerateContract(p, 2400);
                }}
                className="px-2.5 py-1 bg-[#1A2234] hover:bg-gray-800 rounded-lg border border-gray-700/60 text-gray-300 transition"
              >
                E-Commerce Store ($2,400)
              </button>
              <button
                type="button"
                onClick={() => {
                  const p = "Mobile cross-platform React Native app with biometric login, offline sync, and real-time push notifications.";
                  setPrompt(p);
                  setBudget(1800);
                  handleGenerateContract(p, 1800);
                }}
                className="px-2.5 py-1 bg-[#1A2234] hover:bg-gray-800 rounded-lg border border-gray-700/60 text-gray-300 transition"
              >
                Mobile App ($1,800)
              </button>
              <button
                type="button"
                onClick={() => {
                  const p = "Smart contract audit, fuzzing testing suite, and formal verification report for EVM decentralized protocol.";
                  setPrompt(p);
                  setBudget(3500);
                  handleGenerateContract(p, 3500);
                }}
                className="px-2.5 py-1 bg-[#1A2234] hover:bg-gray-800 rounded-lg border border-gray-700/60 text-gray-300 transition"
              >
                Security Audit ($3,500)
              </button>
            </div>

            <button
              onClick={() => handleGenerateContract()}
              disabled={generating || !prompt}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-medium text-xs rounded-xl shadow-lg shadow-blue-950 transition flex items-center gap-2 whitespace-nowrap ml-auto"
            >
              {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Generate PayPal Escrow Contract
            </button>
          </div>
        </div>

        {/* Live Contract View */}
        {contract && (
          <div className="space-y-6">
            {/* Ledger Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-[#121826] border border-gray-800 rounded-2xl p-4">
                <span className="text-xs text-gray-400">Total Contract Value</span>
                <div className="text-2xl font-bold text-white mt-1 font-mono">${totalAmount.toLocaleString()}</div>
                <span className="text-[10px] text-gray-500">Fixed Milestone Scope</span>
              </div>
              <div className="bg-[#121826] border border-blue-900/40 rounded-2xl p-4">
                <span className="text-xs text-blue-300">PayPal Escrow Held</span>
                <div className="text-2xl font-bold text-blue-400 mt-1 font-mono">${fundedAmount.toLocaleString()}</div>
                <span className="text-[10px] text-blue-500/80">Authorized Capture Hold</span>
              </div>
              <div className="bg-[#121826] border border-emerald-900/40 rounded-2xl p-4">
                <span className="text-xs text-emerald-300">Released to Freelancer</span>
                <div className="text-2xl font-bold text-emerald-400 mt-1 font-mono">${releasedAmount.toLocaleString()}</div>
                <span className="text-[10px] text-emerald-500/80">Automated AI Approvals</span>
              </div>
              <div className="bg-[#121826] border border-gray-800 rounded-2xl p-4">
                <span className="text-xs text-gray-400">Dispute Shield</span>
                <div className="text-2xl font-bold text-purple-400 mt-1 font-mono">100%</div>
                <span className="text-[10px] text-purple-400/80">Objective Criteria Verification</span>
              </div>
            </div>

            {/* Contract Meta Info */}
            <div className="bg-[#0D121F] border border-gray-800 rounded-xl p-4 flex flex-wrap items-center justify-between text-xs text-gray-400 gap-4">
              <div>
                <span className="text-gray-500">Contract ID:</span> <span className="font-mono text-gray-200">{contract.id}</span>
              </div>
              <div>
                <span className="text-gray-500">Client:</span> <span className="text-gray-200 font-medium">{contract.clientName}</span> ({contract.clientEmail})
              </div>
              <div>
                <span className="text-gray-500">Freelancer:</span> <span className="text-gray-200 font-medium">{contract.freelancerName}</span> ({contract.freelancerEmail})
              </div>
              <div>
                <span className="text-gray-500">Status:</span> <span className="text-blue-400 font-medium uppercase font-mono">{contract.status}</span>
              </div>
            </div>

            {/* Milestone List */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Structured Milestones & Delivery Pipeline
              </h2>
              {contract.milestones.map((m) => (
                <MilestoneCard key={m.id} milestone={m} onUpdate={handleUpdateMilestone} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/80 bg-[#0E131F]/60 py-6 text-center text-xs text-gray-500">
        <p>PactFlow — Built for the PayPal AI Global Hackathon 2026. Powered by PayPal Orders v2 & Automated LLM Verification.</p>
      </footer>
    </div>
  );
}
