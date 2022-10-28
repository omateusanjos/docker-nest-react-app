import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { ApiKeyAuthGuard } from './auth/guard/apikey-auth.guard';

const configOpenApi = new DocumentBuilder()
  .setTitle('Hubla Back Challenge APIs')
  .setDescription('Hubla Back Challenge APIs')
  .setVersion('1.0')
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new ApiKeyAuthGuard('api-key'));

  const document = SwaggerModule.createDocument(app, configOpenApi);

  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );


  await app.listen(Number(process.env.API_PORT) ?? 4000);
}
bootstrap();
