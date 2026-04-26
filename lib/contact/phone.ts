type PhoneFormatConfig = string | (Record<string, string> & { default: string })

type PhoneCountryRule = {
  iso2: string
  code: string
  country: string
  minNationalDigits: number
  maxNationalDigits: number
  displayGroups: number[]
  inputFormat: PhoneFormatConfig
}

export const LATAM_COUNTRIES: readonly PhoneCountryRule[] = [
  {
    iso2: "uy",
    code: "598",
    country: "Uruguay",
    minNationalDigits: 8,
    maxNationalDigits: 8,
    displayGroups: [2, 3, 3],
    inputFormat: ".. ... ...",
  },
  {
    iso2: "ar",
    code: "54",
    country: "Argentina",
    minNationalDigits: 10,
    maxNationalDigits: 11,
    displayGroups: [2, 4, 4],
    inputFormat: {
      default: "(..) .... ....",
      "/^9/": "9 .. .... ....",
    },
  },
  {
    iso2: "cl",
    code: "56",
    country: "Chile",
    minNationalDigits: 9,
    maxNationalDigits: 9,
    displayGroups: [1, 4, 4],
    inputFormat: ". .... ....",
  },
  {
    iso2: "br",
    code: "55",
    country: "Brazil",
    minNationalDigits: 10,
    maxNationalDigits: 11,
    displayGroups: [2, 5, 4],
    inputFormat: {
      default: "(..) .....-....",
      "/^\\d{0,10}$/": "(..) ....-....",
    },
  },
  {
    iso2: "py",
    code: "595",
    country: "Paraguay",
    minNationalDigits: 9,
    maxNationalDigits: 9,
    displayGroups: [3, 3, 3],
    inputFormat: "... ... ...",
  },
  {
    iso2: "bo",
    code: "591",
    country: "Bolivia",
    minNationalDigits: 8,
    maxNationalDigits: 8,
    displayGroups: [4, 4],
    inputFormat: ".... ....",
  },
  {
    iso2: "pe",
    code: "51",
    country: "Peru",
    minNationalDigits: 9,
    maxNationalDigits: 9,
    displayGroups: [3, 3, 3],
    inputFormat: "... ... ...",
  },
  {
    iso2: "ec",
    code: "593",
    country: "Ecuador",
    minNationalDigits: 9,
    maxNationalDigits: 9,
    displayGroups: [1, 4, 4],
    inputFormat: ". .... ....",
  },
  {
    iso2: "co",
    code: "57",
    country: "Colombia",
    minNationalDigits: 10,
    maxNationalDigits: 10,
    displayGroups: [3, 3, 4],
    inputFormat: "... ... ....",
  },
  {
    iso2: "mx",
    code: "52",
    country: "Mexico",
    minNationalDigits: 10,
    maxNationalDigits: 10,
    displayGroups: [3, 3, 4],
    inputFormat: "... ... ....",
  },
] as const

export const COUNTRY_PHONE_LIMITS: Record<string, { minDigits: number; maxDigits: number }> = {
  "598": { minDigits: 8, maxDigits: 8 },
  "54": { minDigits: 10, maxDigits: 11 },
  "56": { minDigits: 9, maxDigits: 9 },
  "55": { minDigits: 10, maxDigits: 11 },
  "595": { minDigits: 9, maxDigits: 9 },
  "591": { minDigits: 8, maxDigits: 8 },
  "51": { minDigits: 9, maxDigits: 9 },
  "593": { minDigits: 9, maxDigits: 9 },
  "57": { minDigits: 10, maxDigits: 10 },
  "52": { minDigits: 10, maxDigits: 10 },
}

export function getLatamCountryRuleByIso2(iso2: string) {
  return LATAM_COUNTRIES.find((country) => country.iso2 === iso2)
}

function getLatamCountryRuleFromDigits(digits: string) {
  return LATAM_COUNTRIES.find((country) => digits.startsWith(country.code))
}

function groupDigits(value: string, groups: number[]) {
  const parts: string[] = []
  let start = 0

  for (const groupSize of groups) {
    if (start >= value.length) break
    parts.push(value.slice(start, start + groupSize))
    start += groupSize
  }

  if (start < value.length) parts.push(value.slice(start))

  return parts.filter(Boolean).join(" ")
}

function getDisplayGroups(rule: PhoneCountryRule, nationalDigits: string) {
  if (rule.code === "54" && nationalDigits.startsWith("9") && nationalDigits.length === 11) {
    return [1, 2, 4, 4]
  }

  if (rule.code === "55" && nationalDigits.length === 10) {
    return [2, 4, 4]
  }

  return rule.displayGroups
}

export function getWhatsAppUrl(value?: string): string | undefined {
  if (!value) return undefined

  const digits = value.replace(/\D/g, "")
  if (digits.length < 8) return undefined

  for (const { code } of LATAM_COUNTRIES) {
    if (digits.startsWith(code)) {
      return `https://wa.me/${digits}`
    }
  }

  if (digits.length === 9 && digits.startsWith("9")) {
    return `https://wa.me/598${digits}`
  }

  if (digits.length === 10 && /^(11|15|9)/.test(digits)) {
    return `https://wa.me/54${digits}`
  }

  return `https://wa.me/${digits}`
}

export function formatPhoneDisplay(value?: string): string {
  if (!value) return "No informado"

  const digits = value.replace(/\D/g, "")

  const rule = getLatamCountryRuleFromDigits(digits)
  if (rule) {
    const national = digits.slice(rule.code.length)
    return `+${rule.code} ${groupDigits(national, getDisplayGroups(rule, national))}`
  }

  if (digits.length === 9 && digits.startsWith("9")) {
    return `+598 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`
  }

  return value
}

export function validatePhoneForCountry(value: string | undefined): boolean {
  if (!value) return true

  const digits = value.replace(/\D/g, "")
  if (digits.length < 8) return false

  const rule = getLatamCountryRuleFromDigits(digits)
  if (rule) {
    const nationalLength = digits.slice(rule.code.length).length
    return (
      nationalLength >= rule.minNationalDigits &&
      nationalLength <= rule.maxNationalDigits
    )
  }

  return digits.length >= 8 && digits.length <= 15
}
