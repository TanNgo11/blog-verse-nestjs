import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class TransactionRunner {
  constructor(private readonly dataSource: DataSource) {}

  async run<T>(handler: (manager: EntityManager) => Promise<T>): Promise<T> {
    return this.dataSource.transaction(handler);
  }
}
