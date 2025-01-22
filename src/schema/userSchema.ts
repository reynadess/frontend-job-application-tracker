import { z } from "zod";

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Enter a valid password"),
});

export type LoginInputType = z.infer<typeof userLoginSchema>;

export const userSignupSchema = z.object({
  username: z.string().min(4, "Username Must be 4 length long"),
  firstname: z.string().min(2, "Enter a valid name"),
  lastname: z.string().min(4, "Enter a valid lastname"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be 6 length long"),
});

export type SignupInputType = z.infer<typeof userSignupSchema>;
