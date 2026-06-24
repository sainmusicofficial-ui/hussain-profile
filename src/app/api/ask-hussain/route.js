import { Resend } from "resend";
import { readFileSync } from "fs";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

// Load the knowledge document once. It lives at src/data/hussain-knowledge.md
function getSystemPrompt() {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "hussain-knowledge.md");
    return readFileSync(filePath, "utf-8");
  } catch (err) {
    console.error("Failed to read knowledge document:", err);
    return "You are Ask Hussain, an assistant on Hussain Khan's portfolio site. Answer questions about his design services helpfully.";
  }
}

// Very basic in-memory rate limiter (per server instance — resets on redeploy/cold start).
// Good enough for a low-traffic portfolio site to prevent obvious abuse/spam.
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 8; // max messages per IP per minute

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  return false;
}

// Extracts a LEAD_CAPTURED:{...} JSON tag from the AI's reply, if present,
// and strips it out of the visible text returned to the user.
function extractLead(rawText) {
  const match = rawText.match(/LEAD_CAPTURED:\s*(\{[\s\S]*?\})/);
  if (!match) return { cleanText: rawText, lead: null };

  let lead = null;
  try {
    lead = JSON.parse(match[1]);
  } catch (err) {
    console.error("Failed to parse LEAD_CAPTURED JSON:", err);
  }

  const cleanText = rawText.replace(match[0], "").trim();
  return { cleanText, lead };
}

async function sendLeadEmail(lead) {
  if (!lead || (!lead.email && !lead.phone)) return;

  try {
    await resend.emails.send({
      from: "Ask Hussain AI <hello@hussainkhan.co.in>",
      to: "hello@hussainkhan.co.in",
      subject: `New lead from Ask Hussain AI — ${lead.name || "Unknown"}`,
      html: `
        <h2>New lead captured by Ask Hussain AI</h2>
        <p><strong>Name:</strong> ${lead.name || "—"}</p>
        <p><strong>Phone:</strong> ${lead.phone || "—"}</p>
        <p><strong>Email:</strong> ${lead.email || "—"}</p>
        <p><strong>Project:</strong> ${lead.project || "—"}</p>
        <p><strong>Budget:</strong> ${lead.budget || "—"}</p>
        <p><strong>Timeline:</strong> ${lead.timeline || "—"}</p>
        <hr />
        <p style="color:#888;font-size:12px;">Captured automatically via the Ask Hussain AI chat widget on hussainkhan.co.in</p>
      `,
    });
  } catch (err) {
    // Don't fail the chat response if email sending fails — just log it
    console.error("Failed to send lead email:", err);
  }
}

export async function POST(req) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return Response.json(
        { error: "You're sending messages too quickly. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { messages } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "No messages provided." }, { status: 400 });
    }

    // Basic guard: cap how much conversation history we forward, to control token usage
    const trimmedMessages = messages.slice(-12);

    const systemPrompt = getSystemPrompt();

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          ...trimmedMessages.map((m) => ({ role: m.role, content: m.content })),
        ],
        temperature: 0.6,
        max_tokens: 600,
      }),
    });

    if (!groqResponse.ok) {
      const errText = await groqResponse.text();
      console.error("Groq API error:", errText);
      return Response.json(
        { error: "Something went wrong generating a response. Please try again." },
        { status: 502 }
      );
    }

    const data = await groqResponse.json();
    const rawReply = data?.choices?.[0]?.message?.content || "";

    const { cleanText, lead } = extractLead(rawReply);

    // Fire-and-forget the lead email (don't block the chat response on it)
    if (lead && (lead.email || lead.phone)) {
      sendLeadEmail(lead);
    }

    return Response.json({ reply: cleanText, leadCaptured: !!lead });
  } catch (err) {
    console.error("Ask Hussain AI route error:", err);
    return Response.json(
      { error: "Something went wrong. Please try again in a moment." },
      { status: 500 }
    );
  }
}