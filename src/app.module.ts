import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from './transactions/transactions.module';
import { TransactionsController } from './transactions/transactions.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';


const TypeORMConfig = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT_DOCKER, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [],
  synchronize: true,
  autoLoadEntities: true,
})

@Module({
  imports: [
    TypeORMConfig,
    TransactionsModule,
    AuthModule,
  ],
  controllers: [AppController, TransactionsController],
  providers: [AppService, AuthService],
})


export class AppModule {

}




