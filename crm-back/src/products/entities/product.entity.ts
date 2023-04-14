import { Purchase } from 'src/purchase/entities/purchase.entity';
import { text } from 'stream/consumers';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, BeforeUpdate, ManyToMany, OneToMany } from 'typeorm';
import { ProductImage } from './';

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    product_name: string;

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

    // @Column('int')
    // quantity: number;

    // @Column()
    // barcode: string;

    @Column('int')
    selled: number

    // @CreateDateColumn({})
    // updatedAt?: Date;

    // @CreateDateColumn({
    // })
    // createdAt: Date;

    // @Column("json", { default: [] })
    // tags: string[];

    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];

    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.product_name
        }
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }

    @OneToMany(() => Purchase, (purchase) => purchase.product)
    purchases: Purchase[];
}
