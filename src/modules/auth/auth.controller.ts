import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/global/decorators/public.decorator';
import { ResponseDto } from 'src/global/dtos/response.dto';
import { CreateUserDTO } from '../user/dto/create.user.dto';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signIn.dto';
import { RefreshTokenDTO } from './dto/refresh.token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login with credentials user' })
  async signIn(@Body() signInDto: SignInDTO) {
    const access_token = await this.authService.signIn(signInDto);

    return new ResponseDto(
      { access_token },
      HttpStatus.CREATED,
      'User Signed In successfuly',
    );
  }

  @Public()
  @Post('signup')
  @ApiOperation({ summary: 'Create a new user' })
  async createUser(@Body() createUserDto: CreateUserDTO) {
    const res = await this.authService.signUp(createUserDto);

    return new ResponseDto(res, HttpStatus.CREATED, 'User created successfuly');
  }

  @Public()
  @Post('reauthenticate')
  @ApiOperation({ summary: 'Re-authenticate using refresh token' })
  async reAuthenticate(@Body() refreshTokenDto: RefreshTokenDTO) {
    const { access_token } =
      await this.authService.reAuthenticate(refreshTokenDto);

    return new ResponseDto(
      { access_token },
      HttpStatus.CREATED,
      'Re-authentication successful',
    );
  }
}
