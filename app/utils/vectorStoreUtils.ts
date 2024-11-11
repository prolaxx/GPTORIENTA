// utils/vectorStoreUtils.ts

import { openai } from '@/app/openai';
import { assistantId } from '@/app/assistant-config';

export const getOrCreateVectorStore = async (): Promise<string | null> => {
  try {
    // Recupera el asistente existente
    const assistant = await openai.beta.assistants.retrieve(assistantId);

    // Verifica si el asistente ya tiene un vector store asociado
    const vectorStoreIds = assistant.tool_resources?.file_search?.vector_store_ids ?? [];
    if (vectorStoreIds.length > 0) {
      // Retorna el ID del vector store existente
      return vectorStoreIds[0];
    }

    // Si no existe, crea un nuevo vector store
    const vectorStore = await openai.beta.vectorStores.create({
      name: 'sample-assistant-vector-store',
    });

    // Asocia el nuevo vector store al asistente
    await openai.beta.assistants.update(assistantId, {
      tool_resources: {
        file_search: {
          vector_store_ids: [vectorStore.id],
        },
      },
    });

    // Retorna el ID del nuevo vector store
    return vectorStore.id;
  } catch (error) {
    console.error('Error en getOrCreateVectorStore:', error);
    return null;
  }
};
