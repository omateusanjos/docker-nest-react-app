import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {ApiExtraModels, ApiQuery, ApiResponse } from '@nestjs/swagger';
@Controller('transactions')

export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @Post()
  @ApiQuery({
    type: CreateTransactionDto,
  })

  @ApiResponse({ status: 201, description: 'Transactions created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Return all transactions.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':seller')

  @ApiResponse({ status: 200, description: 'Return all transactions by seller.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findOne(@Param('seller') seller: string) {
    return this.transactionsService.findOne(seller);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Update transaction by id.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete transaction by id.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
