import { BaseRepositoryAbstract } from '@baseRepositories/base.abstract.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { AccountRepositoryInterface } from './account.repository.interface';

@Injectable()
export class AccountRepository
  extends BaseRepositoryAbstract<Account>
  implements AccountRepositoryInterface
{
  repo: Repository<Account>;
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {
    super(accountRepository);
    this.repo = accountRepository;
  }

  getRepo(manager?: EntityManager): Repository<Account> {
    return manager ? manager.getRepository(Account) : this.repo;
  }

  async existsByUsername(username: string): Promise<boolean> {
    return await this.accountRepository.exists({ where: { username } });
  }

  async findByUsername(username: string) {
    return await this.findOneByCondition({ username });
  }

  async save(data: Partial<Account>, manager?: EntityManager) {
    const repo = this.getRepo(manager);
    const entity = repo.create(data);
    return repo.save(entity);
  }
}
