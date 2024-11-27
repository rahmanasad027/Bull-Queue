import { ConsoleLogger } from '@nestjs/common';
import { RequestService } from '../helper-services/request.service';

export class CustomLogger extends ConsoleLogger {
  log(message: any, ...optionalParams: any[]) {
    if (RequestService.getRequestId()) {
      super.log(
        `REQ-ID: ${RequestService.getRequestId() || ''} - ${message}`,
        ...optionalParams,
      );
    } else {
      super.log(message, ...optionalParams);
    }
  }

  error(message: any, ...optionalParams: any[]) {
    if (RequestService.getRequestId()) {
      super.error(
        `REQ-ID: ${RequestService.getRequestId() || ''} - ${message}`,
        ...optionalParams,
      );
    } else {
      super.error(message, ...optionalParams);
    }
  }

  warn(message: any, ...optionalParams: any[]) {
    if (RequestService.getRequestId()) {
      super.warn(
        `REQ-ID: ${RequestService.getRequestId() || ''} - ${message}`,
        ...optionalParams,
      );
    } else {
      super.warn(message, ...optionalParams);
    }
  }
}
