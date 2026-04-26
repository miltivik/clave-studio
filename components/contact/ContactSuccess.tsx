export function ContactSuccess() {
  return (
    <div className="py-16 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-oro-clave/10">
        <svg
          className="h-8 w-8 text-oro-clave"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="mb-2 font-display text-2xl text-crema">Mensaje enviado</h3>
      <p className="text-grafito">Guardamos tu consulta y te respondemos en menos de 24 horas.</p>
    </div>
  )
}
