import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Index, MeiliSearch } from 'meilisearch';

@Injectable()
export class SearchService implements OnModuleInit {
  public client: MeiliSearch;
  private globalIndex: Index;

  constructor(private readonly config: ConfigService) {
    this.client = new MeiliSearch({
      host: this.config.get('meili.host'),
      apiKey: this.config.get('meili.apiKey'),
    });
  }

  async onModuleInit() {
    this.globalIndex = await this.ensureIndex('global');
    await this.configureEmbeddings(this.globalIndex);
  }

  private async ensureIndex(name: string): Promise<Index> {
    try {
      return this.client.index(name);
    } catch {
      await this.client.createIndex(name, { primaryKey: 'id' });
      return this.client.index(name);
    }
  }

  private async configureEmbeddings(index: Index) {
    const embedding = this.config.get('meili.embedding');

    await index.updateEmbedders({
      gemini: {
        source: 'rest',
        dimensions: embedding.dimensions,
        // documentTemplate: '{{searchable_text}}',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': embedding.apiKey,
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
  }

  async hybridSearch(query: string, limit = 5) {
    return this.globalIndex.search(query, {
      limit,
      attributesToSearchOn: ['searchable_text'],
      hybrid: {
        embedder: 'gemini',
        semanticRatio: 0.8,
      },
    });
  }

  async getContext(question: string): Promise<string> {
    const result = await this.hybridSearch(question);
    return this.buildContext(result.hits);
  }

  private buildContext(hits: any[]): string {
    return hits
      .map((hit, i) => `Source ${i + 1}:\n${hit.searchable_text ?? ''}`)
      .filter(Boolean)
      .join('\n\n');
  }

  async upsert(indexName: string, doc: any) {
    await this.client.index(indexName).addDocuments([doc]);
  }

  async upsertBatch(indexName: string, docs: any[]) {
    await this.client.index(indexName).addDocuments(docs);
  }

  async delete(indexName: string, id: string) {
    await this.client.index(indexName).deleteDocument(id);
  }
}
