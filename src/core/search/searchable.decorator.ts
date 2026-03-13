import 'reflect-metadata';

export const SEARCH_INDEX_METADATA = 'search:index';

export interface SearchableConfig {
  index: string;
  type: string;
  pick: string[];
  chunked?: boolean;
  extra?: (entity: any) => Record<string, any>;
}

export function Searchable(config: SearchableConfig): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(SEARCH_INDEX_METADATA, config, target);
  };
}

export function getSearchableMetadata(entity: any): SearchableConfig | null {
  return Reflect.getMetadata(SEARCH_INDEX_METADATA, entity.constructor);
}

export function getSearchableMetadataByTarget(target: Function): SearchableConfig | null {
  return Reflect.getMetadata(SEARCH_INDEX_METADATA, target);
}