import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { RagService } from './rag.service';
import { SearchService } from 'src/core/search/search.service';

@Module({
  controllers: [ChatbotController],
  providers: [ChatbotService, RagService, SearchService],
})
export class ChatbotModule {}