import { SelectQueryBuilder } from "typeorm";

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export const paginate = async <T>(
  queryBuilder: SelectQueryBuilder<T>,
  options: PaginationOptions
): Promise<PaginationResult<T>> => {
  const { page, limit } = options;

  const [data, total] = await queryBuilder
    .skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount();

  return {
    data,
    total,
    page,
    limit,
  };
};
