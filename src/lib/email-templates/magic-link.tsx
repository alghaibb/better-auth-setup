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

interface MagicLinkProps {
  url: string;
  email: string;
  name?: string;
}

export const MagicLink = ({ url, email, name }: MagicLinkProps) => (
  <Html>
    <Head />
    <Preview>Sign in to your account with this magic link</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Heading style={h1}>Better Auth</Heading>
        </Section>

        <Heading style={h2}>Sign in to your account</Heading>

        <Text style={text}>Hello {name || "there"},</Text>
        <Text style={text}>
          Click the button below to sign in to your account. This link will
          expire in 5 minutes for security purposes.
        </Text>

        <Section style={buttonContainer}>
          <Button style={button} href={url}>
            Sign In
          </Button>
        </Section>

        <Text style={text}>
          If you didn&apos;t request this email, you can safely ignore it.
        </Text>

        <Text style={footer}>
          This email was sent to{" "}
          <Link href={`mailto:${email}`} style={link}>
            {email}
          </Link>
          .
        </Text>
      </Container>
    </Body>
  </Html>
);

export default MagicLink;

const main = {
  backgroundColor: "#ffffff",
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
  marginTop: "32px",
};

const h1 = {
  color: "#1f2937",
  fontSize: "24px",
  fontWeight: "700",
  margin: "30px 0",
  padding: "0",
  lineHeight: "42px",
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
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#000000",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
  lineHeight: "100%",
};

const link = {
  color: "#2563eb",
  textDecoration: "underline",
};

const footer = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "48px 0 0 0",
  padding: "0 20px",
  textAlign: "center" as const,
};
