import { NextResponse } from "next/server";

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

    // TODO: In production, send email via Resend/Postmark or save to DB/Baserow
    // await sendLeadEmail(data);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[lead] Error processing lead:", error);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
