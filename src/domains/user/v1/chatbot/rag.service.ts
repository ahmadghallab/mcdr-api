import { Injectable } from '@nestjs/common';
import { SearchService } from 'src/core/search/search.service';

@Injectable()
export class RagService {
  constructor(
    private readonly search: SearchService,
  ) {}

  async getContext(question: string): Promise<string> {
    const result = await this.search.client.index('global').search(question);

    return result.hits
      .map((hit: Record<string, any>, i) => {
        const text = hit.searchable_text ?? '';
        return `Source ${i + 1}:\n${text}`;
      })
      .filter(Boolean)
      .join('\n\n');
  }
}
