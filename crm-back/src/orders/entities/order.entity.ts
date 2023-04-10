import { Tables } from "src/tables/entities/table.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order_date: Date;

    @Column()
    order_details: string;

    @Column()
    quantity: number

    @Column()
    amount: number

    @Column()
    observations: string

    @ManyToOne(() => Tables, (table) => table.orders)
    table: Tables;
}
