
export class Transation {
    date: Date;
    id: number;
    product: string;
    seller: string;
    type: number;
    value: number;
}
export class CreateTransactionDto {
    file: Transation[];
}
