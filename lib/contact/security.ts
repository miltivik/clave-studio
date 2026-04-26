import { createHash } from "node:crypto"

export interface TurnstileVerificationOptions {
  token: string
  secretKey: string
  ipAddress: string
}

export interface TurnstileVerificationResult {
  isValid: boolean
  isServiceError: boolean
  errorCodes: string[]
}

interface TurnstileSiteVerifyResponse {
  success?: boolean
  "error-codes"?: string[]
}

export function hashIpAddress(ipAddress: string, salt: string) {
  return createHash("sha256")
    .update(`${salt}:${ipAddress || "unknown"}`)
    .digest("hex")
}

export async function verifyTurnstileToken({
  token,
  secretKey,
  ipAddress,
}: TurnstileVerificationOptions): Promise<TurnstileVerificationResult> {
  try {
    const body = new URLSearchParams()
    body.set("secret", secretKey)
    body.set("response", token)

    if (ipAddress && ipAddress !== "unknown") body.set("remoteip", ipAddress)

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
      cache: "no-store",
    })

    if (!response.ok) {
      return {
        isValid: false,
        isServiceError: true,
        errorCodes: ["turnstile_service_unavailable"],
      }
    }

    const payload = (await response.json()) as TurnstileSiteVerifyResponse

    return {
      isValid: Boolean(payload.success),
      isServiceError: false,
      errorCodes: Array.isArray(payload["error-codes"]) ? payload["error-codes"] : [],
    }
  } catch {
    return {
      isValid: false,
      isServiceError: true,
      errorCodes: ["turnstile_service_unavailable"],
    }
  }
}
