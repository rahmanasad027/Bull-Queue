import { SetMetadata } from '@nestjs/common';

export const AuthType = (...authType: string[]) =>
  SetMetadata('authTypes', authType);
