# Clave Digital

Sitio comercial en Next.js 16 para Clave Studio Digital.

## Desarrollo

```bash
pnpm install
pnpm dev
```

Scripts útiles:

```bash
pnpm lint
pnpm build
pnpm perf
```

## Variables de entorno

Copiar `.env.example` a `.env.local` o completar `.env` localmente.

El flujo de contacto depende de estas variables:

```bash
RESEND_API_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
CONTACT_SECURITY_SALT=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
CONTACT_FROM_NAME=
```

Notas:

- `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` y `CONTACT_FROM_NAME` son opcionales. Si faltan, el sistema usa los fallbacks actuales.
- El ajuste final de remitente, dominio verificado y politica de `reply-to` de Resend sigue pendiente por definicion de producto.
- Sin `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `TURNSTILE_SECRET_KEY` y `CONTACT_SECURITY_SALT` el endpoint de contacto responderá error de configuración.

## Supabase

Crear la tabla ejecutando la migracion SQL:

```sql
supabase/migrations/20260422_create_contact_leads.sql
```

La tabla `contact_leads` guarda:

- datos del lead
- origen de conversion (`source_path`, `utm_*`, `referrer`)
- `user_agent`
- `ip_hash` con sal, nunca la IP cruda
- estados de captcha, envio y notificacion

## Flujo de contacto

El formulario hace lo siguiente:

- valida los datos en cliente y servidor
- usa honeypot oculto
- exige Cloudflare Turnstile
- limita a 3 intentos por 15 minutos por `ip_hash`
- guarda cada lead en Supabase
- intenta mandar la notificacion con Resend
- si Resend falla, conserva el lead y marca `notification_status = failed`
