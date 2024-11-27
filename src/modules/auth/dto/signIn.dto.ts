import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignInDTO {
  @ApiProperty()
  @IsEmail()
  email: string;

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
}
