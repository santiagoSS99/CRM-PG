import { Order } from "src/orders/entities/order.entity";
import { Reservation } from "src/reservations/entities/reservation.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tables {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    table_number: number;

    @Column('int')
    table_capacity: number;

    @Column()
    table_status: string;

    @Column('text')
    table_location: string;

    @OneToMany(() => Reservation, (reservation) => reservation.table)
    reservations: Reservation[];

    @OneToMany(() => Order, (order) => order.table)
    orders: Order[];
}



