import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-negro-clave">
      <Navbar />
      <main className="container-clave pt-32 pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-oro-clave">
            Error 404
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.25rem)] font-light text-crema">
            Página no encontrada
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-grafito">
            La página que buscás no existe o fue movida. Volvé al inicio para seguir navegando.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-oro-clave bg-oro-clave px-8 py-3.5 text-sm font-medium text-negro-clave transition-all hover:bg-miel"
            >
              Volver al inicio
            </Link>
            <Link
              href="/servicios"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-oro-clave/30 bg-transparent px-8 py-3.5 text-sm font-medium text-oro-clave transition-all hover:border-oro-clave hover:bg-oro-clave/10"
            >
              Ver servicios
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
