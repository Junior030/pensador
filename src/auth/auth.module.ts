import { Module } from '@nestjs/common';
import { ServiceAuth } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './login/login.controller';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../database/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_JWT,
      signOptions: { expiresIn: '14400s' },
    }),
  ],
  controllers: [LoginController],
  providers: [ServiceAuth, JwtStrategyService, UsersService, PrismaService],
})
export class AuthModule {}
