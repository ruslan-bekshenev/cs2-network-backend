// auth.controller.ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('faceit')
  @UseGuards(AuthGuard('faceit'))
  async faceitLogin() {
    // Редирект на Faceit для авторизации
  }

  @Get('faceit/callback')
  @UseGuards(AuthGuard('faceit'))
  faceitCallback(@Req() req) {
    // Авторизация успешна, обрабатываем результат
    return req.user;
  }
}
