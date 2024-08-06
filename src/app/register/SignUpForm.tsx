"use client";

import { signUpSchema, SignUpSchema } from "@/lib/schema/auth";
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
import { FC } from "react";
import { useFormState } from "react-dom";
import { AuthActionsState } from "../actions/auth";

export const SignUpForm: FC<{
  signUp: (
    prevState: AuthActionsState,
    data: FormData
  ) => Promise<AuthActionsState>;
}> = ({ signUp }) => {
  const [state, formAction] = useFormState(signUp, {
    issues: [],
  });

  const form = useForm<SignUpSchema>({
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      ...(state?.fields ?? {}),
    },
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: FormData) => {
    const isValid = await form.trigger();
    if (!isValid) return;
    formAction(data);
  };

  return (
    <Form {...form}>
      {state?.message && (
        <div className="mt-2 text-green-500">{state.message}</div>
      )}
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
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
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
        <Button type="submit">Sign Up</Button>
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
