import { NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal";

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ success: false, error: "Missing PayPal Order ID" }, { status: 400 });
    }

    const capture = await capturePayPalOrder(orderId);

    return NextResponse.json({ success: true, capture });
  } catch (error) {
    console.error("PayPal Capture Order error:", error);
    return NextResponse.json({ success: false, error: "Failed to capture PayPal funds" }, { status: 500 });
  }
}
