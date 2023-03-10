import { Tables } from "src/tables/entities/table.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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
