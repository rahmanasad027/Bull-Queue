import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserVerificationStatusEnum } from '../enums/user.verification.status.enum';

export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty({
    enum: UserVerificationStatusEnum,
    default: UserVerificationStatusEnum.PENDING,
  })
  @IsEnum(UserVerificationStatusEnum)
  verificationStatus: UserVerificationStatusEnum =
    UserVerificationStatusEnum.PENDING;

  @ApiProperty({
    description: 'User password',
    example: 'P@ssw0rd123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password is too short. It should be at least 8 characters long.',
  })
  @MaxLength(20, {
    message: 'Password is too long. It should not exceed 20 characters.',
  })
  @Matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  )
  password: string;

  @ApiProperty({
    description: 'Confirm user password',
    example: 'P@ssw0rd123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message:
      'Confirm password is too short. It should be at least 8 characters long.',
  })
  @MaxLength(20, {
    message:
      'Confirm password is too long. It should not exceed 20 characters.',
  })
  @IsOptional()
  confirmPassword: string;

  @ApiProperty({
    description: 'Confirm password matches password',
    example: true,
  })
  @IsOptional()
  isPasswordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }
}
