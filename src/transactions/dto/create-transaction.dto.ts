import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDate, IsString, IsNumber } from 'class-validator';

export class Transation {
  @IsNotEmpty({
    message: 'Date is required',
  })
  @IsDate({
    message: 'Date is need to be a valid date, like 2020-01-01',
  })
  @ApiProperty({
    description: 'Date of the transaction',
    example: '2020-01-01',
  })
  date: Date;

  id: number;

  @IsNotEmpty({
    message: 'Product is required',
  })
  @IsString({
    message: 'Product must be a string',
  })
  @ApiProperty({
    description: 'Product of the transaction',
    example: 'Varinha',
  })

  product: string;

  @IsNotEmpty({
    message: 'Seller is required',
  })
  @IsString({
    message: 'Seller must be a string',
  })
  @ApiProperty({
    description: 'Seller of the transaction',
    example: 'HarryPotter',
  })

  seller: string;

  @IsNotEmpty({
    message: 'Type is required',
  })
  @IsNumber()
  @ApiProperty({
    description: 'Type of the transaction. ',
    example: '1',
  })

  type: number;

  @IsNotEmpty({
    message: 'Value is required',
  })
  @IsNumber()
  @ApiProperty({
    description: 'Value of the transaction',
    example: '1000',
  })
  
  value: number;
}
export class CreateTransactionDto {

  @IsNotEmpty()
  file: Transation[];
}
