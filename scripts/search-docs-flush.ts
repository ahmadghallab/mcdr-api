import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { SearchService } from '../src/core/search/search.service';

async function flushDocuments() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const search = app.get(SearchService);

  console.log('🧹 Clearing documents only (Keeping Settings & Embedders)...\n');

  const index = search.client.index('global');

  try {
    const task = await index.deleteAllDocuments();
    console.log(`⏳ Waiting for deletion task: ${task.taskUid}...`);
    
    await search.client.tasks.waitForTask(task.taskUid);
    console.log('\n🎉 Documents cleared. Your OpenAI settings and filters remain intact.');
  } catch (error) {
    console.error('❌ Failed to clear documents:', error.message);
  }

  process.exit(0);
}

flushDocuments();
