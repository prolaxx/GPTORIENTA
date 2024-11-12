import { getOrCreateVectorStore } from '@utils/vectorStoreUtils';
import { NextResponse } from 'next/server';
import { openai } from '@/app/openai';

interface FileData {
  file_id: string;
  filename: string;
  status: string;
}

export async function GET() {
  try {
    // Tu código para obtener los archivos
    const vectorStoreId = await getOrCreateVectorStore();

    if (!vectorStoreId) {
      return new NextResponse('Vector store not found', { status: 404 });
    }

    const fileList = await openai.beta.vectorStores.files.list(vectorStoreId);

    const filesArray: FileData[] = await Promise.all(
      fileList.data.map(async (file: any) => {
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

    return NextResponse.json(filesArray);
  } catch (error) {
    console.error(error);
    return new NextResponse('An error occurred while retrieving the files', {
      status: 500,
    });
  }
}
