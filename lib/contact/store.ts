import { createClient } from "@supabase/supabase-js"
import type { ContactServerConfig } from "@/lib/contact/config"
import type {
  ContactCaptchaStatus,
  ContactNotificationStatus,
  ContactSubmissionStatus,
} from "@/lib/contact/constants"
import type { ContactService } from "@/lib/contact/schema"

export interface ContactLeadInput {
  name: string
  email: string
  whatsapp?: string
  service: ContactService
  message: string
  sourcePath: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
  referrer?: string
  userAgent: string
  ipHash: string
  captchaStatus: ContactCaptchaStatus
  submissionStatus: ContactSubmissionStatus
  notificationStatus: ContactNotificationStatus
  blockedReason?: string
}

export interface ContactLeadRecord extends ContactLeadInput {
  id: string
  createdAt: string
  notificationId?: string
}

interface ContactLeadDatabaseRow {
  id: string
  created_at: string
  notification_id: string | null
}

function createSupabaseAdminClient(config: ContactServerConfig) {
  return createClient(config.supabaseUrl, config.supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

function toDatabaseRow(input: ContactLeadInput) {
  return {
    name: input.name,
    email: input.email,
    whatsapp: input.whatsapp ?? null,
    service: input.service,
    message: input.message,
    source_path: input.sourcePath,
    utm_source: input.utmSource ?? null,
    utm_medium: input.utmMedium ?? null,
    utm_campaign: input.utmCampaign ?? null,
    utm_term: input.utmTerm ?? null,
    utm_content: input.utmContent ?? null,
    referrer: input.referrer ?? null,
    user_agent: input.userAgent,
    ip_hash: input.ipHash,
    captcha_status: input.captchaStatus,
    submission_status: input.submissionStatus,
    notification_status: input.notificationStatus,
    blocked_reason: input.blockedReason ?? null,
  }
}

export async function countRecentLeadAttempts(
  config: ContactServerConfig,
  ipHash: string,
  sinceIso: string
) {
  const supabase = createSupabaseAdminClient(config)
  const { count, error } = await supabase
    .from("contact_leads")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", sinceIso)

  if (error) throw error

  return count ?? 0
}

export async function insertContactLead(
  config: ContactServerConfig,
  input: ContactLeadInput
): Promise<ContactLeadRecord> {
  const supabase = createSupabaseAdminClient(config)
  const { data, error } = await supabase
    .from("contact_leads")
    .insert(toDatabaseRow(input))
    .select("id, created_at, notification_id")
    .single<ContactLeadDatabaseRow>()

  if (error) throw error

  return {
    ...input,
    id: data.id,
    createdAt: data.created_at,
    notificationId: data.notification_id ?? undefined,
  }
}

export async function updateContactLeadNotification(
  config: ContactServerConfig,
  leadId: string,
  updates: {
    notificationStatus: ContactNotificationStatus
    notificationId?: string
  }
) {
  const supabase = createSupabaseAdminClient(config)
  const payload: { notification_status: ContactNotificationStatus; notification_id?: string | null } =
    {
      notification_status: updates.notificationStatus,
    }

  if (updates.notificationId !== undefined) {
    payload.notification_id = updates.notificationId
  }

  const { error } = await supabase.from("contact_leads").update(payload).eq("id", leadId)

  if (error) throw error
}
