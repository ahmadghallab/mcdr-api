import { Injectable } from '@nestjs/common';
import { SearchService } from 'src/core/search/search.service';

@Injectable()
export class SearchResultFormatterService {

  constructor(
    private readonly searchService: SearchService,
  ) {}

  formatHits(hits: Record<string, any>[], lang: string = 'ar') {
    return hits.map((hit) => ({
      id: hit.id,
      type: hit.type,
      href: hit.href,
      title: this.searchService.buildTitle(hit, lang),
    }));
  }
}
