import { openai } from "@/app/openai";

export const runtime = "nodejs";

// Crear un nuevo hilo
export async function POST() {
  try {
    console.log("Iniciando creación del hilo...");
    if (!openai) {
      console.error("El cliente de OpenAI no está inicializado.");
      return new Response(
        JSON.stringify({ error: "Error en la configuración del servidor." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const thread = await openai.beta.threads.create();
    console.log("Hilo creado:", thread);

    return new Response(JSON.stringify({ threadId: thread.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al crear el hilo:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
