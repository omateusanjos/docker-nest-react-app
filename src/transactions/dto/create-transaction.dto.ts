import { IsNotEmpty, IsDate, IsString, IsNumber } from 'class-validator';

export class Transation {
  @IsNotEmpty({
    message: 'Date is required',
  })
  @IsDate({
    message: 'Date is need to be a valid date, like 2020-01-01',
  })
  date: Date;

  id: number;

  @IsNotEmpty({
    message: 'Product is required',
  })
  @IsString({
    message: 'Product must be a string',
  })
  product: string;

  @IsNotEmpty({
    message: 'Seller is required',
  })
  @IsString({
    message: 'Seller must be a string',
  })
  seller: string;

  @IsNotEmpty({
    message: 'Type is required',
  })
  @IsNumber()
  type: number;

  @IsNotEmpty({
    message: 'Value is required',
  })
  @IsNumber()
  value: number;
}
export class CreateTransactionDto {

  @IsNotEmpty()
  file: Transation[];
}
