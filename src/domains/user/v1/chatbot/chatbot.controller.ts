import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { UIMessage } from 'ai';
import { Response } from 'express';
import { Public } from 'src/domains/admin/v1/auth/auth.decorator';
import { SearchService } from 'src/core/search/search.service';

@Controller()
export class ChatbotController {
  constructor(
    private readonly chatService: ChatbotService,
    private readonly searchService: SearchService,
  ) {}

  @Public()
  @Post()
  chat(
    @Body() body: { messages: UIMessage[] },
    @Res() res: Response,
  ) {
    return this.chatService.chat(body.messages, res);
  }

  @Public()
  @Get('rag-test')
  async ragTest(@Query('q') q: string) {
    return this.searchService.getContext(q);
  }

  @Post('reset-index')
  async resetIndex() {
    try {
      await this.searchService.client.deleteIndex('global');
    } catch (error) {
      // Index might not exist
    }
    
    // Reinitialize
    await this.searchService.onModuleInit();
    return { message: 'Index reset successful' };
  }
}
