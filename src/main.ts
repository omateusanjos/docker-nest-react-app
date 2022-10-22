import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import helmet from 'helmet';

const configOpenApi = new DocumentBuilder().setTitle('Hubla Back Challenge API')
  .setDescription('Hubla Back Challenge API')
  .setVersion('1.0')
  .build();



async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, configOpenApi);

  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });



  app.use(helmet({
    contentSecurityPolicy: false,
  }));

  await app.listen(4000);
}
bootstrap();
