import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

export function getUserFromRequest(request: Request): Express.User {
  const user = request['user'];
  if (!user) {
    throw new UnauthorizedException('User not found in request');
  }
  return user;
}
