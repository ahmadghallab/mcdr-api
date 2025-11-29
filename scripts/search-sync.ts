import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { SearchService } from '../src/core/search/search.service';
import { getSearchableMetadata } from '../src/core/search/searchable.decorator';
import { flattenForIndex } from '../src/core/search/search.util';

async function syncSearch() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  const search = app.get(SearchService);

  console.log('🔍 Starting Meilisearch sync...\n');

  for (const meta of dataSource.entityMetadatas) {
    const Entity = meta.target as any;

    // Instantiate entity to check metadata
    const cfg = getSearchableMetadata(new Entity());
    if (!cfg) continue;

    console.log(`➡ Indexing ${cfg.type}...`);

    const repo = dataSource.getRepository(Entity);
    const rows = await repo.find();

    const docs = rows.map((row) => {
      const base = {
        id: `${cfg.type}_${row.id}`,
        type: cfg.type,
      };

      const flattened = flattenForIndex(row, cfg.pick);
      const extra = cfg.extra ? cfg.extra(row) : {};

      return {
        ...base,
        ...flattened,
        ...extra,
      };
    });

    await search.upsertBatch(cfg.index, docs);

    console.log(`✔ ${docs.length} ${cfg.type} indexed\n`);
  }

  console.log('🎉 Sync complete');
  process.exit(0);
}

syncSearch();
