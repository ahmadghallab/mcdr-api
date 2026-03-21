import 'reflect-metadata';

export const DEFAULT_INDEX = 'global';
export const SEARCH_INDEX_METADATA = 'search:index';

export interface SearchableConfig {
  index?: string;
  type?: string;
  pick: string[];
  chunked?: boolean;
  extra?: (entity: any) => Record<string, any>;
  condition?: (entity: any) => boolean,
}

export function Searchable(config: SearchableConfig): ClassDecorator {
  return (target) => {
    const finalConfig = {
      ...config,
      index: config.index ?? DEFAULT_INDEX,
      type: config.type ?? target.name.toLowerCase(),
    };

    Reflect.defineMetadata(SEARCH_INDEX_METADATA, finalConfig, target);
  };
}

export function getSearchableMetadata(entity: any): SearchableConfig | null {
  return Reflect.getMetadata(SEARCH_INDEX_METADATA, entity.constructor);
}

export function getSearchableMetadataByTarget(target: Function): SearchableConfig | null {
  return Reflect.getMetadata(SEARCH_INDEX_METADATA, target);
}