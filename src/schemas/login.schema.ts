import { z } from "zod";
//schema declaration and validation libary
//you define exactly what your data should look like

export const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(6),
});

export type LoginFormData = z.infer<typeof loginSchema>;