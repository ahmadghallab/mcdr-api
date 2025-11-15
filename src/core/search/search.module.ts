import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchSubscriber } from './search.subscriber';

@Module({
  providers: [SearchService, SearchSubscriber],
  exports: [SearchService],
})
export class SearchModule {}
