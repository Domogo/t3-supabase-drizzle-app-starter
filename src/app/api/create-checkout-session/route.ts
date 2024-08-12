import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/stripe-admin";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { price, quantity = 1, metadata = {} } = await req.json();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    billing_address_collection: "required",
    customer: user.id,
    line_items: [
      {
        price: price,
        quantity,
      },
    ],
    mode: "subscription",
    allow_promotion_codes: true,
    subscription_data: {
      trial_period_days: 14,
      metadata,
    },
    success_url: `${req.headers.get("origin")}/profile`,
    cancel_url: `${req.headers.get("origin")}/`,
  });

  return NextResponse.json({ sessionId: session.id });
}
