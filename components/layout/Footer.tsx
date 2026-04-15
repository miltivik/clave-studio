import Link from "next/link"
import { Logo } from "@/components/Logo"

const SERVICES_LINKS = [
  { label: "Desarrollo web", href: "/desarrollo-web-uruguay" },
  { label: "E-commerce", href: "/ecommerce-uruguay" },
  { label: "Automatizaciones", href: "/automatizaciones-uruguay" },
  { label: "Agencia Uruguay", href: "/agencia-digital-uruguay" },
  { label: "Consultoría", href: "#contacto" },
]

const COMPANY_LINKS = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Proceso", href: "#proceso" },
  { label: "Precios", href: "#precios" },
  { label: "Preguntas frecuentes", href: "#faq" },
]

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="bg-negro-mid border-t border-grafito/20">
      <div className="container-clave section-padding pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Col 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 text-oro-clave mb-4">
              <Logo size={28} />
              <span className="font-display text-lg font-medium">Clave</span>
            </div>
            <p className="text-grafito text-sm leading-relaxed mb-6 max-w-[280px]">
              Abrimos las puertas de tu mundo digital.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="/servicios"
                target="_blank"
                rel="noopener noreferrer"
                className="text-grafito hover:text-oro-clave transition-colors"
                aria-label="Servicios"
              >
                <InstagramIcon />
              </a>
              <a
                href="/#contacto"
                target="_blank"
                rel="noopener noreferrer"
                className="text-grafito hover:text-oro-clave transition-colors"
                aria-label="Contacto"
              >
                <LinkedInIcon />
              </a>
              <a
                href="mailto:hola@clave.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-grafito hover:text-oro-clave transition-colors"
                aria-label="Email"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Col 2: Servicios */}
          <div>
            <h4 className="font-body font-semibold text-crema text-sm mb-4 tracking-wide uppercase">
              Servicios
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/servicios"
                  className="text-grafito hover:text-oro-clave transition-colors text-sm"
                >
                  Todos los servicios
                </a>
              </li>
              {SERVICES_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href.startsWith("#") ? `/${link.href}` : link.href}
                    className="text-grafito hover:text-oro-clave transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Empresa */}
          <div>
            <h4 className="font-body font-semibold text-crema text-sm mb-4 tracking-wide uppercase">
              Empresa
            </h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href.startsWith("#") ? `/${link.href}` : link.href}
                    className="text-grafito hover:text-oro-clave transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contacto */}
          <div>
            <h4 className="font-body font-semibold text-crema text-sm mb-4 tracking-wide uppercase">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-grafito">
              <li>
                <a
                  href="mailto:hola@clave.studio"
                  className="hover:text-oro-clave transition-colors"
                >
                  hola@clave.studio
                </a>
              </li>
              <li>
                <Link
                  href="/#contacto"
                  className="hover:text-oro-clave transition-colors"
                >
                  Solicitar propuesta
                </Link>
              </li>
              <li className="text-grafito/60">Horario: LATAM (UTC-3 a UTC-6)</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-grafito/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-grafito/50 text-xs">
            © 2025 Clave Studio Digital · Todos los derechos reservados
          </p>
          <div className="flex items-center gap-6 text-xs text-grafito/50">
            <a href="/privacidad" className="hover:text-grafito transition-colors">
              Política de privacidad
            </a>
            <a href="/terminos" className="hover:text-grafito transition-colors">
              Términos de uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
