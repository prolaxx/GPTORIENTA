import React from 'react';
import { assistantId } from "@/app/assistant-config";
import { openai } from "@/app/openai";

// Componente FileViewer
const FileViewer = () => {
  return (
    <div>
      <h2>File Viewer</h2>
      <p>Mostrando los archivos disponibles...</p>
      {/* Agrega aquí la lógica de visualización de archivos */}
    </div>
  );
};

export default FileViewer;

// upload file to assistant's vector store
export async function POST(request) {
  try {
    const formData = await request.formData(); // process file as FormData
    const file = formData.get("file"); // retrieve the single file from FormData
    if (!file) {
      return new Response("No file provided", { status: 400 });
    }

    const vectorStoreId = await getOrCreateVectorStore(); // get or create vector store
    if (!vectorStoreId) {
      return new Response("Vector store not found", { status: 404 });
    }

    // upload using the file stream
    let openaiFile;
    try {
      openaiFile = await openai.files.create({
        file: file,
        purpose: "assistants",
      });
    } catch (error) {
      return new Response(`Error uploading file: ${error.message}`, {
        status: 500,
      });
    }

    // add file to vector store
    await openai.beta.vectorStores.files.create(vectorStoreId, {
      file_id: openaiFile.id,
    });
    return new Response("File uploaded successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred while processing the request", {
      status: 500,
    });
  }
}

// list files in assistant's vector store
export async function GET() {
  try {
    const vectorStoreId = await getOrCreateVectorStore(); // get or create vector store
    if (!vectorStoreId) {
      return new Response("Vector store not found", { status: 404 });
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
    return new Response(JSON.stringify(filesArray), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred while retrieving the files", {
      status: 500,
    });
  }
}

// delete file from assistant's vector store
export async function DELETE(request) {
  try {
    const body = await request.json();
    const fileId = body.fileId;
    if (!fileId) {
      return new Response("File ID not provided", { status: 400 });
    }

    const vectorStoreId = await getOrCreateVectorStore(); // get or create vector store
    if (!vectorStoreId) {
      return new Response("Vector store not found", { status: 404 });
    }

    await openai.beta.vectorStores.files.del(vectorStoreId, fileId); // delete file from vector store

    return new Response("File deleted successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred while deleting the file", {
      status: 500,
    });
  }
}

/* Helper functions */

const getOrCreateVectorStore = async () => {
  try {
    const assistant = await openai.beta.assistants.retrieve(assistantId);

    // if the assistant already has a vector store, return it
    const vectorStoreIds = assistant.tool_resources?.file_search?.vector_store_ids ?? [];
    if (vectorStoreIds.length > 0) {
      return vectorStoreIds[0];
    }

    // otherwise, create a new vector store and attach it to the assistant
    const vectorStore = await openai.beta.vectorStores.create({
      name: "sample-assistant-vector-store",
    });
    await openai.beta.assistants.update(assistantId, {
      tool_resources: {
        file_search: {
          vector_store_ids: [vectorStore.id],
        },
      },
    });
    return vectorStore.id;
  } catch (error) {
    console.error(error);
    return null;
  }
};
