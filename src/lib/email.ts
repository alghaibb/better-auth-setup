import { Resend } from "resend";
import { render } from "@react-email/render";
import VerifyEmailOtp from "./email-templates/verify-email-otp";
import ResetPassword from "./email-templates/reset-password";
import MagicLink from "./email-templates/magic-link";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailValues {
  to: string;
  subject: string;
  text: string;
}

interface SendOtpEmailValues {
  to: string;
  otp: string;
  type: "email-verification";
}

interface SendResetPasswordEmailValues {
  to: string;
  url: string;
  name?: string;
}

interface SendMagicLinkEmailValues {
  to: string;
  url: string;
  name?: string;
}

export async function sendEmail({ to, subject, text }: SendEmailValues) {
  try {
    await resend.emails.send({
      from: "noreply@codewithmj.com",
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}

export async function sendOtpEmail({ to, otp, type }: SendOtpEmailValues) {
  try {
    if (type === "email-verification") {
      const emailHtml = await render(VerifyEmailOtp({ otp, email: to }));

      await resend.emails.send({
        from: "noreply@codewithmj.com",
        to,
        subject: "Verify your email address",
        html: emailHtml,
      });
    }
  } catch (error) {
    console.error("Failed to send OTP email:", error);
    throw error;
  }
}

export async function sendResetPasswordEmail({
  to,
  url,
  name,
}: SendResetPasswordEmailValues) {
  try {
    const emailHtml = await render(ResetPassword({ url, email: to, name }));

    await resend.emails.send({
      from: "noreply@codewithmj.com",
      to,
      subject: "Reset your password",
      html: emailHtml,
    });
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    throw error;
  }
}

export async function sendMagicLinkEmail({
  to,
  url,
  name,
}: SendMagicLinkEmailValues) {
  try {
    const emailHtml = await render(MagicLink({ url, email: to, name }));

    await resend.emails.send({
      from: "noreply@codewithmj.com",
      to,
      subject: "Sign in to your account",
      html: emailHtml,
    });
  } catch (error) {
    console.error("Failed to send magic link email:", error);
    throw error;
  }
}
