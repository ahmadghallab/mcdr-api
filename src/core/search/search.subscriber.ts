import {
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from 'typeorm';
import { SearchService } from './search.service';
import { SearchableConfig, getSearchableMetadata, getSearchableMetadataByTarget } from './searchable.decorator';

export class SearchSubscriber implements EntitySubscriberInterface {
  constructor(private readonly search: SearchService) {}

  listenTo() {
    return Object;
  }

  async afterInsert(event: InsertEvent<any>) {
    if (!event.entity) return;

    const meta = this.getMeta(event.entity, event.metadata.target);
    if (!meta) return;

    await this.sync(event.entity, meta);
  }

  async afterUpdate(event: UpdateEvent<any>) {
    const entity = event.entity ?? event.databaseEntity;
    if (!entity) return;

    const meta = this.getMeta(entity, event.metadata.target);
    if (!meta) return;

    await this.sync(entity, meta);
  }

  async afterRemove(event: RemoveEvent<any>) {
    const target = event.metadata.target;
    if (typeof target !== 'function') return;
    
    const meta = getSearchableMetadataByTarget(target);
    if (!meta) return;
    
    const id = `${meta.type}_${event.entityId}`;    

    await this.search.delete(meta.index, id);
  }

  private getMeta(entity: any, target: any): SearchableConfig | null {
    if (typeof target === 'function') {
      const meta = getSearchableMetadataByTarget(target);
      if (meta) return meta;
    }
    return getSearchableMetadata(entity);
  }

  private sync = async (entity: any, meta: SearchableConfig) => {    
    const doc = {
      id: `${meta.type}_${entity.id}`,
      type: meta.type,
      ...meta.pick.reduce((acc: any, key) => {
        acc[key] = entity[key] ?? null;
        return acc;
      }, {}),
      searchable: meta.pick.map((key) => entity[key] ?? '').join(' '),
    };

    await this.search.upsert(meta.index, doc);
  };
}
