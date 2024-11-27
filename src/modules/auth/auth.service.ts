import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from '../user/dto/create.user.dto';
import { UserService } from '../user/user.service';
import { SignInDTO } from './dto/signIn.dto';
import { RefreshTokenDTO } from './dto/refresh.token.dto';
import { JWTService } from './service/jwt.service';

@Injectable()
export class AuthService {
  private readonly ACCESS_TOKEN_EXPIRY = '9h';
  private readonly REFRESH_TOKEN_EXPIRY = '90d';

  constructor(
    private readonly usersService: UserService,
    private jwtService: JWTService,
  ) {}

  async signIn(payload: SignInDTO) {
    const user = await this.usersService.findOneBy(payload.email);

    if (!user || !(await user.validatePassword(payload.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const access_token = this.jwtService.accessToken(
      user.id,
      user.email,
      this.ACCESS_TOKEN_EXPIRY,
    );

    const refresh_token = this.jwtService.refreshToken(
      user.id,
      user.email,
      this.REFRESH_TOKEN_EXPIRY,
    );

    return { access_token, refresh_token };
  }

  async signUp(payload: CreateUserDTO) {
    const user = await this.usersService.createUser(payload);
    return user;
  }

  async reAuthenticate(payload: RefreshTokenDTO) {
    try {
      const decoded = this.jwtService.verifyRefreshToken(payload.refresh_token);

      const user = await this.usersService.findOneBy(decoded.email);

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const access_token = this.jwtService.accessToken(
        user.id,
        user.email,
        this.ACCESS_TOKEN_EXPIRY,
      );

      return { access_token };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token or expired');
    }
  }
}
