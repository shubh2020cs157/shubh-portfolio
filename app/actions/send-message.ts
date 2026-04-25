"use server";

import { Resend } from "resend";
import { contactSchema } from "@/lib/schemas/contact";

type ActionState = {
  status: "idle" | "ok" | "error";
  message?: string;
  errors?: Record<string, string[]>;
};

export async function sendMessage(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Honeypot check — bots fill the hidden "website" field
  const honeypot = formData.get("website");
  if (honeypot && String(honeypot).length > 0) {
    // Silently succeed (don't reveal the trap)
    return { status: "ok" };
  }

  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      status: "error",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { name, email, message } = parsed.data;

  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[send-message] RESEND_API_KEY is not set");
    return {
      status: "error",
      message: "Email service is not configured. Please reach out directly.",
    };
  }

  const resend = new Resend(apiKey);

  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
  const toEmail =
    process.env.CONTACT_TO_EMAIL ?? "shubhpersonalok@gmail.com";

  const { error } = await resend.emails.send({
    from: `Portfolio Contact <${fromEmail}>`,
    to: toEmail,
    replyTo: email,
    subject: `[Portfolio] New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #00e5ff;">New Portfolio Message</h2>
        <p><strong>From:</strong> ${esc(name)} &lt;${esc(email)}&gt;</p>
        <hr style="border-color: #3b494c;" />
        <p style="white-space: pre-wrap;">${esc(message)}</p>
      </div>
    `,
  });

  if (error) {
    console.error("[send-message] Resend error:", error);
    return {
      status: "error",
      message: "Failed to send message. Please try again later.",
    };
  }

  return { status: "ok" };
}
