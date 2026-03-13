import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { SearchService } from '../src/core/search/search.service';
import { getSearchableMetadataByTarget } from '../src/core/search/searchable.decorator';
import { prepareSearchDocuments } from '../src/core/search/search.util';

async function syncSearch() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  const search = app.get(SearchService);

  console.log('🔍 Starting Meilisearch Sync (Chunked Mode)...\n');

  for (const meta of dataSource.entityMetadatas) {
    const EntityTarget = meta.target;

    const cfg = getSearchableMetadataByTarget(EntityTarget as any);
    if (!cfg) continue;

    console.log(`➡ Indexing ${cfg.type}...`);

    const repo = dataSource.getRepository(EntityTarget);
    const rows = await repo.find();

    // Use .flatMap because prepareSearchDocuments now returns an ARRAY of chunks
    const allDocs = rows.flatMap((row) => prepareSearchDocuments(row, cfg));

    if (allDocs.length > 0) {
      // Meilisearch handles batches automatically. 
      // Upserting replaces any existing chunks with the same deterministic IDs.
      await search.upsertBatch(cfg.index, allDocs);
      console.log(`✔ ${rows.length} ${cfg.type} records split into ${allDocs.length} chunks\n`);
    }
  }

  console.log('🎉 Sync complete');
  process.exit(0);
}

syncSearch();
