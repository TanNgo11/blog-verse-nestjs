import { RefreshToken } from '@modules/auth/entities/refresh-token.entity';
import { Profile } from '@modules/profiles/entities/profile.entity';
import { Role } from '@modules/roles/entities/role.entity';
import { AppBaseEntity } from 'src/common/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';

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
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.account, {
    cascade: true,
  })
  refreshTokens: RefreshToken[];

  @ManyToMany(() => Role, (role) => role.accounts, { cascade: true })
  @JoinTable({
    name: 'account_roles',
    joinColumn: { name: 'account_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];
}
