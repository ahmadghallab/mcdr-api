import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { SearchService } from '../src/core/search/search.service';

async function flushSearch() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const search = app.get(SearchService);

  console.log('🗑️  Flushing Meilisearch indexes...\n');

  const indexes = await search.client.getIndexes();

  for (const index of indexes.results) {
    console.log(`➡ Deleting index: ${index.uid}`);
    await search.client.index(index.uid).delete();
  }

  console.log('\n🎉 All indexes deleted.');
  process.exit(0);
}

flushSearch();
