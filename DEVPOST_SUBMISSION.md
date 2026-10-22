# 🛡️ PactFlow — Devpost Submission Package

**Hackathon:** [PayPal AI Hackathon 2026](https://paypal-ai.devpost.com/)  
**Prize Pool:** $67,500 in Cash Prizes  
**Submission Deadline:** November 12, 2026  
**Format:** Multi-Member Team Submission  
**Live Application:** Deployed on Vercel  
**Repository:** https://github.com/ashokwebs/pactflow  

---

## 1. Project Tagline / One-Liner (100 characters max)
> Autonomous Agentic Milestone Escrow & Objective Deliverable Verification powered by PayPal Orders v2.

---

## 2. Inspiration
The freelance and independent software services market exceeds $1.5 Trillion globally, yet remains plagued by **payment friction and scope ambiguity**:
1. **Unfunded Scope Creep:** Freelancers begin complex work without guaranteed funding, exposing them to client ghosting or arbitrary cancellation.
2. **Payment Insecurity & Chargebacks:** Clients fear paying upfront for low-quality or non-functional deliverables.
3. **Dispute Deadlock:** When deliverables are contested, legacy escrow platforms require human arbiters who lack the technical expertise to inspect code, API endpoints, or mobile Lighthouse audits.

We built **PactFlow** to solve this with **Agentic Commerce**: transforming natural language project briefs into structured milestone contracts backed by PayPal Orders v2 authorized holds, with an autonomous AI verification engine that programmatically audits deliverables before funds are released.

---

## 3. What It Does
PactFlow automates the entire lifecycle of client-freelancer commerce:

1. **Natural Language Contract Synthesis:**
   * A client or freelancer enters a freeform project description and total budget.
   * The AI agent parses the description, decomposing it into sequential, financial milestones with objective, machine-verifiable acceptance criteria (e.g. valid HTTPS endpoints, API response health, passing test suites, Lighthouse performance scores).
2. **PayPal Sandbox Orders v2 Milestone Escrow:**
   * Clients fund individual milestones using PayPal Orders v2 (`intent: AUTHORIZE`).
   * Funds are locked securely in an authorized escrow hold, giving the freelancer guaranteed proof-of-funds before writing code.
3. **Autonomous AI Deliverable Verification:**
   * When the freelancer finishes a milestone, they submit their staging URL, GitHub PR, or document asset.
   * PactFlow's autonomous verification agent evaluates the live deliverable against the contracted acceptance criteria.
4. **Instant Programmatic Disbursal:**
   * Upon passing verification, the agent triggers PayPal's Capture API (`/v2/checkout/orders/{id}/capture`), releasing the milestone payout directly to the freelancer's account.
   * If criteria fail, a structured, objective audit report is generated, guiding the developer on the exact delta needed to unlock payment without subjective disputes.

---

## 4. How We Built It
- **Frontend & Full-Stack Core:** Next.js 15 (App Router), React 19, and TypeScript with responsive Tailwind CSS.
- **PayPal Integration:** Server-side PayPal REST Orders v2 API integration supporting OAuth client credential handshakes, order authorization holds, and automated capture execution (`src/lib/paypal.ts`).
- **Autonomous Verifier:** Custom verification engine (`src/lib/verifier.ts`) evaluating endpoint reachability, TLS handshakes, DOM response integrity, and acceptance criteria matching.
- **Offline & Sandbox Resilience:** Complete deterministic fallback simulation mode ensuring 100% test reliability and seamless judge evaluation even when external sandbox latency fluctuates.

---

## 5. Challenges We Ran Into
- **Translating Vague Human Scope into Objective Criteria:** Human project requests often contain subjective phrases like "make it fast" or "clean UI". We engineered structured prompt extraction rules that anchor terms to measurable criteria (e.g., "Lighthouse score $\ge 90$", "Zero critical dependencies", "Valid HTTP 200 TLS response").
- **Managing Authorize vs Capture Lifecycle:** Standard payment buttons capture funds immediately. For milestone escrow, we leveraged PayPal's two-step `AUTHORIZE` $\to$ `CAPTURE` lifecycle to guarantee funds remain protected until technical verification completes.

---

## 6. What's Next for PactFlow
- **Multi-Party Split Payouts:** Integrating PayPal Payouts API to automatically disburse shares among multiple team members and subcontractors.
- **Automated CI/CD Webhooks:** Triggering milestone verification directly from GitHub Actions upon merging a verified pull request.
- **Telegram & WhatsApp Bot Companion:** Real-time milestone funding and approval notifications delivered straight to mobile.

---

## 7. Built With
`paypal-api`, `next.js`, `react`, `typescript`, `tailwind-css`, `agentic-ai`, `vercel`
