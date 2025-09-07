import { AppBaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { RoleName } from '../enums/role.enums';
import { Account } from '@modules/accounts/entities/account.entity';

@Entity('roles')
export class Role extends AppBaseEntity {
  @Column({ type: 'enum', enum: RoleName, unique: true })
  roleName: RoleName;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToMany(() => Account, (account) => account.roles)
  accounts: Account[];
}
