// faceit.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';

@Injectable()
export class FaceitStrategy extends PassportStrategy(Strategy, 'faceit') {
  constructor() {
    super({
      authorizationURL: 'https://accounts.faceit.com/oauth/authorize',
      tokenURL: 'https://accounts.faceit.com/oauth/token',
      clientID: process.env.FACEIT_CLIENT_ID, // Ваш client_id
      clientSecret: process.env.FACEIT_CLIENT_SECRET, // Ваш client_secret
      callbackURL: 'https://cs2-network.ru:1337/auth/faceit/callback', // Ваш redirect_uri
      scope: ['openid'],
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    try {
      // Логика валидации и поиска пользователя в БД на основе профиля Faceit
      const user = {
        faceitId: profile.id, // faceit ID пользователя
        accessToken,
        refreshToken,
      };

      done(null, user); // Вернуть пользователя для сессии
    } catch (err) {
      done(err, false);
    }
  }
}
