import { Tables } from "src/tables/entities/table.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order_date: Date;

    @Column()
    order_details: string;

    @ManyToOne(() => Tables, (table) => table.orders)
    table: Tables;
}
