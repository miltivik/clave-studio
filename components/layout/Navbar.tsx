"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button, buttonVariants } from "@/components/ui/button"
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon"
import { useScroll } from "@/components/ui/use-scroll"
import { SmartLink } from "@/components/ui/SmartLink"
import { Logo } from "@/components/Logo"
import { cn } from "@/lib/utils"

type NavLink =
  | { label: string; href: string }
  | { label: string; sectionId: string }

const NAV_LINKS: NavLink[] = [
  { label: "Soluciones", sectionId: "servicios" },
  { label: "Portfolio", sectionId: "portfolio" },
  { label: "Proceso", sectionId: "proceso" },
  { label: "Precios", sectionId: "precios" },
  { label: "Uruguay", href: "/agencia-digital-uruguay" },
]

export function Navbar() {
  const [open, setOpen] = React.useState(false)
  const scrolled = useScroll(10)
  const pathname = usePathname()

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  function closeMenu() {
    setOpen(false)
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 mx-auto w-full max-w-5xl border-b border-transparent md:rounded-md md:border md:transition-all md:ease-out",
          {
            "bg-[var(--color-negro-clave)]/80 supports-[backdrop-filter]:bg-[var(--color-negro-clave)]/50 border-[var(--color-oro-clave)]/15 backdrop-blur-md md:top-4 md:max-w-4xl md:shadow":
              scrolled && !open,
            "bg-[var(--color-negro-clave)]": open,
          },
        )}
      >
        <nav
          className={cn(
            "flex h-[72px] w-full items-center justify-between px-4 md:h-14 md:transition-all md:ease-out",
            {
              "md:px-6": scrolled,
            },
          )}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[var(--color-oro-clave)] hover:text-[var(--color-miel)] transition-colors"
            onClick={(e) => {
              if (pathname !== "/") return
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            <Logo size={28} />
            <span className="font-display text-lg font-medium tracking-wide hidden sm:block">
              Clave
            </span>
          </Link>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            className={cn(buttonVariants({ variant: "ghost" }), "font-body cursor-pointer")}
            href="/servicios"
            onClick={closeMenu}
          >
            Servicios
          </Link>
          {NAV_LINKS.map((link) =>
            "href" in link ? (
              <Link
                key={link.label}
                className={cn(buttonVariants({ variant: "ghost" }), "font-body cursor-pointer")}
                href={link.href}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ) : (
              <SmartLink
                key={link.label}
                className={cn(buttonVariants({ variant: "ghost" }), "font-body cursor-pointer")}
                sectionId={link.sectionId}
                onClick={closeMenu}
              >
                {link.label}
              </SmartLink>
            ),
          )}
          <SmartLink
            sectionId="contacto"
            onClick={closeMenu}
            className={cn(buttonVariants(), "ml-2 font-display tracking-wide")}
          >
            Hablemos
          </SmartLink>
        </div>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => setOpen(!open)}
          className="lg:hidden text-[var(--color-oro-clave)] hover:text-[var(--color-miel)] hover:bg-transparent"
          aria-label={open ? "Cerrar menu" : "Abrir menu"}
        >
          <MenuToggleIcon open={open} className="size-6" duration={300} />
        </Button>
        </nav>

      <div
        className={cn(
          "bg-[var(--color-negro-mid)] fixed top-[72px] right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div
          data-slot={open ? "open" : "closed"}
          className={cn(
            "data-[slot=open]:animate-in data-[slot=open]:slide-in-from-right-10 data-[slot=closed]:animate-out data-[slot=closed]:slide-out-to-right-10 ease-out duration-300",
            "flex h-full w-full flex-col p-8 pt-12",
          )}
        >
          <div className="flex flex-col gap-6">
            <Link
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "justify-start hover:bg-transparent text-xl font-body hover:text-[var(--color-oro-clave)] p-0 h-auto",
                }),
              )}
              href="/servicios"
              onClick={closeMenu}
            >
              Servicios
            </Link>
            {NAV_LINKS.map((link) =>
              "href" in link ? (
                <Link
                  key={link.label}
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                      className:
                        "justify-start hover:bg-transparent text-xl font-body hover:text-[var(--color-oro-clave)] p-0 h-auto",
                    }),
                  )}
                  href={link.href}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ) : (
                <SmartLink
                  key={link.label}
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                      className:
                        "justify-start hover:bg-transparent text-xl font-body hover:text-[var(--color-oro-clave)] p-0 h-auto",
                    }),
                  )}
                  sectionId={link.sectionId}
                  onClick={closeMenu}
                >
                  {link.label}
                </SmartLink>
              ),
            )}
          </div>
          <div className="flex flex-col mt-12 pt-8 border-t border-[var(--color-grafito)]/30">
            <SmartLink
              sectionId="contacto"
              onClick={closeMenu}
              className={cn(
                buttonVariants(),
                "w-full justify-center font-display tracking-wide text-lg py-6"
              )}
            >
              Hablemos
            </SmartLink>
          </div>
        </div>
      </div>
      </header>
    </>
  )
}
