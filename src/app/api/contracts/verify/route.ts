import { NextResponse } from "next/server";
import { verifyDeliverable } from "@/lib/verifier";
import { Milestone } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const { milestone, deliverableValue } = await req.json();

    if (!milestone || !deliverableValue) {
      return NextResponse.json({ success: false, error: "Missing milestone or deliverable" }, { status: 400 });
    }

    const report = await verifyDeliverable(milestone as Milestone, deliverableValue);

    return NextResponse.json({
      success: true,
      report: {
        ...report,
        verifiedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ success: false, error: "Verification process failed" }, { status: 500 });
  }
}
