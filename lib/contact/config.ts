import { siteConfig } from "@/lib/site"

export interface ContactServerConfig {
  supabaseUrl: string
  supabaseServiceRoleKey: string
  turnstileSecretKey: string
  securitySalt: string
  resendApiKey?: string
  emailTo: string
  emailFrom: string
  emailFromName: string
}

export interface ContactConfigResult<TConfig> {
  config: TConfig | null
  missing: string[]
}

export function getContactClientConfig() {
  return {
    turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "",
  }
}

export function getContactServerConfig(): ContactConfigResult<ContactServerConfig> {
  const env = {
    supabaseUrl: process.env.SUPABASE_URL?.trim(),
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY?.trim(),
    turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY?.trim(),
    securitySalt: process.env.CONTACT_SECURITY_SALT?.trim(),
    resendApiKey: process.env.RESEND_API_KEY?.trim(),
    emailTo: process.env.CONTACT_TO_EMAIL?.trim() || siteConfig.email,
    emailFrom: process.env.CONTACT_FROM_EMAIL?.trim() || "onboarding@resend.dev",
    emailFromName: process.env.CONTACT_FROM_NAME?.trim() || "Clave Studio",
  }

  const missing = [
    ["SUPABASE_URL", env.supabaseUrl],
    ["SUPABASE_SERVICE_ROLE_KEY", env.supabaseServiceRoleKey],
    ["TURNSTILE_SECRET_KEY", env.turnstileSecretKey],
    ["CONTACT_SECURITY_SALT", env.securitySalt],
  ] as const

  const missingKeys = missing
    .filter(([, value]) => !value)
    .map(([key]) => key)

  if (missingKeys.length > 0) return { config: null, missing: [...missingKeys] }

  return {
    config: {
      supabaseUrl: env.supabaseUrl!,
      supabaseServiceRoleKey: env.supabaseServiceRoleKey!,
      turnstileSecretKey: env.turnstileSecretKey!,
      securitySalt: env.securitySalt!,
      resendApiKey: env.resendApiKey,
      emailTo: env.emailTo,
      emailFrom: env.emailFrom,
      emailFromName: env.emailFromName,
    },
    missing: [],
  }
}
