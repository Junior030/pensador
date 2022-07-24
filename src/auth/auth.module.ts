import { Module } from '@nestjs/common';
import { ServicoAutenticacao } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './login/login.controller';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_JWT,
      signOptions: { expiresIn: '14400s' },
    }),
  ],
  controllers: [LoginController],
  providers: [
    ServicoAutenticacao,
    JwtStrategyService,
    UsuariosService,
    PrismaService,
  ],
})
export class AuthModule {}
