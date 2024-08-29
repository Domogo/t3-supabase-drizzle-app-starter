"use client";

import {
  RESET_PASSWORD_SCHEMA,
  ResetPasswordSchema,
  signUpSchema,
  SignUpSchema,
} from "@/lib/schema/auth";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import { useFormState } from "react-dom";
import { Input } from "@/components/ui/input";
import { ResetPasswordActionsState } from "@/app/actions/auth";

export const ResetPasswordForm: FC<{
  code: string;
  resetPassword: (
    prevState: ResetPasswordActionsState,
    formData: ResetPasswordSchema,
  ) => Promise<ResetPasswordActionsState>;
}> = ({ code, resetPassword }) => {
  const [state, formAction] = useFormState(resetPassword, {
    issues: [],
  });

  const form = useForm<ResetPasswordSchema>({
    defaultValues: {
      password: "",
      confirm_password: "",
      code: code,
      ...(state?.fields ?? {}),
    },
    resolver: zodResolver(RESET_PASSWORD_SCHEMA),
  });

  const onSubmit = async (data: FormData) => {
    const isValid = await form.trigger();
    if (!isValid) return;

    formAction(form.getValues());
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        {state?.message && (
          <div className="mt-2 text-green-500">{state.message}</div>
        )}
        <form action={onSubmit} className="space-y-8">
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
    </FormProvider>
  );
};
