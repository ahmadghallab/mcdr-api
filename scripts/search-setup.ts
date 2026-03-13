import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { SearchService } from "src/core/search/search.service";

async function searchSetup() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const search = app.get(SearchService);
  const index = search.client.index('global');

  console.log('⚙️ Updating Meilisearch Global Settings...');

  const settingsTask = await index.updateSettings({
    // 1. Core logic for RAG deletion
    filterableAttributes: ['parent_id', 'type'],
    
    // 2. Improving search relevance for your CMS
    searchableAttributes: ['searchable_text'],
    
    // 3. Ensuring "Huge Pages" don't get truncated
    pagination: { maxTotalHits: 1000 }, 
  });

  await search.client.tasks.waitForTask(settingsTask.taskUid);
  console.log('✅ Settings Synced!');
  process.exit(0);
}

searchSetup();