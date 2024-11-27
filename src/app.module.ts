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
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
