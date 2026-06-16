import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, projectType, budget, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // 1. Email to Hussain
    await resend.emails.send({
      from: "Portfolio Contact <hello@hussainkhan.co.in>",
      to: "hello@hussainkhan.co.in",
      replyTo: email,
      subject: `New enquiry from ${name}${projectType ? ` — ${projectType}` : ""}`,
      html: `
        <div style="font-family:monospace;background:#0a0a0a;color:#fff;padding:40px;border-radius:12px;max-width:600px;">
          <h2 style="color:#D7FF00;margin:0 0 24px;font-size:20px;">New Project Enquiry</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;color:#555;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;width:120px;">Name</td>
              <td style="padding:10px 0;color:#fff;font-size:15px;">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#555;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;">Email</td>
              <td style="padding:10px 0;color:#D7FF00;font-size:15px;">${email}</td>
            </tr>
            ${projectType ? `<tr><td style="padding:10px 0;color:#555;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;">Project</td><td style="padding:10px 0;color:#fff;font-size:15px;">${projectType}</td></tr>` : ""}
            ${budget ? `<tr><td style="padding:10px 0;color:#555;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;">Budget</td><td style="padding:10px 0;color:#fff;font-size:15px;">${budget}</td></tr>` : ""}
          </table>
          <div style="margin-top:24px;padding-top:24px;border-top:1px solid #1e1e1e;">
            <p style="color:#555;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 12px;">Message</p>
            <p style="color:#ccc;font-size:15px;line-height:1.7;margin:0;white-space:pre-wrap;">${message}</p>
          </div>
          <p style="margin-top:40px;color:#333;font-size:11px;">Sent via hussainkhan.co.in</p>
        </div>
      `,
    });

    // 2. Auto-reply to enquirer
    await resend.emails.send({
      from: "Hussain Khan <hello@hussainkhan.co.in>",
      to: email,
      subject: `Got your message, ${name} ✦`,
      html: `
        <div style="font-family:monospace;background:#0a0a0a;color:#fff;padding:40px;border-radius:12px;max-width:600px;">
          
          <h2 style="color:#D7FF00;margin:0 0 8px;font-size:24px;letter-spacing:-0.02em;">
            Hey ${name}, thanks for reaching out.
          </h2>

          <p style="color:#888;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 32px;">
            [ Message Received ]
          </p>

          <p style="color:#ccc;font-size:16px;line-height:1.8;margin:0 0 16px;">
            I've received your enquiry and will get back to you within <span style="color:#D7FF00;">24 hours</span>.
          </p>

          <p style="color:#ccc;font-size:16px;line-height:1.8;margin:0 0 32px;">
            In the meantime, feel free to check out my work at 
            <a href="https://hussainkhan.co.in" style="color:#D7FF00;text-decoration:none;">hussainkhan.co.in</a>
          </p>

          <div style="border-top:1px solid #1e1e1e;padding-top:24px;margin-top:8px;">
            <p style="color:#555;font-size:13px;margin:0 0 4px;">Here's a summary of what you sent:</p>
            <table style="width:100%;border-collapse:collapse;margin-top:12px;">
              ${projectType ? `<tr><td style="padding:8px 0;color:#555;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;width:120px;">Project</td><td style="padding:8px 0;color:#fff;font-size:14px;">${projectType}</td></tr>` : ""}
              ${budget ? `<tr><td style="padding:8px 0;color:#555;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;">Budget</td><td style="padding:8px 0;color:#fff;font-size:14px;">${budget}</td></tr>` : ""}
              <tr><td style="padding:8px 0;color:#555;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;">Message</td><td style="padding:8px 0;color:#aaa;font-size:14px;line-height:1.6;">${message}</td></tr>
            </table>
          </div>

          <div style="margin-top:40px;padding:24px;border:1px solid #1e1e1e;border-radius:12px;background:#111;">
            <p style="color:#fff;font-weight:700;font-size:16px;margin:0 0 4px;">Hussain Khan</p>
            <p style="color:#555;font-size:12px;margin:0 0 12px;letter-spacing:0.1em;text-transform:uppercase;">Creative Designer & Brand Strategist</p>
            <a href="mailto:hello@hussainkhan.co.in" style="color:#D7FF00;font-size:13px;text-decoration:none;">hello@hussainkhan.co.in</a>
          </div>

          <p style="margin-top:32px;color:#333;font-size:11px;letter-spacing:0.08em;">
            © 2026 Hussain Khan — hussainkhan.co.in
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}