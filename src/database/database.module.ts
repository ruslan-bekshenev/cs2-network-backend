import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('POSTGRES_HOST', 'localhost'),
          port: +configService.get('POSTGRES_POST', 5432),
          username: configService.get('POSTGRES_USER', 'postgres'),
          password: configService.get('POSTGRES_PASSWORD', 'postgres'),
          database: configService.get<string>(
            'POSTGRES_DATABASE',
            'cs2-network',
          ),
          entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
          migrationsRun: true,
          cli: {
            migrationsDir: './src/migration',
          },
          synchronize: false,
          keepConnectionAlive: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
