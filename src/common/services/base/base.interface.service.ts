import { FindAllResponse } from 'src/common/types/common.types';
import { DeepPartial } from 'typeorm';

export interface Write<T> {
  create(item: DeepPartial<T>): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T | null>;
  remove(id: string): Promise<boolean>;
}

export interface Read<T> {
  findAll(filter?: Partial<T>, options?: object): Promise<FindAllResponse<T>>;
  findOne(id: string): Promise<T | null>;
}

export interface BaseServiceInterface<T> extends Write<T>, Read<T> {}
