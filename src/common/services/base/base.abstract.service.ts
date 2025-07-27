import { BaseServiceInterface } from './base.interface.service';
import { DeepPartial } from 'typeorm';
import { BaseRepositoryInterface } from '@baseRepositories/base.interface.repository';
import { AppBaseEntity } from '@commonEntities/base.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseServiceAbstract<T extends AppBaseEntity>
  implements BaseServiceInterface<T>
{
  constructor(protected readonly repository: BaseRepositoryInterface<T>) {}

  async create(create_dto: DeepPartial<T>): Promise<T> {
    return await this.repository.create(create_dto);
  }

  async findAll(filter?: Partial<T>, options?: object): Promise<T[]> {
    return await this.repository.findAll(filter ?? {}, options);
  }

  async findOne(id: string): Promise<T | null> {
    return await this.repository.findOneById(id);
  }

  async update(
    id: string,
    update_dto: QueryDeepPartialEntity<T>,
  ): Promise<T | null> {
    return await this.repository.update(id, update_dto);
  }

  async softDelete(id: string | string[]): Promise<boolean> {
    return await this.repository.softDelete(id);
  }
  async permanentlyDelete(id: string | string[]): Promise<boolean> {
    return await this.repository.permanentlyDelete(id);
  }

  async findOneByCondition(
    condition: Partial<T>,
    options?: object,
  ): Promise<T | null> {
    return await this.repository.findOneByCondition(condition, options);
  }

  async findPaginated(
    condition: Partial<T>,
    page: number,
    limit: number,
    options?: object,
  ): Promise<{
    items: T[];
    meta: { total: number; page: number; limit: number; totalPages: number };
  }> {
    return await this.repository.findPaginated(condition, page, limit, options);
  }
}
