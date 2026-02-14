import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Index, MeiliSearch, SearchParams } from 'meilisearch';
import { SearchOptions } from './search.types';

@Injectable()
export class SearchService {
  public client: MeiliSearch;
  private index: Index;

  constructor(private readonly config: ConfigService) {
    this.client = new MeiliSearch({
      host: this.config.get<string>('meili.host')!,
      apiKey: this.config.get<string>('meili.apiKey')!,
    });

    this.index = this.client.index('global');
  }

  async search(query: string, options: SearchOptions = {}) {
    const { semantic = false, ...rest } = options;

    const searchOptions = {
      ...rest,
      attributesToSearchOn: ['searchable_text'],
      ...(semantic
        ? { 
            hybrid: { 
              embedder: 'gemini', 
              semanticRatio: 0.8 
            } 
          }
        : {}),
    } satisfies SearchParams;

    return this.index.search(query, searchOptions);
  }

  async getContext(question: string, limit = 5): Promise<string> {
    const result = await this.search(question, {
      limit,
      semantic: true,
    });

    return this.buildContext(result.hits);
  }

  private buildContext(hits: any[]): string {
    return hits
      .map((hit, i) =>
        hit.searchable_text
          ? `Source ${i + 1}: ${hit.searchable_text}`
          : null,
      )
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
