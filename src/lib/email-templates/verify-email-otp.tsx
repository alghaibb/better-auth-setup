import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface VerifyEmailOtpProps {
  otp: string;
  email: string;
}

export const VerifyEmailOtp = ({ otp, email }: VerifyEmailOtpProps) => (
  <Html>
    <Head />
    <Preview>Verify your email address with this code: {otp}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Heading style={h1}>Better Auth</Heading>
        </Section>

        <Heading style={h2}>Verify your email address</Heading>

        <Text style={text}>
          Hi there! Thanks for signing up. To complete your registration, please
          verify your email address using the code below:
        </Text>

        <Section style={otpContainer}>
          <Text style={otpText}>{otp}</Text>
        </Section>

        <Text style={text}>
          This code will expire in 5 minutes for security purposes.
        </Text>

        <Text style={text}>
          If you didn't request this verification, you can safely ignore this
          email.
        </Text>

        <Text style={footer}>
          This email was sent to{" "}
          <Link href={`mailto:${email}`} style={link}>
            {email}
          </Link>
        </Text>
      </Container>
    </Body>
  </Html>
);

export default VerifyEmailOtp;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
  width: "100%",
};

const logoContainer = {
  margin: "32px 0",
  textAlign: "center" as const,
};

const h1 = {
  color: "#1f2937",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "40px",
  margin: "0 0 20px",
  textAlign: "center" as const,
};

const h2 = {
  color: "#1f2937",
  fontSize: "20px",
  fontWeight: "600",
  lineHeight: "28px",
  margin: "30px 0 15px",
  padding: "0 20px",
  textAlign: "center" as const,
};

const text = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 0",
  padding: "0 20px",
  textAlign: "center" as const,
};

const otpContainer = {
  background: "#f3f4f6",
  borderRadius: "8px",
  margin: "24px auto",
  padding: "20px 16px",
  textAlign: "center" as const,
  maxWidth: "280px",
  width: "100%",
  boxSizing: "border-box" as const,
};

const otpText = {
  color: "#1f2937",
  fontSize: "32px",
  fontWeight: "700",
  letterSpacing: "8px",
  lineHeight: "40px",
  margin: "0",
  textAlign: "center" as const,
};

const footer = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "48px 0 0 0",
  padding: "0 20px",
  textAlign: "center" as const,
};

const link = {
  color: "#3b82f6",
  textDecoration: "underline",
};
