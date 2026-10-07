import type { ContactFormValues } from "./contact.validation";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";

class GmailDeliveryError extends Error {
  constructor(
    public readonly status: number,
    public readonly providerBody: string,
  ) {
    super(`Gmail request failed [${status}]: ${providerBody}`);
    this.name = "GmailDeliveryError";
  }
}

function requiredEnv(name: "LOVABLE_API_KEY" | "GOOGLE_MAIL_API_KEY") {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

function encodeBase64Url(value: string) {
  return Buffer.from(value, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function encodeHeader(value: string) {
  return /^[\x00-\x7F]*$/.test(value)
    ? value
    : `=?UTF-8?B?${Buffer.from(value, "utf8").toString("base64")}?=`;
}

function createRawEmail({
  to,
  replyTo,
  name,
  email,
  message,
}: ContactFormValues & { to: string; replyTo: string }) {
  const body = [
    `New portfolio message from ${name}`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    message,
  ].join("\r\n");

  const emailMessage = [
    `To: ${to}`,
    `Reply-To: ${replyTo}`,
    `Subject: ${encodeHeader(`Portfolio contact from ${name}`)}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    body,
  ].join("\r\n");

  return encodeBase64Url(emailMessage);
}

async function gmailRequest(path: string, init?: RequestInit) {
  const response = await fetch(`${GATEWAY_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${requiredEnv("LOVABLE_API_KEY")}`,
      "X-Connection-Api-Key": requiredEnv("GOOGLE_MAIL_API_KEY"),
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const providerBody = await response.text();
    throw new GmailDeliveryError(response.status, providerBody);
  }

  return response;
}

export async function deliverContactMessage(values: ContactFormValues) {
  const profileResponse = await gmailRequest("/users/me/profile");
  const profile = (await profileResponse.json()) as { emailAddress?: string };
  const recipient = profile.emailAddress?.trim();

  if (!recipient) {
    throw new Error("The connected Gmail account did not return a recipient address");
  }

  await gmailRequest("/users/me/messages/send", {
    method: "POST",
    body: JSON.stringify({
      raw: createRawEmail({ ...values, to: recipient, replyTo: values.email }),
    }),
  });
}