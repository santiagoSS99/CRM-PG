import { profile } from "console";
import { Purchase } from "src/purchase/entities/purchase.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column()
    surnames: string;

    @Column({ default: 'CO' })
    country: string;

    @Column('varchar', { length: 200 })
    email: string;

    @Column()
    t_number: string;

    @Column({ default: "3" })
    gender: string;

    @Column()
    f_birthday: string;

    @Column({ default: "prospect" })
    type: string

    @Column()
    notifications: boolean;

    @Column({ default: false })
    verify: boolean

    @OneToMany(() => Purchase, (purchase) => purchase.customer)
    purchases: Purchase;

}
