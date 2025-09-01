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

interface ChangeEmailVerificationProps {
  token: string;
  email: string;
  name?: string;
}

export const ChangeEmailVerification = ({
  token,
  email,
  name,
}: ChangeEmailVerificationProps) => {
  const firstName = name ? name.split(" ")[0] : "there";

  return (
    <Html>
      <Head />
      <Preview>Verify your new email address</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Heading style={h1}>Better Auth</Heading>
          </Section>

          <Heading style={h2}>Verify your new email address</Heading>

          <Text style={text}>
            Hi {firstName}! You recently requested to change your email address.
            To complete this change, please click the button below to verify
            your request:
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={token}>
              Verify Email Change
            </Button>
          </Section>

          <Text style={text}>
            This link will expire for security purposes. If the button doesn't
            work, you can also copy and paste this link into your browser:
          </Text>

          <Text style={linkText}>{token}</Text>

          <Text style={text}>
            If you didn't request this email change, you can safely ignore this
            email and your current email address will remain unchanged.
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
};

export default ChangeEmailVerification;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const logoContainer = {
  textAlign: "center" as const,
  marginBottom: "24px",
};

const h1 = {
  color: "#1d1d1f",
  fontSize: "24px",
  fontWeight: "600",
  textAlign: "center" as const,
  margin: "0",
};

const h2 = {
  color: "#1d1d1f",
  fontSize: "20px",
  fontWeight: "600",
  textAlign: "center" as const,
  margin: "0 0 24px 0",
};

const text = {
  color: "#333333",
  fontSize: "16px",
  lineHeight: "1.5",
  margin: "0 0 16px 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#007bff",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const linkText = {
  color: "#6c757d",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "16px 0",
  wordBreak: "break-all" as const,
  fontFamily: "monospace",
};

const link = {
  color: "#007bff",
  textDecoration: "underline",
};

const footer = {
  color: "#8e8e93",
  fontSize: "14px",
  lineHeight: "1.5",
};
