import { Tables } from "src/tables/entities/table.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    reservation_date: Date;

    @Column()
    reservation_name: string;

    @ManyToOne(() => Tables, (table) => table.reservations)
    table: Tables;
}
