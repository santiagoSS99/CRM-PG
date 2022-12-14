import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product_name: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @Column()
    quantity: number;

    @Column()
    imageURL: string;

    @Column()
    provider: string;

    @Column()
    barcode: string;
}