import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import { ProductImage } from './';
import { PurchaseLine } from '../../purchase-line/entities/purchase-line.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    product_name: string;

    @Column('int')
    purchaseprice: number;

    @Column('int')
    price: number;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column('int', {
        default: 0
    })
    stock: number;

    @Column({ type: 'char', length: 100, unique: true })
    slug: string;

    @Column()
    provider: string;

    @Column('int')
    selled: number;

    @CreateDateColumn({
        name: 'created_date',
        nullable: false,
        type: 'timestamp',
    })
    created_date: Date;

    @OneToMany(() => ProductImage, (productImage) => productImage.product, { cascade: true, eager: true })
    images?: ProductImage[];

    @OneToMany(() => PurchaseLine, (purchaseLine) => purchaseLine.product)
    purchaseLines: PurchaseLine[];

    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.product_name;
        }
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '');
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '');
    }
}
