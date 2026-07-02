import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.LEAD_TO_EMAIL || "eurofabbro@eurofabbro.com";
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || "Eurofabbro Sito <onboarding@resend.dev>";

const FIELD_LABELS: Record<string, string> = {
  name: "Nome",
  company: "Azienda",
  phone: "Telefono",
  email: "Email",
  type: "Tipo",
  role: "Ruolo",
  message: "Messaggio",
  source: "Provenienza",
  cvName: "CV allegato",
};

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let data: any = {};

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      data = Object.fromEntries(formData.entries());

      // Handle the file separately if needed, for now just log its existence
      const cvFile = formData.get("cv");
      if (cvFile instanceof File) {
        data.cvName = cvFile.name;
        data.cvSize = cvFile.size;
        data.cvType = cvFile.type;
        // In a real app, you'd save the file to S3/Disk here
        console.log("[lead] CV received:", cvFile.name);
      }
    } else {
      data = await request.json();
    }

    console.log("[lead] New lead received:", data);

    const rows = Object.entries(data)
      .filter(([key]) => key !== "cvSize" && key !== "cvType" && key !== "privacy")
      .map(
        ([key, value]) =>
          `<tr><td style="padding:4px 12px 4px 0;font-weight:600;vertical-align:top">${
            FIELD_LABELS[key] || key
          }</td><td style="padding:4px 0">${String(value)}</td></tr>`
      )
      .join("");

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: typeof data.email === "string" && data.email ? data.email : undefined,
      subject: `Nuovo contatto dal sito — ${data.source || "form contatti"}`,
      html: `<table>${rows}</table>`,
    });

    if (error) {
      console.error("[lead] Resend error:", error);
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[lead] Error processing lead:", error);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
