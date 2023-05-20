import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "src/reservations/entities/reservation.entity";
import { Order } from "src/orders/entities/order.entity";
import { TableStatus } from "src/table-status/entities/table-status.entity";

@Entity()
export class Tables {
    @PrimaryGeneratedColumn('increment')
    id: string

    @Column()
    table_number: number;

    @Column('int')
    table_capacity: number;

    @ManyToOne(() => TableStatus, { eager: true })
    @JoinColumn({ name: 'table_status_code' })
    table_status: TableStatus;

    @Column('text')
    table_location: string;

    @OneToMany(() => Reservation, (reservation) => reservation.table)
    reservations: Reservation[];

    @OneToMany(() => Order, (order) => order.table)
    orders: Order[];

}



