import { Controller, Get, Headers, Query } from '@nestjs/common';
import { SearchService } from 'src/core/search/search.service';
import { SearchDto } from './search.dto';
import { Public } from 'src/domains/admin/v1/auth/auth.decorator';
import { SearchResultFormatterService } from './search-result-formatter.service';

@Controller()
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly formatter: SearchResultFormatterService
  ) {}

  @Public()
  @Get()
  async globalSearch(
    @Query() searchDto: SearchDto,
    @Headers('accept-language') lang: string
  ) {
    const { q, limit, skip: offset, page } = searchDto;

    const results = await this.searchService.search(q, { 
      offset, 
      limit,
      matchingStrategy: 'all'
    });

    const total = results.estimatedTotalHits;

    const data = this.formatter.formatHits(results.hits, lang);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
