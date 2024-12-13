import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/global/guards/auth.guard';
import { JWTService } from './service/jwt.service';
import { RequestContextService } from 'src/global/helper-services/request.context.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
    JWTService,
    RequestContextService,
  ],
  exports: [AuthService, RequestContextService],
})
export class AuthModule {}
