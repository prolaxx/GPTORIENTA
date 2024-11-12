import { openai } from "@/app/openai";

// Send a new message to a thread
export async function POST(request, { params: { threadId } }) {
  try {
    // Log para verificar la solicitud y el threadId recibido
    console.log("Recibiendo solicitud para el threadId:", threadId);

    const { toolCallOutputs, runId } = await request.json();

    // Log para verificar los datos extraídos del request
    console.log("Datos extraídos - toolCallOutputs:", toolCallOutputs, ", runId:", runId);

    const stream = openai.beta.threads.runs.submitToolOutputsStream(
      threadId,
      runId,
      // { tool_outputs: [{ output: result, tool_call_id: toolCallId }] },
      { tool_outputs: toolCallOutputs }
    );

    console.log("Stream creado exitosamente para el threadId:", threadId);

    return new Response(stream.toReadableStream());
  } catch (error) {
    // Log para capturar y mostrar el error si ocurre
    console.error("Error al enviar un nuevo mensaje al hilo:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor.", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
