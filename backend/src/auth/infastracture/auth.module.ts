import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '../presentation/auth.controller';
import { LoginUserHandler } from '../application/commands/login-user/login-user.handler';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UserModule } from '../../user/infastracture/user.module';

const commandHandlers = [LoginUserHandler];

@Module({
  imports: [
    UserModule,
    ConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');

        if (!secret) {
          throw new Error('JWT_SECRET is not configured');
        }

        return {
          secret,
          signOptions: {
            expiresIn: '8h',
          },
        };
      },
    }),

    CqrsModule,
  ],

  controllers: [AuthController],

  providers: [...commandHandlers, JwtStrategy],
})
export class AuthModule {}
