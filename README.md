# 🛡️ PactFlow — Autonomous Milestone Escrow & Verification via PayPal

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0.0-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![PayPal Orders v2](https://img.shields.io/badge/PayPal-Orders%20v2-003087?style=flat&logo=paypal)](https://developer.paypal.com/)
[![Tests](https://img.shields.io/badge/Tests-3%2F3%20Passing-brightgreen?style=flat)]()
[![Deploy](https://img.shields.io/badge/Deploy-Vercel%20Edge-black?style=flat&logo=vercel)](https://pactflow-beta.vercel.app)

Built for the **[PayPal AI Hackathon 2026](https://paypal-ai.devpost.com/)** ($67,500 Cash Prize Pool).  
* **Track:** Agentic Commerce & Autonomous Payments  
* **Live Web App:** [https://pactflow-beta.vercel.app](https://pactflow-beta.vercel.app)  

---

## 🌟 Overview
PactFlow eliminates freelance scope creep, payment insecurity, and subjective milestone disputes. By combining **natural language contract synthesis**, **PayPal Orders v2 milestone holds**, and **autonomous AI deliverable verification**, PactFlow makes client-freelancer agreements self-funding and self-executing.

```
┌─────────────────────┐     ┌───────────────────────┐     ┌────────────────────────┐
│ Client Brief Input  │ ──> │ Natural Language Scope│ ──> │ PayPal Escrow Hold     │
│ ($5,000 Next.js App)│     │ (Milestones 1, 2, 3)  │     │ (Orders v2 Authorize)  │
└─────────────────────┘     └───────────────────────┘     └───────────┬────────────┘
                                                                      │
┌─────────────────────┐     ┌───────────────────────┐                 ▼
│ Auto Fund Disbursal │ <── │ Criteria Score >= 85  │ <── ┌────────────────────────┐
│ (PayPal Capture)    │     │ (Pass / Auto-Release) │     │ AI Deliverable Verifier│
└─────────────────────┘     └───────────────────────┘     │ (Git / Vercel Probing) │
                                                          └────────────────────────┘
```

---

## ✨ Key Capabilities

1. **Natural Language Scope Decomposition:**
   * Converts plain English briefs into sequential, financially weighted milestones with objective, machine-testable acceptance criteria.
2. **PayPal Orders v2 Milestone Escrow:**
   * Programmatically authorizes milestone funding holds using PayPal Orders v2 sandbox (`intent: AUTHORIZE`).
   * Funds are locked securely in escrow, protecting freelancers from non-payment before starting work.
3. **Autonomous AI Deliverable Audit:**
   * Evaluates live web deployments, GitHub repositories, API endpoints, and technical assets against agreed criteria.
4. **Programmatic Capture & Disbursal:**
   * Automatically executes PayPal capture upon passing technical verification, releasing funds directly to the freelancer.
   * On failure, generates an objective delta remediation report to resolve issues without chargebacks.
5. **Multi-Persona Session Switcher:**
   * Instant switching between `Client (Elena Vance)`, `Freelancer (Marcus Chen)`, and `Judge Evaluator` to test full escrow lifecycle flows without signup friction.
6. **Escrow Progress Stepper:**
   * Dynamic visual tracking: Scope Agreed $\to$ PayPal Hold $\to$ AI Verifying $\to$ Criteria Pass $\to$ Auto Disbursed.

---

## 🚀 Quickstart

```bash
# 1. Clone repository
git clone https://github.com/ashokwebs/pactflow.git
cd pactflow

# 2. Install dependencies
npm install

# 3. Run automated test suite
npm test

# 4. Start local development server
npm run dev
# Open http://localhost:3000
```

---

## 🧪 Automated Testing
```bash
$ npm test

> pactflow@0.1.0 test
> node --test tests/**/*.test.mjs

✔ Deliverable Verifier - Valid GitHub repo deliverable
✔ Deliverable Verifier - Rejects non-URL deliverable when url required
✔ Deliverable Verifier - Production Vercel web app pass
ℹ tests 3
ℹ suites 0
ℹ pass 3
```

---

## 🛠️ Architecture & Tech Stack
* **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
* **Styling:** Tailwind CSS (Dark Mode, 8pt spatial grid, WCAG AA contrast)
* **Payment Rails:** PayPal Developer Orders v2 REST API (`/v2/checkout/orders`)
* **Verification Engine:** Semantic criterion evaluator & endpoint health auditor
* **Deployment:** Vercel Global Edge Network
