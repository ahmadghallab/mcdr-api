function getValueByPath(obj: any, path: string) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

function camelToSnake(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
}

function flattenKey(path: string) {
  return camelToSnake(path.replace(/\./g, '_'));
}

export function flattenForIndex(entity: any, pick: string[]) {
  const doc: Record<string, any> = {};
  const searchableParts: string[] = [];

  for (const path of pick) {
    const value = getValueByPath(entity, path);

    const keyName = flattenKey(path);

    doc[keyName] = value ?? null;

    if (value !== null && value !== undefined) {
      if (typeof value === 'object') {
        searchableParts.push(...Object.values(value).map((v) => String(v)));
      } else {
        searchableParts.push(String(value));
      }
    }
  }

  doc.searchable = searchableParts.join(' ');

  return doc;
}
