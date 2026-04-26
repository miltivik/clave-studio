"use client"

import { useState, useRef } from "react"
import {
  PhoneInput,
  buildCountryData,
  defaultCountries,
  parseCountry,
} from "react-international-phone"
import "react-international-phone/style.css"
import type { UseFormRegister, FieldErrors } from "react-hook-form"
import type { CountryData } from "react-international-phone"
import type { ContactFormValues } from "@/lib/contact/schema"
import { LATAM_COUNTRIES, getLatamCountryRuleByIso2 } from "@/lib/contact/phone"

interface PhoneInputFieldProps {
  register: UseFormRegister<ContactFormValues>
  errors: FieldErrors<ContactFormValues>
}

const LATAM_ISO2 = LATAM_COUNTRIES.map((country) => country.iso2)

const latamCountries: CountryData[] = defaultCountries.filter((country) => {
  const { iso2 } = parseCountry(country)
  return LATAM_ISO2.includes(iso2)
}).map((country) => {
  const parsedCountry = parseCountry(country)
  const rule = getLatamCountryRuleByIso2(parsedCountry.iso2)

  if (!rule) return country

  return buildCountryData({
    ...parsedCountry,
    format: rule.inputFormat,
  })
})

export function PhoneInputField({ register, errors }: PhoneInputFieldProps) {
  const { onChange, name, onBlur } = register("whatsapp")
  const [phone, setPhone] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="whatsapp" className="text-xs uppercase tracking-wider text-crema/60">
        WhatsApp (opcional)
      </label>
      <div
        className="relative pl-2 h-12 rounded-lg border border-grafito/20 bg-negro-mid overflow-visible focus-within:border-oro-clave/50 focus-within:ring-2 focus-within:ring-oro-clave/60 z-10 flex items-center cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <PhoneInput
          value={phone}
          onChange={(phone) => {
            setPhone(phone)
            onChange({ target: { value: phone, name } } as React.ChangeEvent<HTMLInputElement>)
          }}
          onBlur={onBlur}
          countries={latamCountries}
          defaultCountry="uy"
          placeholder="Numero de WhatsApp"
          charAfterDialCode=" "
          disableFormatting={false}
          inputRef={inputRef}
          inputProps={{ id: "whatsapp" }}
          style={{
            "--react-international-phone-height": "48px",
            "--react-international-phone-background-color": "#1c1c1e",
            "--react-international-phone-text-color": "#f8f4ea",
            "--react-international-phone-font-size": "14px",
            "--react-international-phone-border-radius": "0px",
            "--react-international-phone-border-color": "transparent",
            "--react-international-phone-country-selector-background-color": "transparent",
            "--react-international-phone-country-selector-arrow-color": "#c98706",
            "--react-international-phone-input-padding-inline-start": "16px",
            "--react-international-phone-dropdown-item-background-color": "#1c1c1e",
            "--react-international-phone-dropdown-item-text-color": "#f8f4ea",
            "--react-international-phone-selected-dropdown-item-background-color": "#2c2c2e",
            "--react-international-phone-selected-dropdown-item-text-color": "#f8f4ea",
            "--react-international-phone-dropdown-item-dial-code-color": "#c98706",
            "--react-international-phone-dropdown-shadow": "0 8px 32px rgba(0,0,0,0.7)",
            "--react-international-phone-dropdown-z-index": "9999",
            "--react-international-phone-input-max-width": "100%",
          } as React.CSSProperties}
          inputClassName="!bg-negro-mid !text-crema placeholder:!text-grafito/40 !flex-1 !min-w-0 !w-full !h-full"
          countrySelectorStyleProps={{
            buttonStyle: {
              backgroundColor: "transparent",
              height: "100%",
            },
            dropdownStyleProps: {
              className: "overscroll-contain",
            },
          }}
        />
      </div>
      {errors.whatsapp && (
        <span className="text-xs text-red-400">{errors.whatsapp.message}</span>
      )}
    </div>
  )
}
