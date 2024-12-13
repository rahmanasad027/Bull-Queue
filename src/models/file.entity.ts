import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CommonEntity } from 'src/global/entities/common.entity';
import { User } from './user.entity';

@Entity({ name: 'files' })
export class File extends CommonEntity {
  @Column({ nullable: true })
  url: string | null;

  @Column({ name: 'file_name' })
  fileName: string;

  @Column({ name: 'file_size' })
  fileSize: number;

  @Column({ name: 's3_key' })
  s3Key: string;

  @ManyToOne(() => User, (user) => user.files, {
    cascade: ['update'],
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'uploaded_by' })
  uploadedBy: User;
}
