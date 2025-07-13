import { FindAllResponse } from '@commonTypes/common.types';
import { DeepPartial } from 'typeorm';

export interface BaseRepositoryInterface<T> {
  create(dto: DeepPartial<T>): Promise<T>;

  findOneById(id: string): Promise<T | null>;

  findOneByCondition(condition: Partial<T>): Promise<T | null>;

  findAll(condition: Partial<T>, options?: object): Promise<FindAllResponse<T>>;

  update(id: string, dto: Partial<T>): Promise<T | null>;

  softDelete(id: string): Promise<boolean>;

  permanentlyDelete(id: string): Promise<boolean>;
}
