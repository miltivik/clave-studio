import type { CSSProperties } from "react"
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import { CONTACT_SERVICE_LABELS } from "@/lib/contact/constants"
import type { ContactLeadRecord } from "@/lib/contact/store"

interface ContactLeadAutoReplyProps {
  lead: Pick<ContactLeadRecord, "name" | "email" | "service" | "message">
}

export function ContactLeadAutoReply({ lead }: ContactLeadAutoReplyProps) {
  const serviceLabel = CONTACT_SERVICE_LABELS[lead.service]
  const firstName = lead.name.split(" ")[0]

  return (
    <Html lang="es">
      <Head />
      <Preview>
        Recibimos tu consulta sobre {serviceLabel} — te respondemos en menos de 24 horas
      </Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={topLine} />

          <Section style={brandHeader}>
            <Text style={brandMark}>CS</Text>
            <Text style={brandName}>Clave Studio</Text>
          </Section>

          <Section style={heroCard}>
            <Text style={kicker}>Consulta recibida</Text>
            <Heading as="h1" style={heading}>
              Hola {firstName}, recibimos tu mensaje
            </Heading>
            <Text style={leadTime}>
              Te respondemos en menos de 24 horas con una propuesta clara y sin compromiso.
            </Text>
          </Section>

          <Section style={summaryCard}>
            <Text style={sectionTitle}>Resumen de tu consulta</Text>
            <Text style={summaryRow}>
              <span style={summaryLabel}>Servicio:</span> {serviceLabel}
            </Text>
            <Text style={summaryRow}>
              <span style={summaryLabel}>Mensaje:</span>
            </Text>
            <Text style={messageText}>{lead.message}</Text>
          </Section>

          <Section style={infoCard}>
            <Text style={sectionTitle}>¿Qué sigue</Text>
            <Text style={infoText}>
              1. Revisamos tu proyecto y necesidades.
            </Text>
            <Text style={infoText}>
              2. Te contactamos por email o WhatsApp para una llamada de descubrimiento gratuita.
            </Text>
            <Text style={infoText}>
              3. Te enviamos una propuesta a medida con alcance, tiempos y inversión.
            </Text>
          </Section>

          <Section style={contactCard}>
            <Text style={sectionTitle}>Nuestros canales</Text>
            <Text style={contactText}>
              Email: hola@clave.studio
            </Text>
            <Text style={contactText}>
              WhatsApp: +598 92 395 129
            </Text>
            <Text style={contactText}>
              Instagram: @clavestudiodigital
            </Text>
          </Section>

          <Hr style={footerDivider} />

          <Text style={footer}>
            Este es un correo automático generado por el formulario de contacto de Clave Studio.
            <br />
            No hace falta que respondas este mensaje, ya estamos en contacto.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const body: CSSProperties = {
  margin: 0,
  backgroundColor: "#f3f0e8",
  color: "#161411",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
}

const container: CSSProperties = {
  width: "100%",
  maxWidth: "640px",
  margin: "0 auto",
  padding: "32px 18px 40px",
}

const topLine: CSSProperties = {
  height: "7px",
  backgroundColor: "#c98706",
  borderRadius: "999px",
  marginBottom: "20px",
}

const brandHeader: CSSProperties = {
  padding: "0 4px 20px",
}

const brandMark: CSSProperties = {
  width: "38px",
  height: "38px",
  margin: "0 0 8px",
  borderRadius: "12px",
  backgroundColor: "#161411",
  color: "#f8f2df",
  fontSize: "13px",
  lineHeight: "38px",
  fontWeight: 800,
  textAlign: "center",
}

const brandName: CSSProperties = {
  margin: "0 0 2px",
  color: "#161411",
  fontSize: "15px",
  lineHeight: "21px",
  fontWeight: 800,
}

const heroCard: CSSProperties = {
  padding: "30px",
  backgroundColor: "#ffffff",
  border: "1px solid #ddd7c8",
  borderRadius: "18px",
  boxShadow: "0 10px 28px rgba(45, 39, 25, 0.08)",
}

const kicker: CSSProperties = {
  display: "inline-block",
  margin: "0 0 14px",
  padding: "7px 11px",
  borderRadius: "999px",
  backgroundColor: "#f4e7bf",
  color: "#7b5200",
  fontSize: "11px",
  lineHeight: "14px",
  fontWeight: 800,
  letterSpacing: "1px",
  textTransform: "uppercase",
}

const heading: CSSProperties = {
  margin: "0 0 12px",
  color: "#161411",
  fontSize: "26px",
  lineHeight: "33px",
  fontWeight: 800,
}

const leadTime: CSSProperties = {
  margin: 0,
  color: "#776f5f",
  fontSize: "14px",
  lineHeight: "22px",
}

const summaryCard: CSSProperties = {
  marginTop: "14px",
  padding: "24px",
  backgroundColor: "#ffffff",
  border: "1px solid #ddd7c8",
  borderRadius: "16px",
}

const sectionTitle: CSSProperties = {
  margin: "0 0 12px",
  color: "#c98706",
  fontSize: "12px",
  lineHeight: "18px",
  fontWeight: 800,
  letterSpacing: "1px",
  textTransform: "uppercase",
}

const summaryRow: CSSProperties = {
  margin: "5px 0",
  color: "#161411",
  fontSize: "14px",
  lineHeight: "22px",
}

const summaryLabel: CSSProperties = {
  color: "#8a8271",
  fontWeight: 700,
}

const messageText: CSSProperties = {
  margin: "8px 0 0",
  padding: "14px 16px",
  backgroundColor: "#f8f4ea",
  borderRadius: "12px",
  color: "#252018",
  fontSize: "14px",
  lineHeight: "23px",
  whiteSpace: "pre-wrap",
}

const infoCard: CSSProperties = {
  marginTop: "14px",
  padding: "22px 24px",
  backgroundColor: "#161411",
  borderRadius: "16px",
}

const infoText: CSSProperties = {
  margin: "0 0 10px",
  color: "#fff7df",
  fontSize: "14px",
  lineHeight: "22px",
}

const contactCard: CSSProperties = {
  marginTop: "14px",
  padding: "22px 24px",
  backgroundColor: "#fbf8f0",
  border: "1px solid #e5dcc8",
  borderRadius: "16px",
}

const contactText: CSSProperties = {
  margin: "4px 0",
  color: "#252018",
  fontSize: "14px",
  lineHeight: "22px",
}

const footerDivider: CSSProperties = {
  borderColor: "#ded5c3",
  margin: "26px 0 16px",
}

const footer: CSSProperties = {
  margin: 0,
  color: "#756f61",
  fontSize: "11px",
  lineHeight: "18px",
}
