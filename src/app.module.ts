import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DataSource } from 'typeorm';
import {
  addTransactionalDataSource,
  deleteDataSourceByName,
} from 'typeorm-transactional';
import { ormOptions } from '../ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AppConfigModule } from 'config.module';
import { AppLoggerMiddleware } from './global/middlewares/app.logger.middleware';
import { RequestContextService } from './global/helper-services/request.context.service';
import { AuthGuard } from './global/guards/auth.guard';
import { FileManagementModule } from './modules/file-management/file.management.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ormOptions.options,
      dataSourceFactory: async (options) => {
        deleteDataSourceByName('default');

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    AuthModule,
    UserModule,
    FileManagementModule,
  ],
  controllers: [AppController],
  providers: [RequestContextService, AuthGuard],
  exports: [RequestContextService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
