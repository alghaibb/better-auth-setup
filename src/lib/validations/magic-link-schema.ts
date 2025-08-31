import { z } from "zod";
import { emailSchema, nameSchema } from "./shared-schema";

export const magicLinkRequestSchema = z.object({
  email: emailSchema,
  name: nameSchema.optional().or(z.literal("")),
});

export const magicLinkVerifySchema = z.object({
  token: z.string().min(1, "Token is required"),
});

export type MagicLinkRequestFormData = z.infer<typeof magicLinkRequestSchema>;
export type MagicLinkVerifyFormData = z.infer<typeof magicLinkVerifySchema>;
