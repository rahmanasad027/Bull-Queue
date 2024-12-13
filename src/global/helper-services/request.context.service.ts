import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class RequestContextService {
  private request: Request;

  // Set the request object
  setRequest(request: Request) {
    this.request = request;
  }

  // Get the user from the request object
  getUser() {
    const user = this.request?.['user'];
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
