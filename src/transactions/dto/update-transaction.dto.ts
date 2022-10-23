import { PartialType } from '@nestjs/swagger';
import { CreateTransactionDto } from './create-transaction.dto';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
    date: Date;
    id: number;
    product: string;
    seller: string;
    type: number;
    value: number;
}
