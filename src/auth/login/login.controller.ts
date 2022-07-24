import { Body, Controller, Post } from '@nestjs/common';
import { ServiceAuth } from '../auth.service';

@Controller('login')
export class LoginController {
  constructor(private serviceAuth: ServiceAuth) {}

  @Post()
  login(@Body() body) {
    return this.serviceAuth.login(body);
  }
}
