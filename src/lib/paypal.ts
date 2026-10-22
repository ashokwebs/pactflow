// PayPal Orders v2 Sandbox Integration Handler

const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE || "https://api-m.sandbox.paypal.com";
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

export async function getPayPalAccessToken(): Promise<string | null> {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    return null;
  }

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
  try {
    const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!res.ok) {
      console.error("Failed to authenticate with PayPal Sandbox", await res.text());
      return null;
    }

    const data = await res.json();
    return data.access_token;
  } catch (err) {
    console.error("PayPal OAuth network error:", err);
    return null;
  }
}

export async function createPayPalOrder(amount: number, currency = "USD", milestoneTitle: string) {
  const token = await getPayPalAccessToken();

  if (!token) {
    // Deterministic Sandbox Simulation for offline development and testing
    return {
      id: `SIM-PP-ORDER-${Date.now().toString(36).toUpperCase()}`,
      status: "CREATED",
      simulated: true,
      amount: amount.toFixed(2),
      currency,
      description: `PactFlow Escrow: ${milestoneTitle}`,
      approveUrl: `https://www.sandbox.paypal.com/checkoutnow?token=SIM-${Date.now()}`,
    };
  }

  const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      intent: "AUTHORIZE", // Authorize hold for milestone escrow
      purchase_units: [
        {
          reference_id: `milestone-${Date.now()}`,
          description: `PactFlow Escrow: ${milestoneTitle}`,
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
        },
      ],
      application_context: {
        brand_name: "PactFlow Autonomous Escrow",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
      },
    }),
  });

  return await res.json();
}

export async function capturePayPalOrder(orderId: string) {
  const token = await getPayPalAccessToken();

  if (!token || orderId.startsWith("SIM-")) {
    // Simulated Capture
    return {
      id: `SIM-PP-CAPTURE-${Date.now().toString(36).toUpperCase()}`,
      orderId,
      status: "COMPLETED",
      simulated: true,
      capturedAt: new Date().toISOString(),
    };
  }

  const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return await res.json();
}
