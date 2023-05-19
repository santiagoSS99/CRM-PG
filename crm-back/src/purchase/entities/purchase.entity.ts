import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "src/customer/entities/customer.entity";
import { Product } from "src/products/entities";

@Entity()
export class Purchase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    purchase_date: string;

    @Column()
    quantity: number;

    @ManyToOne(() => Product, (product) => product.purchases)
    product: Product;

    @ManyToOne(() => Customer, (customer) => customer.purchases)
    customer: Customer;

    @Column()
    total: number;

    @Column()
    paymentMethod: string;
}
