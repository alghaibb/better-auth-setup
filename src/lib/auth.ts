import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";
import { createAuthMiddleware, APIError } from "better-auth/api";
import prisma from "./prisma";
import { sendOtpEmail, sendResetPasswordEmail } from "./email";
import {
  passwordSchema,
  nameSchema,
  emailSchema,
} from "./validations/shared-schema";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    github: {
      enabled: true,
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ user, url }) {
      await sendResetPasswordEmail({
        to: user.email,
        url,
        name: user.name,
      });
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
      },
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          await sendOtpEmail({
            to: email,
            otp,
            type: "email-verification",
          });
        }
      },
      otpLength: 6,
      expiresIn: 300,
      sendVerificationOnSignUp: true,
      overrideDefaultEmailVerification: true,
    }),
  ],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const { name, email, password } = ctx.body || {};

        if (name) {
          const nameResult = nameSchema.safeParse(name);
          if (!nameResult.success) {
            throw new APIError("BAD_REQUEST", {
              message: nameResult.error.message || "Invalid name",
            });
          }
        }

        if (email) {
          const emailResult = emailSchema.safeParse(email);
          if (!emailResult.success) {
            throw new APIError("BAD_REQUEST", {
              message: emailResult.error.message || "Invalid email",
            });
          }
        }

        if (password) {
          const passwordResult = passwordSchema.safeParse(password);
          if (!passwordResult.success) {
            throw new APIError("BAD_REQUEST", {
              message: passwordResult.error.message || "Invalid password",
            });
          }
        }
      }

      if (ctx.path === "/sign-in/email") {
        const { email, password } = ctx.body || {};

        if (email) {
          const emailResult = emailSchema.safeParse(email);
          if (!emailResult.success) {
            throw new APIError("BAD_REQUEST", {
              message: emailResult.error.message || "Invalid email",
            });
          }
        }

        if (password) {
          if (typeof password !== "string" || password.length < 1) {
            throw new APIError("BAD_REQUEST", {
              message: "Password is required",
            });
          }
        }
      }

      if (ctx.path === "/reset-password" || ctx.path === "/change-password") {
        const password = ctx.body?.password || ctx.body?.newPassword;

        if (password) {
          const result = passwordSchema.safeParse(password);
          if (!result.success) {
            throw new APIError("BAD_REQUEST", {
              message: result.error.message || "Invalid password",
            });
          }
        }
      }
    }),
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
