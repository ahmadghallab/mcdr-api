import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from 'src/core/search/search.service';
import { SearchDto } from './search.dto';
import { Public } from 'src/domains/admin/v1/auth/auth.decorator';

@Controller()
export class SearchController {
  constructor(private readonly search: SearchService) {}

  @Public()
  @Get()
  async globalSearch(
    @Query() searchDto: SearchDto,
  ) {
    const { q, limit, skip: offset, page } = searchDto;

    const results = await this.search.client.index('global').search(q, { offset, limit });

    const total = results.estimatedTotalHits;

    return {
      data: results.hits,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
