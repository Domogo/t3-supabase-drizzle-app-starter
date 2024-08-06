"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { ProfileActionState } from "../actions/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema, profileSchema } from "@/lib/schema/profile";
import { useFormState } from "react-dom";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Divider from "@/components/Divider";

export const ProfileForm: FC<{
  editProfile: (
    prevState: ProfileActionState,
    data: FormData,
  ) => Promise<ProfileActionState>;
}> = ({ editProfile }) => {
  const [state, formAction] = useFormState(editProfile, {
    issues: [],
  });

  const form = useForm<ProfileSchema>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      ...(state?.fields ?? {}),
    },
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (data: FormData) => {
    const isValid = await form.trigger();
    if (!isValid) return;
    formAction(data);
  };
  return (
    <Form {...form}>
      <form action={onSubmit} className="mt-8 w-full space-y-8">
        <div className="space-y-8">
          <h2>Personal information</h2>
          <div className="flex items-center justify-between gap-8">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field, fieldState }) => (
                <FormItem className="w-full">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      error={fieldState.error?.message}
                      {...field}
                      placeholder="John"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field, fieldState }) => (
                <FormItem className="w-full">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      error={fieldState.error?.message}
                      {...field}
                      placeholder="Doe"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
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
        </div>
      </form>
    </Form>
  );
};
