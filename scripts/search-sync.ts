import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { SearchService } from '../src/core/search/search.service';
import { getSearchableMetadata } from '../src/core/search/searchable.decorator';

async function syncSearch() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  const search = app.get(SearchService);

  console.log('🔍 Starting Meilisearch sync...\n');

  for (const meta of dataSource.entityMetadatas) {
    const target = meta.target as any;
    const cfg = getSearchableMetadata(new target());

    if (!cfg) continue;

    console.log(`➡ Indexing ${cfg.type}...`);

    const repo = dataSource.getRepository(target);
    const rows = await repo.find();

    const docs = rows.map((row) => ({
      id: `${cfg.type}_${row.id}`,
      type: cfg.type,
      ...cfg.pick.reduce((a: any, key) => ({ ...a, [key]: row[key] }), {}),
      searchable: cfg.pick.map((key) => row[key] || '').join(' '),
    }));

    await search.upsertBatch(cfg.index, docs);

    console.log(`✔ ${docs.length} ${cfg.type} indexed\n`);
  }

  console.log('🎉 Sync complete');
  process.exit(0);
}

syncSearch();
