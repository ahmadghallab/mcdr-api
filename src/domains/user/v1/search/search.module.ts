import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from 'src/core/search/search.service';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchQueryModule {}
