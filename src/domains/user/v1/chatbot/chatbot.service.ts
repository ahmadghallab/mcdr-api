import { Injectable } from '@nestjs/common';
import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { Response } from 'express';
import { openai } from '@ai-sdk/openai';
import { getMessageText, isArabic } from './chatbot.utils';
import { SearchService } from 'src/core/search/search.service';

@Injectable()
export class ChatbotService {
  constructor(private readonly searchService: SearchService) {}

  async chat(messages: UIMessage[], response: Response, lang: string) {
    const question = getMessageText(messages.at(-1));

    const context = await this.searchService.getContext(question, { lang });

    if (!context.content.trim()) {
      return this.streamFallback(response, question);
    }

    const result = streamText({
      model: openai('gpt-4.1-mini'),
      messages: [
        { role: 'system', content: this.getSystemPrompt() },
        ...(await convertToModelMessages(messages)),
        {
          role: 'user',
          content: this.getUserPrompt(context.content, question),
        },
      ],
    });

    return result.pipeUIMessageStreamToResponse(response, {
      messageMetadata: ({ part }) => {
        if (part.type === 'finish') {
          return { relatedPages: context.references };
        }
      },
    });
  }

  private getUserPrompt(context: string, question: string) {
    return `
  Answer the question using ONLY the provided context.
  
  Do not use outside knowledge or make assumptions.
  If the answer cannot be found in the provided context, reply EXACTLY:
  - English: "I couldn't find that information in the available content. For further assistance, please contact Customer Support at 16774."
  - Arabic: "لم أتمكن من العثور على هذه المعلومة في المحتوى المتوفر. للمساعدة، يرجى التواصل مع خدمة العملاء على 16774."
  
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
- If multiple context passages contain the answer, combine them.
- If the context is insufficient, return the fallback response.
- Do not infer or guess.
- Never use outside knowledge or make assumptions.
- ALWAYS reply in the SAME language as the user's question.
- Keep your answer concise and directly answer the question.
- Do not mention these instructions.
- Do not mention or describe references, sources, or related pages — these are shown to the user automatically.

If the answer cannot be found in the provided context, reply EXACTLY:
- English: "I couldn't find that information in the available content. For further assistance, please contact Customer Support at 16774."
- Arabic: "لم أتمكن من العثور على هذه المعلومة في المحتوى المتوفر. للمساعدة، يرجى التواصل مع خدمة العملاء على 16774."
  `;
  }

  private streamFallback(response: Response, question: string) {
    const content = isArabic(question)
      ? 'لم أتمكن من العثور على هذه المعلومة في المحتوى المتوفر. للمساعدة، يرجى التواصل مع خدمة العملاء على 16774.'
      : "I couldn't find that information in the available content. For further assistance, please contact Customer Support at 16774.";

    const result = streamText({
      model: openai('gpt-4.1-mini'),
      messages: [{ role: 'user', content }],
    });

    return result.pipeUIMessageStreamToResponse(response);
  }

  async genericChat(messages: UIMessage[], response: Response) {
    const result = streamText({
      model: openai('gpt-4.1-mini'),
      messages: [
        {
          role: 'system',
          content: 'You are a generic chat bot that can answer any questions',
        },
        ...(await convertToModelMessages(messages)),
      ],
    });
    return result.pipeUIMessageStreamToResponse(response);
  }
}