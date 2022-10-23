import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) { }

  async create(createTransactionDto: CreateTransactionDto): Promise<any> {
    try {
      createTransactionDto.file.forEach(async (transaction) => {
        this.transactionRepository.create(transaction);
      }
      );
      return { message: 'Transactions created', status: 201 };
    }
    catch (error) {
      console.log(error);
      return error;
    }

  }

  async findAll(): Promise<Transaction[]> {
    try {
      const transactions = await this.transactionRepository.find();
      return transactions;
    }
    catch (error) {
      return error;
    }

  }

  async findOne(id: number) {
    try {
      const transaction = await this.transactionRepository.findOne({
        where: { id },
      });
      return transaction;
    }
    catch (error) {
      return error;
    }

  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });
    if (transaction) {
      return this.transactionRepository.update(id, updateTransactionDto);
    }
  }

  async remove(id: number) {
    try {
      const transaction = await this.transactionRepository.findBy({ id });
      if (transaction) {
        await this.transactionRepository.remove(transaction);
        return transaction;
      }

      return { message: 'Transaction not found', status: 404 };
    }
    catch (error) {
      return error;
    }

  }
}
