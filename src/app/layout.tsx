import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PactFlow — Autonomous Milestone Escrow & Verification via PayPal",
  description: "Autonomous Agentic Escrow Protocol for SMBs and Freelancers powered by PayPal Developer APIs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0B0F19] text-gray-100 antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
