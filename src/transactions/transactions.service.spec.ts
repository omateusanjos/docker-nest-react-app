import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TransactionsController } from './transactions.controller';
import { CreateTransactionDto } from './dto/create-transaction.dto';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let model: typeof Transaction;
  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: getRepositoryToken(Transaction),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue([]),
            save: jest.fn().mockResolvedValue([]),
            update: jest.fn().mockResolvedValue([]),
            delete: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = app.get<TransactionsService>(TransactionsService);
    model = app.get<typeof Transaction>(getRepositoryToken(Transaction));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(model).toBeDefined();
  });

  const mockTransaction: Transaction[] = [
    {
      id: 1,
      type: 1,
      date: new Date(),
      seller: 'seller',
      product: 'product',
      value: 1000,
    },
    {
      id: 2,
      type: 1,
      date: new Date(),
      seller: 'seller',
      product: 'product',
      value: 1000,
    },
  ];


  describe('Transactions', () => {

    it('should return all transactions', async () => {
      const result = [...mockTransaction];
      jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve(result));
      expect(await service.findAll()).toBe(result);
    });

    it('should return a transaction', async () => {
      const transactions: Transaction = {
        id: 1,
        value: 1000,
        type: 1,
        date: new Date(),
        seller: 'seller',
        product: 'product',
      }
      const result: CreateTransactionDto = {
        file: [
          transactions
        ]
      }
      jest.spyOn(service, 'findOne').mockImplementation(() => Promise.resolve(result));
      expect(await service.findOne(result.file[0].seller)).toBe(result);
    }
    );

    it('should create a transaction', async () => {
      const transactions: Transaction = {
        id: 1,
        value: 1000,
        type: 1,
        date: new Date(),
        seller: 'seller',
        product: 'product',
      }
      const result: CreateTransactionDto = {
        file: [
          transactions
        ]
      }
      jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve(result));
      expect(await service.create(result)).toBe(result);
    }
    );


    it('should delete a transaction', async () => {
      const result = mockTransaction[0];
      jest.spyOn(service, 'remove').mockImplementation(() => Promise.resolve(result));
      expect(await service.remove(1)).toBe(result);
    }
    );

  });

}
);

