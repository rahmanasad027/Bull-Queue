import { HttpStatus } from '@nestjs/common';

export class ResponseDto<T> {
  message: string;
  statusCode: number;
  data: T;

  constructor(data: T, status?: number, message?: string) {
    this.statusCode = status ?? HttpStatus.OK;
    this.message = message ?? 'Succesfull';
    this.data = data;
  }
}
