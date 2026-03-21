import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { SearchService } from '../src/core/search/search.service';
import { getSearchableMetadataByTarget } from '../src/core/search/searchable.decorator';
import { prepareSearchDocuments, shouldIndex } from '../src/core/search/search.util';

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

    const index = search.client.index(cfg.index);

    // Ensure the index knows 'id' is the primary key before adding documents
    await index.update({ primaryKey: 'id' }); 
    
    const filteredRows = rows.filter((row) => shouldIndex(row, cfg));
    
    // Use .flatMap because prepareSearchDocuments returns an ARRAY of chunks
    const allDocs = filteredRows.flatMap((row) =>
      prepareSearchDocuments(row, cfg)
    );

    if (allDocs.length > 0) {
      await search.upsertBatch(cfg.index, allDocs);
      console.log(`✔ ${rows.length} ${cfg.type} records split into ${allDocs.length} chunks\n`);
    }
  }

  console.log('🎉 Sync complete');
  process.exit(0);
}

syncSearch();
