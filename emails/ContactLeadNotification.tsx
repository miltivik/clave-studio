import type { CSSProperties } from "react"
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components"
import { CONTACT_SERVICE_LABELS } from "@/lib/contact/constants"
import { getWhatsAppUrl, formatPhoneDisplay } from "@/lib/contact/phone"
import type { ContactLeadRecord } from "@/lib/contact/store"

interface ContactLeadNotificationProps {
  lead: ContactLeadRecord
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("es-UY", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Montevideo",
  }).format(new Date(value))
}

function getInitials(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null

  return (
    <Row>
      <Column style={detailLabelColumn}>
        <Text style={detailLabel}>{label}</Text>
      </Column>
      <Column>
        <Text style={detailValue}>{value}</Text>
      </Column>
    </Row>
  )
}

function MetaPill({ label, value }: { label: string; value?: string }) {
  if (!value) return null

  return (
    <Text style={metaPill}>
      <span style={metaPillLabel}>{label}</span> {value}
    </Text>
  )
}

export function ContactLeadNotification({ lead }: ContactLeadNotificationProps) {
  const serviceLabel = CONTACT_SERVICE_LABELS[lead.service]
  const whatsappUrl = getWhatsAppUrl(lead.whatsapp)
  const replySubject = encodeURIComponent(`Consulta Clave Studio - ${serviceLabel}`)
  const replyUrl = `mailto:${lead.email}?subject=${replySubject}`
  const leadInitials = getInitials(lead.name)

  return (
    <Html lang="es">
      <Head />
      <Preview>
        {lead.name} envió una consulta sobre {serviceLabel}
      </Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={topLine} />

          <Section style={brandHeader}>
            <Row>
              <Column style={brandMarkColumn}>
                <Text style={brandMark}>CS</Text>
              </Column>
              <Column>
                <Text style={brandName}>Clave Studio</Text>
                <Text style={brandCaption}>Nuevo contacto desde el sitio</Text>
              </Column>
            </Row>
          </Section>

          <Section style={heroCard}>
            <Text style={kicker}>Lead recibido</Text>
            <Heading as="h1" style={heading}>
              {lead.name} quiere hablar sobre {serviceLabel}
            </Heading>
            <Text style={leadTime}>Recibido {formatDateTime(lead.createdAt)}</Text>

            <Section style={profileRow}>
              <Row>
                <Column style={avatarColumn}>
                  <Text style={avatar}>{leadInitials || "?"}</Text>
                </Column>
                <Column>
                  <Text style={profileName}>{lead.name}</Text>
                  <Text style={profileEmail}>{lead.email}</Text>
                </Column>
              </Row>
            </Section>
          </Section>

          <Section style={quickActions}>
            <Button href={replyUrl} style={primaryButton}>
              Responder por email
            </Button>
            {whatsappUrl && (
              <Button href={whatsappUrl} style={secondaryButton}>
                Abrir WhatsApp
              </Button>
            )}
          </Section>

          <Section style={messageCard}>
            <Text style={sectionTitle}>Mensaje</Text>
            <Text style={messageText}>{lead.message}</Text>
          </Section>

          <Section style={detailsCard}>
            <Text style={sectionTitle}>Datos del contacto</Text>
            <DetailRow label="Servicio" value={serviceLabel} />
            <DetailRow label="Email" value={lead.email} />
            <DetailRow label="WhatsApp" value={formatPhoneDisplay(lead.whatsapp)} />
            <DetailRow label="Página" value={lead.sourcePath} />
            <DetailRow label="Referrer" value={lead.referrer} />
          </Section>

          <Section style={metaCard}>
            <Text style={sectionTitle}>Campaña y trazabilidad</Text>
            <MetaPill label="utm_source" value={lead.utmSource} />
            <MetaPill label="utm_medium" value={lead.utmMedium} />
            <MetaPill label="utm_campaign" value={lead.utmCampaign} />
            <MetaPill label="utm_term" value={lead.utmTerm} />
            <MetaPill label="utm_content" value={lead.utmContent} />
            {!lead.utmSource &&
              !lead.utmMedium &&
              !lead.utmCampaign &&
              !lead.utmTerm &&
              !lead.utmContent && <Text style={emptyMeta}>Sin parámetros UTM.</Text>}
          </Section>

          <Hr style={footerDivider} />

          <Text style={footer}>
            Lead ID: {lead.id}
            <br />
            Correo automático generado por el formulario de contacto de Clave Studio.
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

const brandMarkColumn: CSSProperties = {
  width: "48px",
}

const brandMark: CSSProperties = {
  width: "38px",
  height: "38px",
  margin: 0,
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

const brandCaption: CSSProperties = {
  margin: 0,
  color: "#756f61",
  fontSize: "12px",
  lineHeight: "18px",
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
  fontSize: "30px",
  lineHeight: "37px",
  fontWeight: 800,
}

const leadTime: CSSProperties = {
  margin: 0,
  color: "#776f5f",
  fontSize: "14px",
  lineHeight: "22px",
}

const profileRow: CSSProperties = {
  marginTop: "24px",
  padding: "16px",
  backgroundColor: "#f8f4ea",
  borderRadius: "14px",
}

const avatarColumn: CSSProperties = {
  width: "56px",
}

const avatar: CSSProperties = {
  width: "44px",
  height: "44px",
  margin: 0,
  borderRadius: "999px",
  backgroundColor: "#161411",
  color: "#f8f2df",
  fontSize: "14px",
  lineHeight: "44px",
  fontWeight: 800,
  textAlign: "center",
}

const profileName: CSSProperties = {
  margin: "2px 0 2px",
  color: "#161411",
  fontSize: "15px",
  lineHeight: "22px",
  fontWeight: 800,
}

const profileEmail: CSSProperties = {
  margin: 0,
  color: "#756f61",
  fontSize: "13px",
  lineHeight: "20px",
}

const quickActions: CSSProperties = {
  padding: "20px 0 6px",
}

const primaryButton: CSSProperties = {
  display: "inline-block",
  marginRight: "10px",
  marginBottom: "10px",
  padding: "13px 18px",
  backgroundColor: "#161411",
  borderRadius: "10px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: 800,
  textDecoration: "none",
}

const secondaryButton: CSSProperties = {
  display: "inline-block",
  marginBottom: "10px",
  padding: "13px 18px",
  backgroundColor: "#c98706",
  borderRadius: "10px",
  color: "#161411",
  fontSize: "14px",
  fontWeight: 800,
  textDecoration: "none",
}

const messageCard: CSSProperties = {
  marginTop: "14px",
  padding: "24px",
  backgroundColor: "#161411",
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

const messageText: CSSProperties = {
  margin: 0,
  color: "#fff7df",
  fontSize: "17px",
  lineHeight: "28px",
  whiteSpace: "pre-wrap",
}

const detailsCard: CSSProperties = {
  marginTop: "14px",
  padding: "22px 24px",
  backgroundColor: "#ffffff",
  border: "1px solid #ddd7c8",
  borderRadius: "16px",
}

const detailLabelColumn: CSSProperties = {
  width: "132px",
}

const detailLabel: CSSProperties = {
  margin: "5px 0",
  color: "#8a8271",
  fontSize: "12px",
  lineHeight: "18px",
}

const detailValue: CSSProperties = {
  margin: "5px 0",
  color: "#161411",
  fontSize: "13px",
  lineHeight: "19px",
  fontWeight: 700,
  wordBreak: "break-word",
}

const metaCard: CSSProperties = {
  marginTop: "14px",
  padding: "20px 24px",
  backgroundColor: "#fbf8f0",
  border: "1px solid #e5dcc8",
  borderRadius: "16px",
}

const metaPill: CSSProperties = {
  display: "inline-block",
  margin: "0 7px 8px 0",
  padding: "7px 10px",
  backgroundColor: "#ffffff",
  border: "1px solid #e1d8c5",
  borderRadius: "999px",
  color: "#252018",
  fontSize: "12px",
  lineHeight: "17px",
}

const metaPillLabel: CSSProperties = {
  color: "#8a8271",
  fontWeight: 700,
}

const emptyMeta: CSSProperties = {
  margin: 0,
  color: "#756f61",
  fontSize: "13px",
  lineHeight: "20px",
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
