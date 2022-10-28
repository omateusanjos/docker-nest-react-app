import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { getRepositoryToken } from '@nestjs/typeorm';



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


describe('TransactionsController', () => {
  let controller: TransactionsController;
  let service: TransactionsService;
  let result: Transaction[];
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [TransactionsController],
      providers: [TransactionsService, {
        provide: getRepositoryToken(Transaction),
        useValue: {
          find: jest.fn().mockResolvedValue([]),
          findOne: jest.fn().mockResolvedValue([]),
          save: jest.fn().mockResolvedValue([]),
          update: jest.fn().mockResolvedValue([]),
          delete: jest.fn().mockResolvedValue([]),
        },
      }],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
    service = module.get<TransactionsService>(TransactionsService);
    result = [...mockTransaction];
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(result).toBeDefined();
  });

  describe('Transactions', () => {
    it('should return all transactions', async () => {
      jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve(result));
      expect(await controller.findAll()).toBe(result);
    });

    it('should return a transaction', async () => {
      jest.spyOn(service, 'findOne').mockImplementation(() => Promise.resolve(result));
      expect(await controller.findOne(result[0].seller)).toBe(result);
    });

    it('should create a transaction', async () => {
      jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve(result[0]));
      expect(await controller.create(new CreateTransactionDto())).toBe(result[0]);
    });

    it('should update a transaction', async () => {
      jest.spyOn(service, 'update').mockImplementation(() => Promise.resolve(result[0] as any));
      expect(await controller.update(result[0].seller, new UpdateTransactionDto())).toBe(result[0]);
    });

    it('should delete a transaction', async () => {
      jest.spyOn(service, 'remove').mockImplementation(() => Promise.resolve(result[0]));
      expect(await controller.remove(result[0].seller)).toBe(result[0]);
    });
  });
});

