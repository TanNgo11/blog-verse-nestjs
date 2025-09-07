import { TransactionRunner } from '@common/transaction/transaction-runner';
import { Account } from '@modules/accounts/entities/account.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '@modules/profiles/entities/profile.entity';
import { SignUpRequestDTO } from './signUp-request.dto';
import * as bcrypt from 'bcryptjs';
import { Role } from '@modules/roles/entities/role.entity';
import { RoleName } from '@modules/roles/enums/role.enums';

@Injectable()
export class SignUpHandler {
  private readonly SALT_ROUND = 11;
  constructor(
    private readonly transaction: TransactionRunner,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async execute(dto: SignUpRequestDTO): Promise<Account> {
    const existing = await this.accountRepository.exists({
      where: { username: dto.username },
    });

    if (existing) {
      throw new BadRequestException('Username already exists');
    }
    const hashed_password = await bcrypt.hash(dto.password, this.SALT_ROUND);

    return this.transaction.run(async (manager) => {
      const accountRepo = manager.getRepository(Account);
      const profileRepo = manager.getRepository(Profile);
      const roleRepo = manager.getRepository(Role);
      const profile = profileRepo.create(dto.profile);
      const userRole = await roleRepo.findOneBy({ roleName: RoleName.USER });
      const roles: Role[] = [];
      if (userRole) {
        roles.push(userRole);
      }
      const account = accountRepo.create({
        username: dto.username,
        password: hashed_password,
        email: dto.email,
        profile,
        roles,
      });

      return await accountRepo.save(account);
    });
  }
}
