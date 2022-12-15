import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    product_name: string;

    @Column('numeric', {
        default: 0
    })
    price: number;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column('int', {
        default: 0
    })
    stock: number;

    @Column()
    imageURL: string;

    @Column()
    provider: string;

    @Column()
    barcode: string;

    @Column()
    updatedAt?: number;

    @Column()
    createdAt: number;
}
