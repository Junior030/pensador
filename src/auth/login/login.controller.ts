import { Body, Controller, Post } from '@nestjs/common';
import { ServicoAutenticacao } from '../auth.service';

@Controller('login')
export class LoginController {
  constructor(private servicoAutenticacao: ServicoAutenticacao) {}

  @Post()
  login(@Body() body) {
    return this.servicoAutenticacao.login(body);
  }
}
