import { Profile } from '@modules/profiles/entities/profile.entity';
import { AppBaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity('accounts')
export class Account extends AppBaseEntity {
  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin?: Date;

  @OneToOne(() => Profile, (profile) => profile.account, {
    cascade: true,
  })
  profile: Profile;
}
