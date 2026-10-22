import { NextResponse } from "next/server";
import { createPayPalOrder } from "@/lib/paypal";

export async function POST(req: Request) {
  try {
    const { amount, currency, milestoneTitle } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ success: false, error: "Invalid milestone funding amount" }, { status: 400 });
    }

    const order = await createPayPalOrder(Number(amount), currency || "USD", milestoneTitle || "Milestone");

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("PayPal Create Order error:", error);
    return NextResponse.json({ success: false, error: "Failed to create PayPal order" }, { status: 500 });
  }
}
