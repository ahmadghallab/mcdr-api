import { SearchParams } from "meilisearch";

export type SearchOptions = { semantic?: boolean } & SearchParams;

export interface RagContextReference {
  title: string;
  type: string;
  href: string;
}

export interface RagContext {
  content: string;
  references: RagContextReference[];
}

export interface RagContextOptions {
  limit?: number;
  lang?: string;
}