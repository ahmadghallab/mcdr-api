import { Controller, Get, Headers, Query } from '@nestjs/common';
import { SearchService } from 'src/core/search/search.service';
import { SearchDto } from './search.dto';
import { Public } from 'src/domains/admin/v1/auth/auth.decorator';
import { SearchResultFormatterService } from './search-result-formatter.service';

@Controller()
export class SearchController {
  constructor(
    private readonly search: SearchService,
    private readonly formatter: SearchResultFormatterService
  ) {}

  @Public()
  @Get()
  async globalSearch(
    @Query() searchDto: SearchDto,
    @Headers('accept-language') lang: string
  ) {
    const { q, limit, skip: offset, page } = searchDto;

    const results = await this.search.client.index('global').search(q, { offset, limit });

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
