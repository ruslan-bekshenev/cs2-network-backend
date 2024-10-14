import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-faceit';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { randomBytes, createHash } from 'node:crypto';
@Injectable()
export class FaceitStrategy extends PassportStrategy(Strategy, 'faceit') {
  constructor(private configService: ConfigService) {
    // const code_verifier = randomBytes(32).toString('base64url');
    // const code_challenge = createHash('sha256')
    //   .update(code_verifier)
    //   .digest('base64url');
    super({
      clientID: configService.get('FACEIT_CLIENT_ID'),
      clientSecret: configService.get('FACEIT_CLIENT_SECRET'),
      callbackURL: 'https://cs2-network.ru:3000/auth/faceit/callback',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    params: any,
    profile: any,
    done: any,
  ) {
    console.log(accessToken, refreshToken, params, profile, done);
    try {
      const userData = jwt.decode(params.id_token);
      const user = {
        faceitId: userData.guid,
        faceitAvatar: userData.picture,
        faceitEmail: userData.email,
        faceitNickname: userData.nickname,
      };

      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
}
