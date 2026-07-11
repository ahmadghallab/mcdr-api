import { UIMessage } from 'ai';

export function getMessageText(message?: UIMessage): string {
  if (!message?.parts) return '';

  return message.parts
    .filter((p: any) => p.type === 'text')
    .map((p: any) => p.text)
    .join('');
}

export function isArabic(text: string): boolean {
  return /[\u0600-\u06FF]/.test(text);
}