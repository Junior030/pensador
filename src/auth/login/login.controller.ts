import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ServiceAuth } from '../auth.service';
import { Login } from './dto/login-post.dto';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private serviceAuth: ServiceAuth) {}

  @Post()
  login(@Body() body: Login) {
    return this.serviceAuth.login(body);
  }
}
