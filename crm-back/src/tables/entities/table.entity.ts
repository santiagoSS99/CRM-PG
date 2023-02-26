import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "src/reservations/entities/reservation.entity";
import { Order } from "src/orders/entities/order.entity";
import { TableStatus } from "../enumTables/tableStatus";

@Entity()
export class Tables {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    table_number: number;

    @Column('int')
    table_capacity: number;

    @Column({ type: 'enum', enum: TableStatus, default: TableStatus.AVAILABLE })
    table_status: string;

    @Column('text')
    table_location: string;

    @OneToMany(() => Reservation, (reservation) => reservation.table)
    reservations: Reservation[];

    @OneToMany(() => Order, (order) => order.table)
    orders: Order[];

}



