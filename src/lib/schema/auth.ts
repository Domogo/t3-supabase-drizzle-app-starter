import { z } from "zod";

export const EMAIL_SCHEMA = z.string().email({ message: "Invalid email" });

export const PASSWORD_SCHEMA = z
  .string()
  .min(8, { message: "Password is required" });

export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Password is required" }),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(8, { message: "Password is required" }),
    confirm_password: z.string().min(8, { message: "Password is required" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const UUID_SCHEMA = z.string().uuid();

export const RESET_PASSWORD_SCHEMA = z
  .object({
    password: PASSWORD_SCHEMA,
    confirm_password: PASSWORD_SCHEMA,
    code: UUID_SCHEMA,
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type ResetPasswordSchema = z.infer<typeof RESET_PASSWORD_SCHEMA>;
