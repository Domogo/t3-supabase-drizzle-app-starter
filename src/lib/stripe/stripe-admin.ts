import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20", // Use the latest API version
});

// https://github.com/KolbySisk/next-supabase-stripe-starter
export async function createOrRetrieveCustomer({
  uuid,
  email,
}: {
  uuid: string;
  email: string;
}) {
  const customers = await stripe.customers.list({ email });

  if (customers.data.length && customers?.data[0]?.id === uuid)
    return customers.data[0].id;

  const customer = await stripe.customers.create({
    email,
    metadata: { supabaseUUID: uuid },
  });

  return customer.id;
}
