// app/api/files/[fileId]/route.ts

import { assistantId } from '@/app/assistant-config';
import { openai } from '@/app/openai';
import { getOrCreateVectorStore } from '../../../utils/vectorStoreUtils';

// Subir archivo al vector store del asistente
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!file) {
      return new Response('No se proporcionó un archivo', { status: 400 });
    }

    const vectorStoreId = await getOrCreateVectorStore();
    if (!vectorStoreId) {
      return new Response('Vector store no encontrado', { status: 404 });
    }

    // Subir el archivo usando el stream
    let openaiFile;
    try {
      openaiFile = await openai.files.create({
        file: file,
        purpose: 'assistants',
      });
    } catch (error) {
      return new Response(`Error al subir el archivo: ${error.message}`, {
        status: 500,
      });
    }

    // Agregar el archivo al vector store
    await openai.beta.vectorStores.files.create(vectorStoreId, {
      file_id: openaiFile.id,
    });
    return new Response();
  } catch (error) {
    console.error(error);
    return new Response('Ocurrió un error al procesar la solicitud', {
      status: 500,
    });
  }
}

// Listar archivos en el vector store del asistente
export async function GET() {
  try {
    const vectorStoreId = await getOrCreateVectorStore();
    if (!vectorStoreId) {
      return new Response('Vector store no encontrado', { status: 404 });
    }

    const fileList = await openai.beta.vectorStores.files.list(vectorStoreId);

    const filesArray = await Promise.all(
      fileList.data.map(async (file) => {
        const fileDetails = await openai.files.retrieve(file.id);
        const vectorFileDetails = await openai.beta.vectorStores.files.retrieve(
          vectorStoreId,
          file.id
        );
        return {
          file_id: file.id,
          filename: fileDetails.filename,
          status: vectorFileDetails.status,
        };
      })
    );
    return Response.json(filesArray);
  } catch (error) {
    console.error(error);
    return new Response('Ocurrió un error al recuperar los archivos', {
      status: 500,
    });
  }
}

// Eliminar archivo del vector store del asistente
export async function DELETE(request) {
  try {
    const body = await request.json();
    const fileId = body.fileId;
    if (!fileId) {
      return new Response('No se proporcionó el ID del archivo', { status: 400 });
    }

    const vectorStoreId = await getOrCreateVectorStore();
    if (!vectorStoreId) {
      return new Response('Vector store no encontrado', { status: 404 });
    }

    await openai.beta.vectorStores.files.del(vectorStoreId, fileId);

    return new Response();
  } catch (error) {
    console.error(error);
    return new Response('Ocurrió un error al eliminar el archivo', {
      status: 500,
    });
  }
}
