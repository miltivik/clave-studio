import { NextResponse } from "next/server"
import { Resend } from "resend"
import { contactSchema } from "@/lib/validations"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = contactSchema.parse(body)

    const serviceLabels: Record<string, string> = {
      web: "Sitio web",
      ecommerce: "E-commerce",
      automations: "Automatizaciones",
      unsure: "No sé bien",
    }

    await resend.emails.send({
      from: "Clave Studio <onboarding@resend.dev>",
      to: "hola@clave.studio",
      subject: `Nueva consulta de ${parsed.name} — ${serviceLabels[parsed.service]}`,
      html: `
        <h2>Nueva consulta desde clave.studio</h2>
        <p><strong>Nombre:</strong> ${parsed.name}</p>
        <p><strong>Email:</strong> ${parsed.email}</p>
        <p><strong>WhatsApp:</strong> ${parsed.whatsapp || "No proporcionado"}</p>
        <p><strong>Servicio:</strong> ${serviceLabels[parsed.service]}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${parsed.message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Error al procesar tu mensaje" },
      { status: 500 }
    )
  }
}
