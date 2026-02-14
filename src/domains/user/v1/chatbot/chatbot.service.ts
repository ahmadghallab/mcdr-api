import { Injectable } from '@nestjs/common';
import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { Response } from 'express';
import { google } from '@ai-sdk/google';
import { getMessageText } from './chatbot.utils';
import { SearchService } from 'src/core/search/search.service';

@Injectable()
export class ChatbotService {
  constructor(
    private readonly searchService: SearchService,
  ) {}

  async chat(messages: UIMessage[], response: Response) {
    const question = getMessageText(messages.at(-1));

    const context = await this.searchService.getContext(question);    

    const result = streamText({
      model: google('gemini-2.5-flash-lite'),
      messages: [
        { role: 'system', content: this.getSystemPrompt() },
        { role: 'assistant', content: `Context:\n${context}` },
        ...(await convertToModelMessages(messages)),
      ],
    });

    return result.pipeUIMessageStreamToResponse(response);
  }

  private getSystemPrompt() {
    return `
You are a CMS assistant.

Rules:
- Answer ONLY using the provided context.
- Reply in the SAME language as the user (Arabic or English).
- If the answer is missing, say "I don't know."

Notes:
The context comes from the CMS, flattened into "searchable_text".
Some content may originate from block-based editors.
Treat all text as normal readable paragraphs.
Do not mention blocks or field names.
          `;
  }

  /* -------------------------------------------------------------------------- */
  /*                                   GENERIC CHAT                             */
  /* -------------------------------------------------------------------------- */

  async genericChat(messages: UIMessage[], response: Response) {
    const result = streamText({
      model: google('gemini-2.5-flash-lite'),
      messages: [
        { 
          role: 'system', 
          content: 'You are a generic chat bot that can answer any questions' 
        },
        ...(await convertToModelMessages(messages)),
      ],
    });
    return result.pipeUIMessageStreamToResponse(response);
  }
}
