# 🛡️ PactFlow — Autonomous Milestone Escrow & Verification via PayPal

Built for the **[PayPal AI Hackathon 2026](https://paypal-ai.devpost.com/)** ($67,500 Cash Prize Pool).  
**Track:** Agentic Commerce & Autonomous Payments  
**Live Demo:** Deployed on Vercel  

---

## 🌟 Overview
PactFlow eliminates freelance scope creep, payment insecurity, and subjective milestone disputes. By combining **natural language contract synthesis**, **PayPal Orders v2 milestone holds**, and **autonomous AI deliverable verification**, PactFlow makes client-freelancer agreements self-funding and self-executing.

### Key Capabilities:
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

---

## 🚀 Quickstart

```bash
# 1. Clone repository
git clone https://github.com/ashokwebs/pactflow.git
cd pactflow

# 2. Install dependencies
npm install

# 3. Configure PayPal Sandbox (Optional — deterministic simulation works out of the box)
cp .env.example .env.local
# Set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET

# 4. Run development server
npm run dev
# Open http://localhost:3000
```

---

## 🛠️ Architecture & Tech Stack
* **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
* **Styling:** Tailwind CSS (Dark Mode, 8pt spatial grid, WCAG AA contrast)
* **Payment Rails:** PayPal Developer Orders v2 REST API (`/v2/checkout/orders`)
* **Verification Engine:** Semantic criterion evaluator & endpoint health auditor
* **Deployment:** Vercel Edge Network
