import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { ApiKeyAuthGuard } from './auth/guard/apikey-auth.guard';
import { TransactionsModule } from './transactions/transactions.module';

const configOpenApi = new DocumentBuilder()
  .setTitle('Hubla Back Challenge API')
  .setDescription('You need to be authenticated to use this API. You can use the api-key: 84a350b4-56dd-11ed-9b6a-0242ac120002')
  .setVersion('1.0') 
  .addSecurity('api-key', {
    type: 'apiKey',
    in: 'header',
    name: 'api-key',
  })
  .addSecurityRequirements('api-key')
  .addApiKey(
    {
      type: 'apiKey',
      in: 'header',
      name: 'api-key',
    },
    'api-key',
  )
  .build();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new ApiKeyAuthGuard('api-key'));

  const transactionsDocument = SwaggerModule.createDocument(app, configOpenApi, {
    include: [TransactionsModule]
  });

  SwaggerModule.setup('api/transactions', app, transactionsDocument, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Hubla Back Challenge API',
    useGlobalPrefix: false,

  });

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:4000',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'api-key'],
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
