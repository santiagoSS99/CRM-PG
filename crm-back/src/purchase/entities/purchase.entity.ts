import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "src/customer/entities/customer.entity";
import { PurchaseLine } from "../../purchase-line/entities/purchase-line.entity"
import { PayMethod } from "src/enums/paymenMethod";
@Entity()
export class Purchase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    purchase_date: string;

    @OneToMany(() => PurchaseLine, (purchaseLine) => purchaseLine.purchase)
    purchaseLines: PurchaseLine[];

    @ManyToOne(() => Customer, (customer) => customer.purchases)
    customer: Customer;

    @Column()
    customerId: number;

    @Column()
    paymentMethod: string;

    @CreateDateColumn({
        name: 'created_date',
        nullable: false,
        type: 'timestamp',
    })
    created_date: Date;

    @Column({ default: new Date().getFullYear() })
    year: number;
}
