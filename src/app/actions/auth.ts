import {
  signInSchema,
  type SignInSchema,
  type SignUpSchema,
} from "@/lib/schema/auth";
import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type AuthActionsState = {
  message?: string;
  issues?: string[];
  fields?: SignInSchema;
};

export const signIn = async (
  prevState: AuthActionsState,
  formData: FormData,
): Promise<AuthActionsState> => {
  "use server";

  const data = Object.fromEntries(formData);
  const parsed = signInSchema.safeParse(data);

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData.get(key) as string;
    }

    return {
      issues: parsed.error.issues.map((error) => error.message),
      fields: fields as SignInSchema,
    };
  }

  const { email, password } = parsed.data;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      issues: [error.message],
      fields: parsed.data,
    };
  }

  return redirect("/profile");
};

export const signUp = async (
  prevState: AuthActionsState,
  formData: FormData,
) => {
  "use server";

  const data = Object.fromEntries(formData);
  const parsed = signInSchema.safeParse(data);

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData.get(key) as string;
    }

    return {
      issues: parsed.error.issues.map((error) => error.message),
      fields: fields as SignUpSchema,
    };
  }

  const { email, password } = parsed.data;

  const origin = headers().get("origin");
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return {
      issues: [error.message],
      fields: parsed.data,
    };
  }

  return {
    message:
      "Sign up successful! Please check your email for a confirmation link.",
    fields: parsed.data,
  };
};
