import { Module } from '@nestjs/common';
import { HighlightsService } from './highlights.service';
import { HighlightsController } from './highlights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Highlight } from 'src/domains/admin/v1/highlights/entities/highlight.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Highlight])],
  controllers: [HighlightsController],
  providers: [HighlightsService],
})
export class HighlightsModule {}
