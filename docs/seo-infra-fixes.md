# Fixes de SEO e infraestructura — clavestudio.dev

Runbook verificado el **2026-08-16**. Todos los cambios son pasos del dashboard de Cloudflare (en este repo no hay credenciales de Cloudflare), en orden de prioridad.

Estado observado en vivo:

- `https://www.clavestudio.dev` → **HTTP 526** (certificado inválido en el origen). www y el apex resuelven a las mismas IPs de Cloudflare (`104.21.44.198`, `172.67.203.104`), o sea www está proxied.
- `https://clavestudio.dev` → 200, pero `strict-transport-security: max-age=0`, pese a que `next.config.ts` envía `max-age=63072000; includeSubDomains; preload`.
- HTML: `Cache-Control: s-maxage=31536000` (default de Next.js) + `cf-cache-status: DYNAMIC` → Cloudflare no está cacheando HTML.
- `https://clavestudio.dev/sitemap.xml` → 200, con **17 URLs**.

---

## 1. Arreglar www.clavestudio.dev (error 526) — CRÍTICO

www está proxied por Cloudflare pero el certificado del servidor de origen no lo cubre; con SSL Full (strict) el edge corta la conexión con 526. Todo link externo con www termina en página de error.

**Por qué una Redirect Rule y no un cert:** la Redirect Rule se ejecuta en el edge de Cloudflare **antes** de conectarse al origen. Como el 526 ocurre justamente en esa conexión, redirigir en el edge lo resuelve sin necesidad de emitir ningún certificado para www.

Pasos:

1. Dashboard de Cloudflare (cuenta del dueño) → dominio `clavestudio.dev`.
2. **Rules → Redirect Rules → Create rule**.
3. Nombre: `www-a-apex-301`.
4. **When incoming requests match** → *Custom filter expression*:
   ```
   http.host eq "www.clavestudio.dev"
   ```
5. **Then** → *Dynamic redirect*:
   - Status code: **301**
   - Expression:
     ```
     concat("https://clavestudio.dev", http.request.uri.path)
     ```
6. Query strings: `http.request.uri.path` **no** incluye la query. Para conservarla (UTMs, etc.), usá la variante con `http.request.uri` (path + query; para URLs sin query queda igual):
   ```
   concat("https://clavestudio.dev", http.request.uri)
   ```
7. **Deploy**.

Alternativa (más trabajo, no recomendada): dar de alta `www.clavestudio.dev` como hostname en el servidor de origen, con un certificado que lo cubra (SAN `www.clavestudio.dev` o wildcard `*.clavestudio.dev`), y redirigir desde Next con `redirects()` en `next.config.ts`. Implica emitir y renovar el cert y tocar la config del server; solo tiene sentido si algún día se quiere servir contenido en www.

Verificación:

```bash
curl -sI https://www.clavestudio.dev/
# Esperado: HTTP/2 301  +  location: https://clavestudio.dev/

# Con query, si usaste la variante http.request.uri:
curl -sI "https://www.clavestudio.dev/servicios?utm=x"
# Esperado: location: https://clavestudio.dev/servicios?utm=x
```

---

## 2. Corregir HSTS (max-age=0) — MEDIA

El origen ya envía el header correcto (`next.config.ts` → `SECURITY_HEADERS`: `max-age=63072000; includeSubDomains; preload`) y el resto de los headers de seguridad llega intacto al edge. El que llega pisado con `max-age=0` es HSTS: lo está sobrescribiendo el feature HSTS de Cloudflare, no el servidor.

Ubicación: **SSL/TLS → Edge Certificates → HTTP Strict Transport Security (HSTS)**. Elegí una:

**Opción A — desactivar HSTS en Cloudflare (recomendada).** El header del origen pasa sin cambios y la única fuente de verdad queda en el código (`next.config.ts`).

**Opción B — activarlo igualando el código:**

1. Max Age: **6 meses / 15552000** para arrancar.
2. Incluir subdominios (*Apply/Include subdomains*): **sí**.
3. Preload: **NO al principio.** Habilitar Preload envía el dominio a la lista de hstspreload.org (la usa Chrome y derivados); salir después es lento (meses) y mientras tanto los navegadores fuerzan HTTPS sin excepción. Activá Preload recién cuando el dominio y todos sus subdominios estén 100 % HTTPS y estables — y en ese caso alineá también el valor de `next.config.ts` para que origen y edge envíen lo mismo.

Verificación:

```bash
curl -sI https://clavestudio.dev/ | grep -i strict
# Esperado: max-age=63072000 (o el valor elegido), NO max-age=0
```

---

## 3. Caché de HTML — INFORMATIVO

Estado actual: el HTML manda `Cache-Control: s-maxage=31536000` (default de Next.js para páginas prerenderizadas), pero `cf-cache-status: DYNAMIC` → Cloudflare no lo cachea. **Hoy no hay riesgo de contenido desactualizado.**

Recomendación: dejarlo como está (prioriza corrección). Si querés menos TTFB:

1. **Caching → Cache Rules → Create rule**.
2. When (custom expression):
   ```
   http.host eq "clavestudio.dev" and http.response.content_type.media_type eq "text/html"
   ```
   Notas: `http.response.content_type.media_type` es un campo de respuesta y puede no estar disponible según el plan; si el editor de expresiones lo rechaza, dejá la condición solo por host (`http.host eq "clavestudio.dev"`) — los assets estáticos ya se cachean por defecto y el Edge TTL acota el riesgo. No sirve matchear por extensión `.html`: las rutas del sitio son sin extensión (`/servicios`, `/`, etc.).
3. Then: **Eligible for cache**; Edge TTL: **1 hora**; Browser TTL: respetar el origen.
4. **Obligatorio si activás esto:** purgar la caché en cada deploy → **Caching → Configuration → Purge Everything** después de cada redeploy de `next start`. Sin purge, el HTML puede quedar viejo hasta 1 hora (el TTL).

Verificación:

```bash
curl -sI https://clavestudio.dev/ | grep -iE "cf-cache|age"
# Tras dos pedidos seguidos: cf-cache-status: HIT  (antes: DYNAMIC)
```

---

## 4. Verificación en Google Search Console — pendiente del propietario

Requiere la cuenta Google del dueño del dominio; no se puede hacer desde este repo.

1. Entrá a [search.google.com/search-console](https://search.google.com/search-console) con la cuenta del dueño.
2. **Agregar propiedad → Dominio** → `clavestudio.dev` → te da un registro TXT (`google-site-verification=...`).
3. Agregá el TXT en Cloudflare → **DNS → Records → Add record** (Type: `TXT`, Name: `@`, Value: el que te dio GSC). Esperá la propagación y volvé a **Verificar**. La propiedad tipo Dominio cubre todos los subdominios.
4. **Sitemaps** → enviá `https://clavestudio.dev/sitemap.xml` (verificado: responde 200 con 17 URLs).
5. **Páginas → Indexación**: controlá que cubra las 17 URLs del sitio; para las importantes usá *Inspección de URL → Solicitar indexación*.

Verificación:

```bash
curl -sI https://clavestudio.dev/sitemap.xml | head -1
# Esperado: HTTP/2 200
```
