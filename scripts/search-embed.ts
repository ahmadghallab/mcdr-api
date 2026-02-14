import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { SearchService } from '../src/core/search/search.service';

async function setupEmbeddings() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const search = app.get(SearchService);

  console.log('🧠 Configuring Meilisearch embeddings...\n');

  const index = search.client.index('global');

  const current = await index.getEmbedders();

  if (current?.gemini) {
    console.log('✔ Gemini embedder already exists. Skipping.');
    process.exit(0);
  }

  const task = await index.updateEmbedders({
    gemini: {
      source: 'rest',
      dimensions: 3072,

      documentTemplate: '{{doc.searchable_text}}',

      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
      },

      url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:batchEmbedContents',

      request: {
        requests: [
          {
            model: 'models/gemini-embedding-001',
            content: {
              parts: [{ text: '{{text}}' }],
            },
          },
          '{{..}}',
        ],
      },

      response: {
        embeddings: [{ values: '{{embedding}}' }, '{{..}}'],
      },
    },
  });

  console.log('⏳ Waiting for Meili task...');
  await search.client.tasks.waitForTask(task.taskUid);

  console.log('🎉 Embeddings ready!');
  process.exit(0);
}

setupEmbeddings();
