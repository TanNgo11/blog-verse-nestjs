import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { BaseRepositoryInterface } from './base.interface.repository';
import { AppBaseEntity } from '@commonEntities/base.entity';
import { FindAllResponse } from '@commonTypes/common.types';

export abstract class BaseRepositoryAbstract<T extends AppBaseEntity>
  implements BaseRepositoryInterface<T>
{
  protected constructor(private readonly repository: Repository<T>) {}

  async create(dto: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }

  async findOneById(id: string): Promise<T | null> {
    const item = await this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
    });
    return item?.deletedAt ? null : item;
  }

  async findOneByCondition(condition: Partial<T>): Promise<T | null> {
    return await this.repository.findOne({
      where: {
        ...condition,
        deleted_at: null,
      } as FindOptionsWhere<T>,
    });
  }

  async findAll(condition: Partial<T>): Promise<FindAllResponse<T>> {
    const [items, count] = await this.repository.findAndCount({
      where: {
        ...condition,
        deleted_at: null,
      } as FindOptionsWhere<T>,
    });

    return {
      count,
      items,
    };
  }

  async update(id: string, dto: Partial<T>): Promise<T | null> {
    await this.repository.update(id, dto as any);
    return this.findOneById(id);
  }

  async softDelete(id: string): Promise<boolean> {
    const result = await this.repository.update(id, {
      deleted_at: new Date(),
    } as any);
    return (result.affected ?? 0) > 0;
  }

  async permanentlyDelete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
