import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { UIMessage } from 'ai';
import { Response } from 'express';
import { RagService } from './rag.service';
import { Public } from 'src/domains/admin/v1/auth/auth.decorator';

@Controller()
export class ChatbotController {
  constructor(
    private readonly chatService: ChatbotService,
    private readonly ragService: RagService,
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
    return this.ragService.getContext(q);
  }
}
