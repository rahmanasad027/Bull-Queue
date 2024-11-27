import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { configureSwagger } from './global/config/swagger/swagger.config';
import { CustomLogger } from './global/utils/custom.logger';
import { CustomExceptionFilter } from './filters/custom.exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule, {
    cors: true,
    rawBody: true,
    logger: new CustomLogger(),
  });

  configureSwagger(app);

  app.useGlobalFilters(new CustomExceptionFilter());

  // Global Pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  console.log('server running on', process.env.DEV_SERVER_PORT);
  await app.listen(process.env.DEV_SERVER_PORT);
}
bootstrap();
