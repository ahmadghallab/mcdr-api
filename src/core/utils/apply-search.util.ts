import { SelectQueryBuilder } from 'typeorm';

export function applySearch<T>(
  qb: SelectQueryBuilder<T>,
  term: string,
  fields: string[],
  alias = qb.alias,
) {
  if (!term) return qb;

  const like = `%${term}%`;

  const conditions = fields
    .map((field) => `LOWER(${alias}.${field}) LIKE LOWER(:search)`)
    .join(' OR ');

  return qb.andWhere(`(${conditions})`, { search: like });
}
