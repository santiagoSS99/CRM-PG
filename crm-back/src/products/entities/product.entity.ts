import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    product_name: string;

    @Column('int')
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

    @Column('int')
    quantity: number;

    @Column()
    barcode: string;

    @Column('int')
    selled: number

    @Column()
    updatedAt?: Date;

    @CreateDateColumn()
    createdAt: Date;
}
