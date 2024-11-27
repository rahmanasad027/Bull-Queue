import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTService {
  constructor(private jwtService: JwtService) {}

  accessToken(id: number, email: string, accessToken: string) {
    const access_token = this.jwtService.sign(
      { sub: id, email: email },
      { expiresIn: accessToken },
    );

    return access_token;
  }

  refreshToken(id: number, email: string, refreshToken: string) {
    const access_token = this.jwtService.sign(
      { sub: id, email: email },
      { expiresIn: refreshToken },
    );

    return access_token;
  }

  verifyRefreshToken(refreshToken: string) {
    const decoded = this.jwtService.verify(refreshToken);

    return decoded;
  }
}
