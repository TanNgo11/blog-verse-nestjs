import { AppBaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends AppBaseEntity {
  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;
}
