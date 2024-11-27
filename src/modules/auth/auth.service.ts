import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from '../user/dto/create.user.dto';
import { UserService } from '../user/user.service';
import { SignInDTO } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDTO } from './dto/refresh.token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(payload: SignInDTO) {
    const user = await this.usersService.findOneBy(payload.email);

    if (!user || !(await user.validatePassword(payload.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const access_token = this.jwtService.sign(
      { sub: user.id, email: user.email },
      { expiresIn: '40m' },
    );

    const refresh_token = this.jwtService.sign(
      { sub: user.id, email: user.email },
      { expiresIn: '7d' },
    );

    return { access_token, refresh_token };
  }

  async signUp(payload: CreateUserDTO) {
    const user = await this.usersService.createUser(payload);
    return user;
  }

  async reAuthenticate(payload: RefreshTokenDTO) {
    try {
      const decoded = this.jwtService.verify(payload.refresh_token);

      const user = await this.usersService.findOneBy(decoded.email);

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const access_token = this.jwtService.sign(
        { sub: user.id, email: user.email },
        { expiresIn: '40m' },
      );

      return { access_token };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token or expired');
    }
  }
}
