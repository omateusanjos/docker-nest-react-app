import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as csurf from 'csurf';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.use(csurf());


  await app.listen(4000);
}
bootstrap();
