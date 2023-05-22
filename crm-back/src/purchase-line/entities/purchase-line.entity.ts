import { Product } from "src/products/entities";
import { Purchase } from "src/purchase/entities/purchase.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PurchaseLine {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column()
    total: number;

    @CreateDateColumn({
        name: 'created_date',
        nullable: false,
        type: 'timestamp',
    })
    created_date: Date;

    @ManyToOne(() => Product, (product) => product.purchaseLines)
    product: Product;

    @ManyToOne(() => Purchase, (purchase) => purchase.purchaseLines)
    purchase: Purchase;
}
