import {
  Body,
  Button,
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

interface ResetPasswordProps {
  url: string;
  email: string;
  name?: string;
}

export const ResetPassword = ({ url, email, name }: ResetPasswordProps) => (
  <Html>
    <Head />
    <Preview>Reset your password - Better Auth</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Heading style={h1}>Better Auth</Heading>
        </Section>

        <Heading style={h2}>Reset your password</Heading>

        <Text style={text}>
          {name ? `Hi ${name}` : "Hi there"}! We received a request to reset the
          password for your account.
        </Text>

        <Text style={text}>
          Click the button below to reset your password. This link will expire
          in 1 hour for security purposes.
        </Text>

        <Section style={buttonContainer}>
          <Button style={button} href={url}>
            Reset Password
          </Button>
        </Section>

        <Text style={text}>
          If the button doesn&apos;t work, you can copy and paste this link into your
          browser:
        </Text>

        <Text style={linkText}>
          <Link href={url} style={link}>
            {url}
          </Link>
        </Text>

        <Text style={text}>
          If you didn&apos;t request a password reset, you can safely ignore this
          email. Your password will not be changed.
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

export default ResetPassword;

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

const buttonContainer = {
  margin: "32px auto",
  textAlign: "center" as const,
  width: "100%",
};

const button = {
  backgroundColor: "#1f2937",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
  margin: "0 auto",
};

const linkText = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "16px 0",
  padding: "0 20px",
  textAlign: "center" as const,
  wordBreak: "break-all" as const,
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
