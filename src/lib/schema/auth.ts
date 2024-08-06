import { z } from "zod";

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
