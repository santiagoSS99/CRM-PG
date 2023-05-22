import { Purchase } from "src/purchase/entities/purchase.entity";
import { TableStatus } from "src/table-status/entities/table-status.entity";
import { Tables } from "src/tables/entities/table.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sale {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Tables)
    table: Tables

    @ManyToOne(() => TableStatus)
    tableStatus: TableStatus

    @ManyToOne(() => Purchase)
    purchase: Purchase

}
