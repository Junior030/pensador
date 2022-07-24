import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

interface IUser {
  id: number;
  email: string;
  name: string;
}

@Injectable()
export class ServicoAutenticacao {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async validateUser(email: string, senha: string): Promise<IUser> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === senha) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = await this.validateUser(user.email, user.senha);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
