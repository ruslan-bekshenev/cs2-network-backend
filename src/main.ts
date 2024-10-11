import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.cert'),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors({ origin: 'http://cs2-network.ru:3050', credentials: true });
  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .setTitle('CS2 Network')
    .setDescription('CS2 Network API description')
    .setVersion('1.0.0')
    .addTag('CS2')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, 'cs2-network.ru');
}
bootstrap();
