import { OrderStatus } from "src/order-status/entities/order-status.entity";
import { Product } from "src/products/entities";
import { Tables } from "src/tables/entities/table.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order_date: Date;

    @Column()
    order_details: string;

    @ManyToOne(() => Product)
    product: Product

    @Column()
    quantity: number

    @Column()
    amount: number

    @Column()
    observations: string

    // @ManyToOne(() => Tables, (table) => table.orders)
    // table: Tables;
    @ManyToOne(() => Tables, { eager: true })
    table: Tables;

    // @ManyToOne(() => OrderStatus, { eager: true })
    // @JoinColumn({ name: 'order_status_code' })
    // order_status: OrderStatus;

    @ManyToOne(() => OrderStatus, { eager: true })
    @JoinColumn({ referencedColumnName: 'id' })
    order_status: OrderStatus;
}
