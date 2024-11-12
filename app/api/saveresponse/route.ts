import { NextRequest, NextResponse } from 'next/server';

// Simulación de base de datos (esto es solo un ejemplo)
interface FormData {
  name: string;
  email: string;
  responses?: string;  // Ahora es opcional
  favoriteClasses: string[];
}

const database: FormData[] = [];

export async function POST(req: NextRequest) {
  try {
    const { name, email, favoriteClasses } = await req.json();

    console.log("Datos recibidos:", { name, email, favoriteClasses });

    if (!name || !email || !favoriteClasses) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios.' }, { status: 400 });
    }

    // Guardar los datos en la base de datos o procesarlos como sea necesario
    database.push({ name, email, favoriteClasses });

    return NextResponse.json({ message: 'Respuestas guardadas correctamente.' });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return NextResponse.json({ error: 'Error al procesar la solicitud.' }, { status: 500 });
  }
}
