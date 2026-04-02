import { Injectable } from '@nestjs/common';
import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { Response } from 'express';
import { openai } from '@ai-sdk/openai';
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

    if (!context.trim()) {
      return this.streamFallback(response);
    }

    const result = streamText({
      model: openai('gpt-4.1-mini'),
      messages: [
        { role: 'system', content: this.getSystemPrompt() },
        ...(await convertToModelMessages(messages)),
        { role: 'user', content: this.getUserPrompt(context, question) },
      ],
    });

    return result.pipeUIMessageStreamToResponse(response);
  }

  private getUserPrompt(context: string, question: string) {
    return `
Use ONLY the context below to answer the question at the end.
If the answer is not found, reply exactly: "I don't know."

Context:
${context}

Question:
${question}
`;
  }

  private getSystemPrompt() {
    return `
You are a CMS assistant.

STRICT RULES:
- Answer ONLY using the provided context.
- ALWAYS reply in the SAME language as the user.
- If the answer is missing, reply EXACTLY:
  - "I don't know." for English
  - "لا أعرف." for Arabic
- Do not add explanations or variations.
`;
  }

  private streamFallback(response: Response) {
    const result = streamText({
      model: openai('gpt-4.1-mini'),
      messages: [
        { role: 'user', content: 'Reply exactly: "I don\'t know."' },
      ],
    });
  
    return result.pipeUIMessageStreamToResponse(response);
  }

  async genericChat(messages: UIMessage[], response: Response) {
    const result = streamText({
      model: openai('gpt-4.1-mini'),
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
