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
        await this.transactionRepository.save(transaction);
      }
      );
      return { message: 'Transactions created', status: 201 };
    }
    catch (error) {
      return error;
    }
  }

  async findAll(): Promise<Transaction[]> {
    try {
      return await this.transactionRepository.find();
    }
    catch (error) {
      return error;
    }
  }

  async findOne(seller: string) {
    try {
      return await this.transactionRepository.find({
        where: { seller },
      });
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
      await this.transactionRepository.findBy({ id }).then((transaction) => {
        if (transaction) {
          return this.transactionRepository.delete(id);
        }
      });

      return { message: 'Transaction not found', status: 404 };
    }
    catch (error) {
      return error;
    }

  }
}
