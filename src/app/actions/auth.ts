import {
  EMAIL_SCHEMA,
  RESET_PASSWORD_SCHEMA,
  ResetPasswordSchema,
  signInSchema,
  type SignInSchema,
  type SignUpSchema,
} from "@/lib/schema/auth";
import { createClient } from "@/lib/supabase/server";
import { AuthApiError } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type AuthActionsState = {
  message?: string;
  issues?: string[];
  fields?: SignInSchema;
};

export type ResetPasswordActionsState = {
  message?: string;
  issues?: string[];
  fields?: ResetPasswordSchema;
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
      emailRedirectTo: `${origin}/api/auth/callback`,
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

export async function handleForgotPassword(
  prevState: any,
  formData: FormData,
): Promise<{ error: boolean; message?: string }> {
  "use server";
  const email = formData.get("email");

  const result = EMAIL_SCHEMA.safeParse(email);

  if (!result.success) {
    return { error: true, message: result?.error?.errors?.[0]?.message };
  }

  try {
    const supabase = createClient();
    const origin = headers().get("origin");
    const response = await supabase.auth.resetPasswordForEmail(result.data, {
      // captchaToken: input.captchaToken,
      redirectTo: `${origin}/reset-password`,
    });

    if (response.error) {
      return { error: true, message: response.error.message };
    }

    return { error: false, message: "Password reset link sent to your email." };
  } catch (error) {
    console.error("Error in handleForgotPassword:", error);
    return {
      error: true,
      message: "An error occurred. Please try again later.",
    };
  }
}

export async function resetPassword(
  prevState: ResetPasswordActionsState,
  formData: ResetPasswordSchema,
) {
  "use server";

  const parsed = RESET_PASSWORD_SCHEMA.safeParse(formData);
  if (!parsed.success) {
    return {
      issues: parsed.error.issues.map(
        (error) => error.message + " " + error.path,
      ),
      fields: parsed.data,
    };
  }
  try {
    const supabase = createClient();
    const { password, code } = parsed.data;

    const { error: sessionError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (sessionError) {
      return {
        issues: [sessionError.message],
        fields: parsed.data,
      };
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      return {
        issues: [updateError.message],
        fields: parsed.data,
      };
    }

    return {
      message: "Password reset successful!",
      fields: parsed.data,
    };
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return {
      issues: [(error as AuthApiError).message],
      fields: parsed.data,
    };
  }
}
