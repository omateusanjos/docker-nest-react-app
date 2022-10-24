import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from './transactions/transactions.module';
import { TransactionsController } from './transactions/transactions.controller';


const TypeORMConfig = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 15432,
  username: 'postgres',
  password: 'password',
  database: 'postgres',
  entities: [],
  synchronize: true,
  autoLoadEntities: true,
})

@Module({
  imports: [
    TypeORMConfig,
    TransactionsModule
  ],
  controllers: [AppController, TransactionsController],
  providers: [AppService],
})


export class AppModule {

}




