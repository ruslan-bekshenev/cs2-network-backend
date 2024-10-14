// auth.controller.ts
import { Auth } from '@auth/core';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import FACEIT from '@auth/core/providers/faceit';

@Controller('auth')
export class AuthController {
  @Get('faceit')
  // @UseGuards(AuthGuard('faceit'))
  async faceitLogin() {
    const request = new Request('http://cs2-network.ru:3050/');
    // // Редирект на Faceit для авторизации
    const response = await Auth(request, {
      providers: [
        FACEIT({
          clientId: process.env.FACEIT_CLIENT_ID ?? '',
          clientSecret: process.env.FACEIT_CLIENT_SECRET ?? '',
        }),
      ],
    });
    console.log(request);
    // console.log(response);
  }

  @Get('faceit/callback')
  @UseGuards(AuthGuard('faceit'))
  faceitCallback(@Req() req) {
    // Авторизация успешна, обрабатываем результат
    return req.user;
  }

  @Get('steam')
  @UseGuards(AuthGuard('steam'))
  steamLogin() {}
}
