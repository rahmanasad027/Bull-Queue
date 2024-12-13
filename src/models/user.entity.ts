import { CommonEntity } from 'src/global/entities/common.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  OneToMany,
} from 'typeorm';
import { UserVerificationStatusEnum } from 'src/modules/user/enums/user.verification.status.enum';
import * as bcrypt from 'bcrypt';
import { File } from './file.entity';

@Entity({ name: 'users' })
export class User extends CommonEntity {
  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  @Index({ unique: true })
  phone: string;

  @Column({ select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserVerificationStatusEnum,
    default: UserVerificationStatusEnum.PENDING,
    name: 'verification_status',
  })
  @Index()
  verificationStatus: UserVerificationStatusEnum;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2b$')) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  /**
   * Compares a plain-text password with the hashed password in the database.
   * @param password Plain-text password
   * @returns True if the passwords match, otherwise false
   */
  async validatePassword(password: string): Promise<boolean> {
    const isValid = await bcrypt.compare(password, this.password);
    return isValid;
  }

  @OneToMany(() => File, (file) => file.uploadedBy)
  files: File[];
}
