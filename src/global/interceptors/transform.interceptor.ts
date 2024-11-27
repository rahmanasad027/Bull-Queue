import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDto } from '../dtos/response.dto';
import { plainToClass } from 'class-transformer';

interface ClassType<T> {
  new (): T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<Partial<T>, ResponseDto<T>>
{
  constructor(
    private readonly classType: ClassType<T>,
    private readonly groups: string[],
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDto<T>> {
    return next.handle().pipe(
      map((responseDTO: ResponseDto<T>) => {
        responseDTO.data = plainToClass(this.classType, responseDTO.data, {
          groups: this.groups,
          enableCircularCheck: true,
          // excludeExtraneousValues: true,
        });
        return responseDTO;
      }),
    );
  }
}
