"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordForm({
  handleForgotPassword,
}: {
  handleForgotPassword: (
    prevState: any,
    data: FormData,
  ) => Promise<{ error: boolean; message?: string }>;
}) {
  const [email, setEmail] = useState("");
  const [state, formAction] = useFormState(handleForgotPassword, null);

  return (
    <form action={formAction} className="mt-8 space-y-6">
      <div>
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <Button type="submit" className="w-full">
          Send reset link
        </Button>
      </div>
      {state && (
        <p
          className={`mt-2 text-sm ${state.error ? "text-red-600" : "text-green-600"}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
