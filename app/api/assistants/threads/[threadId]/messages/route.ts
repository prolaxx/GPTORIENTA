import { assistantId } from "@/app/assistant-config";
import { openai } from "@/app/openai";

export const runtime = "nodejs";

export async function POST(request, { params: { threadId } }) {
  const { content } = await request.json();

  // Enviar el mensaje del usuario
  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: content,
  });

  // Iniciar el stream de ejecución
  const stream = await openai.beta.threads.runs.stream(threadId, {
    assistant_id: assistantId,
  });

  // Devolver el stream directamente al frontend
  return new Response(stream.toReadableStream());
}
