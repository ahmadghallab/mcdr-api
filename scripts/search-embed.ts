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

  if (current?.openai) {
    console.log('✔ OpenAI embedder already exists. Skipping.');
    process.exit(0);
  }

  const task = await index.updateEmbedders({
    openai: {
      source: 'openAi',
      apiKey: process.env.OPENAI_API_KEY!,
      dimensions: 1536,
      model: "text-embedding-3-small",
      documentTemplate: '{{doc.searchable_text}}'
    },
  });

  console.log('⏳ Waiting for Meili task...');
  await search.client.tasks.waitForTask(task.taskUid);

  console.log('🎉 Embeddings ready!');
  process.exit(0);
}

setupEmbeddings();
