import { z } from "zod";
import { emailSchema, passwordSchema } from "./shared-schema";

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: z.boolean(),
});

export type SignInFormData = z.infer<typeof signInSchema>;
