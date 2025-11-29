import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from 'src/core/search/search.service';
import { SearchResultFormatterService } from './search-result-formatter.service';

@Module({
  controllers: [SearchController],
  providers: [SearchService, SearchResultFormatterService],
})
export class SearchQueryModule {}
