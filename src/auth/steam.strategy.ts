import { Strategy } from 'passport-steam';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy, 'steam') {
  constructor() {
    super({
      returnURL: 'http://cs2-network.ru:3050/auth/return',
      realm: 'http://cs2-network.ru:3050/players',
      apiKey: 'DDD25BDCA7319686EBB13581AD13E19E',
    });
  }

  validate(identifier, profile, done) {
    // add your code that is to be executed after the login succeeds here
  }
}
