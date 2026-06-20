// functions/api/chat.js
//
// Cloudflare Pages Function — actúa de intermediario entre el navegador y la API de Anthropic.
// El navegador llama a /api/chat (este archivo), nunca a api.anthropic.com directamente.
// La API key vive como variable de entorno en Cloudflare, nunca en el código del repositorio.

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: "Cuerpo de la petición inválido" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { system, messages } = body;

  if (!env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({ error: "ANTHROPIC_API_KEY no está configurada en este proyecto de Cloudflare Pages." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: system,
      messages: messages,
    }),
  });

  const data = await anthropicResponse.text();

  return new Response(data, {
    status: anthropicResponse.status,
    headers: { "Content-Type": "application/json" },
  });
}
