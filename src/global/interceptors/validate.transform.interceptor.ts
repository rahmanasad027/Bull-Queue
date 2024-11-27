import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDto } from '../dtos/response.dto';

@Injectable()
export class ValidateTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response: ResponseDto<any>) => {
        if (response?.constructor?.name == ResponseDto.name) {
          context.switchToHttp().getResponse().statusCode = response.statusCode;
          return response;
        }
        throw new HttpException(
          'Response type should be of GlobalResponseDTO',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }
}
