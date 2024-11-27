import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    request['timeRequestReceived'] = new Date().getTime();
    request['reqId'] = uuidv4();
    const userAgent = request.get('user-agent') || '';

    response.on('close', () => {
      const time = new Date().getTime() - request['timeRequestReceived'];
      const { statusCode } = response;

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${time}ms - ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
