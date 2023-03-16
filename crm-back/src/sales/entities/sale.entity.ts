import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sale {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    total: number;

    @Column('json')
    products: any[];

    @Column()
    paymentMethod: string;
}
