import { SearchableConfig } from "./searchable.decorator";

function getValueByPath(obj: any, path: string) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

function camelToSnake(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
}

function flattenKey(path: string) {
  return camelToSnake(path.replace(/\./g, '_'));
}

function flattenForIndex(entity: any, pick: string[]) {
  const doc: Record<string, any> = {};

  for (const path of pick) {
    const value = getValueByPath(entity, path);

    const keyName = flattenKey(path);

    doc[keyName] = value ?? null;
  }

  return doc;
}

export function buildSearchableText(doc: Record<string, any>) {
  return Object.values(doc)
    .filter((v) => typeof v === 'string' && v.trim())
    .join(' ');
}

function normalizeSearchableValue(value: any): string {
  if (!value) return '';

  // plain string
  if (typeof value === 'string') {
    const trimmed = value.trim();

    // not JSON
    if (!trimmed.startsWith('[')) return trimmed;

    try {
      return extractBlocks(JSON.parse(trimmed));
    } catch {
      return trimmed;
    }
  }

  // already array
  if (Array.isArray(value)) {
    return extractBlocks(value);
  }

  return '';
}

function extractBlocks(blocks: any[]): string {
  const acc: string[] = [];

  const walk = (node: any) => {
    if (!node) return;

    // ✅ capture text FIRST
    if (typeof node.text === 'string') {
      acc.push(node.text);
    }

    // then recurse
    if (Array.isArray(node.content)) {
      node.content.forEach(walk);
    }

    if (Array.isArray(node.children)) {
      node.children.forEach(walk);
    }
  };

  blocks.forEach(walk);

  return acc.join('\n');
}

export function prepareSearchDocument(entity: any, meta: SearchableConfig) {
  const base = {
    id: `${meta.type}_${entity.id}`,
    type: meta.type,
  };

  const flattenedRaw = flattenForIndex(entity, meta.pick);

  const flattened: Record<string, string> = {};

  for (const [k, v] of Object.entries(flattenedRaw)) {
    flattened[k] = normalizeSearchableValue(v);
  }

  const extra = meta.extra ? meta.extra(entity) : {};

  const searchable_text = String(extra.searchable_text ?? buildSearchableText(flattened) ?? '');

  return {
    ...base,
    ...flattened,
    searchable_text,
    ...extra,
  }
}

export function prepareSearchDocuments(entity: any, meta: SearchableConfig): any[] {
  const flattenedRaw = flattenForIndex(entity, meta.pick);
  const flattened: Record<string, string> = {};

  for (const [k, v] of Object.entries(flattenedRaw)) {
    flattened[k] = normalizeSearchableValue(v);
  }

  const extra = meta.extra ? meta.extra(entity) : {};
  const compositeParentId = `${meta.type}_${entity.id}`; // Common ID for both types

  // --- CASE 1: Simple Entities (FAQs) ---
  if (!meta.chunked) {
    const searchable_text = String(extra.searchable_text ?? buildSearchableText(flattened) ?? '');
    return [{
      id: compositeParentId, // For single docs, the ID and Parent ID can be the same
      parent_id: compositeParentId, 
      type: meta.type,
      ...flattened,
      searchable_text,
      ...extra,
    }];
  }

  // --- CASE 2: Huge Pages (Chunked) ---
  const fullText = buildSearchableText(flattened);
  const chunks = splitTextIntoChunks(fullText, 1500, 200);

  return chunks.map((chunk, i) => ({
    id: `${compositeParentId}_${i}`, // Unique ID per chunk
    parent_id: compositeParentId,    // Same Parent ID as the FAQ version
    type: meta.type,
    ...flattened,
    searchable_text: chunk,
    ...extra,
  }));
}

function splitTextIntoChunks(text: string, size: number, overlap: number): string[] {
  const result: string[] = [];
  let start = 0;

  while (start < text.length) {
    let end = start + size;
    // Try to find a natural break (newline or period) near the limit
    if (end < text.length) {
      const lastBreak = text.lastIndexOf('\n', end);
      if (lastBreak > start + (size * 0.8)) end = lastBreak;
    }
    result.push(text.slice(start, end).trim());
    start = end - overlap;
  }
  return result;
}