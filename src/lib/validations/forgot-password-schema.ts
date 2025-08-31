import { z } from "zod";
import { emailSchema } from "./shared-schema";

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;