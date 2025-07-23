import { Resend } from "resend";
import nodemailer from "nodemailer";

const resend = new Resend(process.env.RESEND_API_KEY);

const MIN_MESSAGE_LENGTH = 30;
const SPAM_KEYWORDS = ["buy now", "free", "click here", "subscribe", "visit", "offer"];
const MAX_LINKS = 2;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function containsSpamKeywords(text: string) {
  const lower = text.toLowerCase();
  return SPAM_KEYWORDS.some((keyword) => lower.includes(keyword));
}

function countLinks(text: string) {
  const urlRegex = /https?:\/\/[^\s]+/g;
  const matches = text.match(urlRegex);
  return matches ? matches.length : 0;
}

function cleanSnippet(text: string, maxLength = 60) {
  let clean = text.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
  if (clean.length > maxLength) {
    clean = clean.slice(0, maxLength).trim() + "...";
  }
  return clean || "No description";
}

export async function POST(req: Request) {
  const { email, message } = await req.json();
  const timestamp = new Date();
  const formattedTimestamp = timestamp.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Validasi dan filter spam
  if (!message || message.trim().length < MIN_MESSAGE_LENGTH) {
    return new Response("Report rejected: message too short", { status: 400 });
  }

  if (containsSpamKeywords(message)) {
    return new Response("Report rejected: spam keywords detected", { status: 400 });
  }

  if (countLinks(message) > MAX_LINKS) {
    return new Response("Report rejected: too many links", { status: 400 });
  }

  if (email && !isValidEmail(email)) {
    return new Response("Report rejected: invalid email format", { status: 400 });
  }

  const issueSnippet = cleanSnippet(message);

  // Kirim ke admin via Resend
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "ariandika1913@gmail.com",
      subject: `New Report from ${email || "Anonymous User"}: ${issueSnippet}`,
      replyTo: email || "no-reply@getthatgame.com",
      text: `
New user report from GetThatGame

From: ${email || "Anonymous User"}
Time: ${formattedTimestamp}

----------------------------------------
${message}
----------------------------------------
      `,
      html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
  <h2 style="margin-bottom: 0.5rem;">🚨 New User Report</h2>
  
  <table style="font-size: 14px; margin-bottom: 1rem;">
    <tr><td><strong>From:</strong></td><td>${email || "Anonymous User"}</td></tr>
    <tr><td><strong>Time:</strong></td><td>${formattedTimestamp}</td></tr>
  </table>

  <div style="margin-bottom: 1rem;">
    <strong>Message:</strong>
    <pre style="background: #f9f9f9; padding: 1rem; border: 1px solid #e1e1e1; white-space: pre-wrap; font-family: inherit; border-radius: 4px;">
${message}
    </pre>
  </div>

  <hr style="margin-top: 2rem;" />
  <p style="font-size: 12px; color: #888;">
    This message was sent from <strong>GetThatGame</strong> reporting system.
  </p>
</div>
      `,
    });
  } catch (error) {
    console.error("Resend failed:", error);
  }

  // Kirim auto-reply ke user via Gmail
  if (email) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"GetThatGame Support" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "📬 We've received your report — GetThatGame Support",
        html: `
<div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; color: #333;">
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="https://i.imgur.com/2wRHXHX.png" alt="GetThatGame Logo" width="80" style="margin-bottom: 10px;" />
    <h2 style="margin: 0;">GetThatGame Support</h2>
  </div>

  <p>Hi there,</p>

  <p>Thank you for submitting your report to <strong>GetThatGame</strong>. We’ve received your message and will review it within <strong>24 hours</strong>.</p>

  <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #3b82f6; margin: 20px 0; font-size: 14px;">
    <strong>Your message:</strong>
    <br />
    <em>${message.replace(/\n/g, "<br />")}</em>
  </div>

  <p>If your issue is urgent, please contact us at <a href="mailto:support@getthatgame.com">support@getthatgame.com</a> and we’ll get back to you as soon as possible.</p>

  <p>Cheers,<br />The GetThatGame Team</p>

  <hr style="margin: 40px 0;" />

  <p style="font-size: 12px; color: #888; text-align: center;">
    This is an automated email. Please do not reply directly to this message.
  </p>
</div>
        `,
      });
    } catch (error) {
      console.error("Gmail auto-reply failed:", error);
    }
  }

  return new Response("OK");
}
