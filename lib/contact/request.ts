import type { ContactFormData } from "@/lib/contact/schema"

export interface ContactRequestMetadata {
  ipAddress: string
  userAgent: string
  referrer?: string
}

function getFirstForwardedAddress(value: string | null) {
  if (!value) return undefined

  const [firstValue] = value.split(",")
  const normalized = firstValue?.trim()
  return normalized || undefined
}

export function getContactRequestMetadata(
  request: Request,
  input: ContactFormData
): ContactRequestMetadata {
  const headers = request.headers

  const ipAddress =
    getFirstForwardedAddress(headers.get("cf-connecting-ip")) ||
    getFirstForwardedAddress(headers.get("x-forwarded-for")) ||
    getFirstForwardedAddress(headers.get("x-real-ip")) ||
    "unknown"

  return {
    ipAddress,
    userAgent: headers.get("user-agent") ?? "unknown",
    referrer: input.referrer ?? headers.get("referer") ?? undefined,
  }
}
