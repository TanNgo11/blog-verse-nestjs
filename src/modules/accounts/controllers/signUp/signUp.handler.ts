import { TransactionRunner } from '@common/transaction/transaction-runner';
import { Account } from '@modules/accounts/entities/account.entity';
import { AccountService } from '@modules/accounts/services/account.service';
import { Injectable } from '@nestjs/common';
import { SignUpRequestDTO } from './signUp.request.dto';

@Injectable()
export class SignUpHandler {
  constructor(
    private readonly transaction: TransactionRunner,
    private readonly accountService: AccountService,
  ) {}

  async execute(dto: SignUpRequestDTO): Promise<Account> {
    return this.transaction.run<Account>(async (manager) => {
      const account = await this.accountService.signUp(dto, manager);
      return account;
    });
  }
}
