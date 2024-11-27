import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ResponseDto } from './global/dtos/response.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from './global/decorators/public.decorator';

@ApiTags('App')
@ApiBearerAuth()
@Controller()
export class AppController {
  @Public()
  @Get()
  async getHello() {
    return new ResponseDto<string>(
      'App is Running',
      HttpStatus.OK,
      'Welcome to Royalty Radar',
    );
  }
}
