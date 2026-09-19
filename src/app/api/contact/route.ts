import { NextRequest, NextResponse } from "next/server";

const SERVICE_ID = process.env.EMAILJS_SERVICE_ID || "service_ey70e17";
const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID || "template_6tusrhc";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, message, time } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message content is required." },
        { status: 400 }
      );
    }

    const senderName = name?.trim() || "Anonymous Visitor";
    const timestamp = time || new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const publicKey =
      process.env.EMAILJS_PUBLIC_KEY ||
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ||
      "";

    // If public key is not yet set in environment, notify client to prompt for public key or use fallback
    if (!publicKey) {
      return NextResponse.json(
        {
          error: "EMAILJS_PUBLIC_KEY_REQUIRED",
          message: "EmailJS Public Key is required to authorize delivery. Add EMAILJS_PUBLIC_KEY to .env.local",
        },
        { status: 422 }
      );
    }

    const payload = {
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: publicKey,
      template_params: {
        name: senderName,
        time: timestamp,
        message: message.trim(),
      },
    };

    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      return NextResponse.json({
        success: true,
        message: "Message sent successfully to Jeshurun!",
      });
    }

    const errorText = await res.text();
    console.error("[EmailJS API Error]:", errorText);

    return NextResponse.json(
      { error: "EMAILJS_DELIVERY_FAILED", details: errorText },
      { status: res.status || 500 }
    );
  } catch (err: any) {
    console.error("[Contact API Error]:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err?.message },
      { status: 500 }
    );
  }
}
