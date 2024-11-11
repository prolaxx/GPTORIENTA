import { NextApiRequest, NextApiResponse } from "next";
import fetch from 'node-fetch';

// Función de reintento en caso de error
const sendRequestWithRetry = async (url: string, options: any, retries = 3) => {
  try {
    const response = await fetch(url, options);
    // Si la respuesta no es correcta y aún quedan reintentos, vuelve a intentarlo
    if (!response.ok && retries > 0) {
      console.warn(`Reintentando... (${3 - retries})`);
      return sendRequestWithRetry(url, options, retries - 1);
    }
    // Devuelve la respuesta en caso de éxito
    return response;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Error de red. Reintentando... (${3 - retries})`);
      return sendRequestWithRetry(url, options, retries - 1);
    } else {
      console.error("Se agotaron los reintentos.");
      throw error;  // Si ya no quedan reintentos, lanza el error
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { threadId, message } = req.body;

    if (!threadId || !message) {
        return res.status(400).json({ error: 'Thread ID or message missing' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    
    // Opciones para la solicitud de la API con headers
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Cambiado al modelo GPT-4o mini
        messages: [{ role: 'user', content: message }],
        max_tokens: 16384, // Ajuste basado en las especificaciones del modelo
        stream: true, // Para manejar la transmisión de respuesta en tiempo real
      })
    };

    // Llama a la función de reintento para hacer la solicitud a la API
    try {
        const response = await sendRequestWithRetry(`https://api.openai.com/v1/threads/${threadId}/messages`, requestOptions);

        if (!response.body) {
            return res.status(500).json({ error: 'No response body from OpenAI API' });
        }

        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        });

        const stream = response.body as any;
        const reader = stream.getReader();
        const decoder = new TextDecoder();

        let done = false;
        let buffer = '';
        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;

          if (value) {
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split(/\n|\r\n/);
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const chunk = line.slice('data: '.length);
                res.write(`data: ${chunk}\n\n`); // Enviar cada fragmento al cliente
              }
            }
          }
        }

        res.end();

    } catch (error) {
        // Maneja cualquier error no controlado
        res.status(500).json({ error: 'Error en la solicitud: ' + error.message });
    }
}
