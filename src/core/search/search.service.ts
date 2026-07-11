import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Index, MeiliSearch, SearchParams } from 'meilisearch';
import {
  RagContext,
  RagContextOptions,
  RagContextReference,
  SearchOptions,
} from './search.types';

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
              embedder: 'openai',
              semanticRatio: 0.8,
            },
          }
        : {}),
    } satisfies SearchParams;

    return this.index.search(query, searchOptions);
  }

  async getContext(
    question: string,
    options: RagContextOptions = {},
  ): Promise<RagContext> {
    const { limit = 25, lang = 'ar' } = options;

    const { hits } = await this.search(question, {
      limit,
      semantic: true,
    });

    return { 
      content: this.buildContext(hits), 
      references : this.buildReferences(hits, lang)
    };
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

  async deleteByParent(indexName: string, compositeParentId: string) {
    await this.client.index(indexName).deleteDocuments({
      filter: `parent_id = "${compositeParentId}"`,
    });
  }

  private buildContext(hits: Record<string, any>[]): string {
    const MAX_CHARS = 10000;

    const text = hits
      .map((hit, i) => `Source ${i + 1}: ${hit.searchable_text}`)
      .join('\n\n');

    return text.slice(0, MAX_CHARS);
  }

  private buildReferences(
    hits: Record<string, any>[],
    lang: string,
  ): RagContextReference[] {
    const map = new Map<
      string,
      {
        href: string;
        type: string;
        titles: Set<string>;
      }
    >();

    for (const hit of hits) {
      if (!hit.href) continue;

      const title = this.buildTitle(hit, lang);
      const existing = map.get(hit.href);

      if (existing) {
        existing.titles.add(title);
      } else {
        map.set(hit.href, {
          href: hit.href,
          type: hit.type,
          titles: new Set([title]),
        });
      }
    }

    return Array.from(map.values()).map(({ href, type, titles }) => ({
      href,
      type,
      title: [...titles].join(' • '),
    }));
  }

  buildTitle(hit: Record<string, any>, lang: string): string | null {
    const isArabic = lang.startsWith('ar');

    const TITLE_CANDIDATES = ['title', 'name', 'description', 'address', 'q'];
    const rawKeys = isArabic ? ['aname'] : ['ename'];

    for (const base of TITLE_CANDIDATES) {
      const key = `${base}_${isArabic ? 'ar' : 'en'}`;
      if (hit[key]) return hit[key];
    }

    for (const key of rawKeys) {
      if (hit[key]) return hit[key];
    }

    return null;
  }
}
