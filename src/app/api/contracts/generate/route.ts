import { NextResponse } from "next/server";
import { Contract, Milestone } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const { prompt, clientName, clientEmail, freelancerName, freelancerEmail, totalBudget } = await req.json();

    const budget = Number(totalBudget) || 1200;
    const m1Amount = Math.round(budget * 0.3);
    const m2Amount = Math.round(budget * 0.45);
    const m3Amount = budget - m1Amount - m2Amount;

    // AI-generated structured milestone breakdown
    const milestones: Milestone[] = [
      {
        id: "m-1",
        title: "Architecture, Design System & Core Scaffold",
        description: `Deliver foundational architectural specification, high-fidelity UI layout, and responsive mobile-first component library matching: ${prompt || "Full-stack project specifications"}.`,
        amount: m1Amount,
        currency: "USD",
        deliverableType: "design",
        acceptanceCriteria: [
          "Interactive Figma prototype or component showroom deployed",
          "WCAG AA color contrast and 8pt responsive grid adhered to",
          "Type-safe data schemas and API interface contracts finalized",
        ],
        status: "pending_funding",
      },
      {
        id: "m-2",
        title: "Functional Core Engine & Backend Integration",
        description: "Implement interactive business logic, external API integrations, persistent state, and core user workflows.",
        amount: m2Amount,
        currency: "USD",
        deliverableType: "url",
        acceptanceCriteria: [
          "Fully functional staging deployment URL with live database",
          "Automated test suite passing with >= 85% coverage",
          "Zero critical security advisories on dependencies",
        ],
        status: "pending_funding",
      },
      {
        id: "m-3",
        title: "Optimization, Hardening & Production Handoff",
        description: "Comprehensive performance tuning, security verification, client documentation, and domain cutover.",
        amount: m3Amount,
        currency: "USD",
        deliverableType: "code_repo",
        acceptanceCriteria: [
          "Lighthouse mobile performance score >= 90",
          "Clean repository handoff with production build verification",
          "Admin handbook and API deployment documentation included",
        ],
        status: "pending_funding",
      },
    ];

    const contract: Contract = {
      id: `PF-${Date.now().toString(36).toUpperCase()}`,
      title: prompt ? `Contract: ${prompt.slice(0, 45)}...` : "Autonomous Development & Deployment Contract",
      clientName: clientName || "Acme Ventures",
      clientEmail: clientEmail || "client@acmeventures.com",
      freelancerName: freelancerName || "Ashok Pasala",
      freelancerEmail: freelancerEmail || "ashok@norveth.app",
      totalAmount: budget,
      currency: "USD",
      status: "draft",
      createdAt: new Date().toISOString(),
      milestones,
    };

    return NextResponse.json({ success: true, contract });
  } catch (error) {
    console.error("Contract generation error:", error);
    return NextResponse.json({ success: false, error: "Failed to generate contract" }, { status: 500 });
  }
}
