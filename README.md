# Demo · Sofía (CEC)

Vista previa del asistente virtual de WhatsApp del Centro Europeo de Cirugía, para que jefatura lo pruebe como si fuera un paciente real, antes de aprobar el piloto.

## Cómo funciona

- `index.html` — la interfaz de chat. No contiene ninguna API key.
- `functions/api/chat.js` — una Cloudflare Pages Function que recibe la petición del navegador y la reenvía a la API de Anthropic, usando la API key guardada como variable de entorno **del lado del servidor**. La key nunca llega al navegador ni al código fuente.

Este repositorio es público a propósito — por eso la key vive en Cloudflare, no en el código.

## Deploy en Cloudflare Pages

1. Entrá a [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Seleccioná este repositorio.
3. Configuración de build:
   - **Framework preset:** None
   - **Build command:** (dejar vacío)
   - **Build output directory:** `/`
4. Antes de desplegar (o después, en **Settings → Environment variables**), agregá:
   - **Variable name:** `ANTHROPIC_API_KEY`
   - **Value:** tu API key real de [console.anthropic.com](https://console.anthropic.com)
   - Marcá la opción de **Encrypt** si Cloudflare la ofrece para ese campo.
5. Desplegá. Cloudflare te da una URL tipo `tu-proyecto.pages.dev` — esa es la que le mandás a jefatura.

## Probar localmente (opcional)

Si tenés [Wrangler](https://developers.cloudflare.com/workers/wrangler/) instalado:

```bash
echo "ANTHROPIC_API_KEY=tu_key_aqui" > .dev.vars
npx wrangler pages dev .
```

`.dev.vars` ya está en `.gitignore` — nunca se sube al repositorio.

## Importante

- No pegues la API key en `index.html` ni en ningún archivo de este repositorio. Si en algún momento una key llegó a subirse por error, regenerala de inmediato en la consola de Anthropic.
- Este repo es solo para la demo de aprobación. El backend de producción (webhook conectado a Zenvia) es un proyecto aparte.
