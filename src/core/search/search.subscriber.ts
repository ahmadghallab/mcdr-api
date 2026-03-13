import {
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from 'typeorm';
import { SearchService } from './search.service';
import { SearchableConfig, getSearchableMetadata, getSearchableMetadataByTarget } from './searchable.decorator';
import { prepareSearchDocuments } from './search.util';

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

    const compositeParentId = `${meta.type}_${entity.id}`;  

    // 1. Wipe all old chunks
    await this.search.deleteByParent(meta.index, compositeParentId);

    // 2. Add new chunks (via sync which calls upsertBatch)
    await this.sync(entity, meta);
  }

  async afterRemove(event: RemoveEvent<any>) {
    const target = event.metadata.target;
    if (typeof target !== 'function') return;
    
    const meta = getSearchableMetadataByTarget(target);
    if (!meta) return;
    
    const compositeParentId = `${meta.type}_${event.entityId}`;   

    await this.search.deleteByParent(meta.index, compositeParentId);
  }

  private getMeta(entity: any, target: any): SearchableConfig | null {
    if (typeof target === 'function') {
      const meta = getSearchableMetadataByTarget(target);
      if (meta) return meta;
    }
    return getSearchableMetadata(entity);
  }

  private async sync(entity: any, meta: SearchableConfig) {
    const docs = prepareSearchDocuments(entity, meta); // Returns an array
    await this.search.upsertBatch(meta.index, docs);
  };  
}
