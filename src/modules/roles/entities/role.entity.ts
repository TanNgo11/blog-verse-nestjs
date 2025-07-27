import { AppBaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { RoleName } from '../enums/role.enums';

@Entity('roles')
export class Role extends AppBaseEntity {
  @Column({ type: 'enum', enum: RoleName, unique: true })
  roleName: RoleName;

  @Column({ type: 'text', nullable: true })
  description?: string;
}
