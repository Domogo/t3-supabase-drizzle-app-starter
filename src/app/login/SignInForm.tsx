"use client";

import { SignInSchema, signInSchema } from "@/lib/schema/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FC } from "react";
import { useFormState } from "react-dom";
import type { AuthActionsState } from "../actions/auth";

export const SignInForm: FC<{
  signIn: (
    prevState: AuthActionsState,
    data: FormData,
  ) => Promise<AuthActionsState>;
}> = ({ signIn }) => {
  const [state, formAction] = useFormState(signIn, {
    issues: [],
  });

  const form = useForm<SignInSchema>({
    defaultValues: {
      email: "",
      password: "",
      ...(state?.fields ?? {}),
    },
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: FormData) => {
    const isValid = await form.trigger();
    if (!isValid) return;
    formAction(data);
  };

  return (
    <Form {...form}>
      <form action={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  error={fieldState.error?.message}
                  {...field}
                  placeholder="you@example.com"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  error={fieldState.error?.message}
                  type="password"
                  {...field}
                  placeholder="••••••••"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Log In</Button>
      </form>
      {state?.issues && (
        <div className="mt-2 text-red-500">
          {state.issues.map((issue, index) => (
            <div key={index}>{issue}</div>
          ))}
        </div>
      )}
    </Form>
  );
};
