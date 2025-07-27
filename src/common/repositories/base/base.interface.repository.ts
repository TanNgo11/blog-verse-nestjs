import { DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface BaseRepositoryInterface<T> {
  create(dto: DeepPartial<T>): Promise<T>;

  findOneById(id: string): Promise<T | null>;

  findOneByCondition(
    condition: Partial<T>,
    options?: FindOneOptions<T>,
  ): Promise<T | null>;

  findAll(condition: Partial<T>, options?: FindManyOptions<T>): Promise<T[]>;

  update(id: string, dto: QueryDeepPartialEntity<T>): Promise<T | null>;

  softDelete(id: string | string[]): Promise<boolean>;

  permanentlyDelete(id: string | string[]): Promise<boolean>;

  findPaginated(
    condition: Partial<T>,
    page: number,
    limit: number,
    options?: FindManyOptions<T>,
  ): Promise<{
    items: T[];
    meta: { total: number; page: number; limit: number; totalPages: number };
  }>;
}
