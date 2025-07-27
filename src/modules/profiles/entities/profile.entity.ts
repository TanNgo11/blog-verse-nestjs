import { Account } from '@modules/accounts/entities/account.entity';
import { AppBaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity('profiles')
export class Profile extends AppBaseEntity {
  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  middleName?: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatarUrl?: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth?: Date;

  @OneToOne(() => Account, (account) => account.profile, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  account: Account;
}
