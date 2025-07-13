import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { BaseRepositoryInterface } from './base.interface.repository';
import { AppBaseEntity } from '@commonEntities/base.entity';
import { FindAllResponse } from '@commonTypes/common.types';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseRepositoryAbstract<T extends AppBaseEntity>
  implements BaseRepositoryInterface<T>
{
  protected constructor(private readonly repository: Repository<T>) {}

  async create(dto: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }

  async findOneById(id: string): Promise<T | null> {
    const item = await this.repository.findOneBy({ id } as FindOptionsWhere<T>);
    return item?.deletedAt ? null : item;
  }

  async findOneByCondition(
    condition: Partial<T>,
    options?: FindOneOptions<T>,
  ): Promise<T | null> {
    return await this.repository.findOne({
      where: {
        ...condition,
        deleted_at: null,
      } as FindOptionsWhere<T>,
      ...options,
    });
  }

  async findAll(
    condition: Partial<T>,
    options?: FindManyOptions<T>,
  ): Promise<FindAllResponse<T>> {
    const queryOptions: FindManyOptions<T> = {
      where: {
        ...condition,
        deleted_at: null,
      } as FindOptionsWhere<T>,
      ...options,
    };
    const [items, count] = await this.repository.findAndCount(queryOptions);
    return {
      count,
      items,
    };
  }

  async update(id: string, dto: QueryDeepPartialEntity<T>): Promise<T | null> {
    await this.repository.update(id, dto);
    return this.findOneById(id);
  }
  async softDelete(id: string | string[]): Promise<boolean> {
    const result = await this.repository.softDelete(id);
    return (result.affected ?? 0) > 0;
  }

  async permanentlyDelete(id: string | string[]): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
