import React from "react"

interface SectionHeaderProps {
  badge: React.ReactNode;
  title: React.ReactNode;
  className?: string;
}

export function SectionHeader({ badge, title, className = "mb-16" }: SectionHeaderProps) {
  return (
    <div className={className}>
      <span className="text-oro-clave font-body text-sm font-medium tracking-widest uppercase mb-4 block">
        {badge}
      </span>
      <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light leading-tight">
        {title}
      </h2>
    </div>
  )
}
