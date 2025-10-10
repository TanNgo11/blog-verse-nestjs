import { AppBaseEntity } from '@common/entities/base.entity';
import { Entity, Column, Index } from 'typeorm';

@Entity('files')
export class FileEntity extends AppBaseEntity {
  @Column({ type: 'varchar', length: 255 })
  filename: string;

  @Column({ type: 'varchar', length: 500 })
  @Index()
  key: string;

  @Column({ type: 'varchar', length: 500 })
  url: string;

  @Column({ type: 'varchar', length: 100 })
  mimeType: string;

  @Column({ type: 'bigint' })
  size: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  uploadedBy?: string;

  @Column({ type: 'text', nullable: true })
  metadata?: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
