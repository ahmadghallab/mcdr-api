import { Injectable } from '@nestjs/common';
import { MeiliSearch } from 'meilisearch';

@Injectable()
export class SearchService {
  public client: MeiliSearch;

  constructor() {
    this.client = new MeiliSearch({
      host: process.env.MEILI_HOST,
      apiKey: process.env.MEILI_MASTER_KEY,
    });
  }

  async upsert(indexName: string, doc: any) {
    const index = this.client.index(indexName);
    await index.addDocuments([doc]);
  }

  async upsertBatch(indexName: string, docs: any[]) {
    const index = this.client.index(indexName);
    await index.addDocuments(docs);
  }

  async delete(indexName: string, id: string) {
    const index = this.client.index(indexName);
    await index.deleteDocument(id);
  }
}
