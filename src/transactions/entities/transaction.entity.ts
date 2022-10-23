import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    product: string;

    @Column()
    seller: string;

    @Column()
    type: number;

    @Column()
    value: number;
}
