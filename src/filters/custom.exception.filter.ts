import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ResponseDto } from 'src/global/dtos/response.dto';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    response
      .status(exception.getStatus())
      .json(
        new ResponseDto(
          exception.getResponse(),
          exception.getStatus(),
          exception.message,
        ),
      );
  }
}
