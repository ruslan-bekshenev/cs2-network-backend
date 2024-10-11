// auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { FaceitStrategy } from './faceit.strategy'; // Импортируем стратегию

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'faceit' })],
  controllers: [AuthController],
  providers: [FaceitStrategy],
})
export class AuthModule {}
