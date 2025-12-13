import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchResultFormatterService {
  getTitle(hit: Record<string, any>, lang: string): string | null {
    const isArabic = lang.startsWith('ar');

    const TITLE_CANDIDATES = ['title', 'name', 'description', 'address', 'q'];
    const rawKeys = isArabic ? ['aname'] : ['ename'];

    for (const base of TITLE_CANDIDATES) {
      const key = `${base}_${isArabic ? 'ar' : 'en'}`;
      if (hit[key]) return hit[key];
    }

    for (const key of rawKeys) {
      if (hit[key]) return hit[key];
    }

    return null;
  }

  formatHits(hits: Record<string, any>[], lang: string = 'ar') {
    return hits.map((hit) => ({
      id: hit.id,
      type: hit.type,
      href: hit.href,
      title: this.getTitle(hit, lang),
    }));
  }
}
