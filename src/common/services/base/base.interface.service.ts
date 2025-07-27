import { DeepPartial, FindManyOptions } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface Write<T> {
  create(item: DeepPartial<T>): Promise<T>;
  update(id: string, item: QueryDeepPartialEntity<T>): Promise<T | null>;
  softDelete(id: string | string[]): Promise<boolean>;
  permanentlyDelete(id: string | string[]): Promise<boolean>;
}

export interface Read<T> {
  findAll(filter?: Partial<T>, options?: FindManyOptions<T>): Promise<T[]>;
  findOne(id: string): Promise<T | null>;
  findOneByCondition(
    condition: Partial<T>,
    options?: FindManyOptions<T>,
  ): Promise<T | null>;
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

export interface BaseServiceInterface<T> extends Write<T>, Read<T> {}
