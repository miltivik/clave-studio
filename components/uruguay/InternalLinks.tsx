import Link from "next/link"

interface InternalLink {
  label: string
  href: string
}

interface InternalLinksProps {
  links: InternalLink[]
}

export function InternalLinks({ links }: InternalLinksProps) {
  return (
    <section className="py-16 border-t border-grafito/10">
      <div className="container-clave">
        <div className="flex flex-wrap gap-4 justify-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-6 py-3 rounded-full border border-oro-clave/30 text-oro-clave hover:bg-oro-clave/10 transition-colors text-sm font-body"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
