import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService],
  imports: [TypeOrmModule.forFeature([Transaction, TransactionsService])],
})
export class TransactionsModule { }
