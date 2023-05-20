import { User } from "src/auth/entities/user.entity";
import { Customer } from "src/customer/entities/customer.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";

@Entity()
export class CustomerInterest {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    date: string

    @Column()
    note: string

    @Column()
    type: string

    @Column()
    level: string

    @Column()
    cycle: string

    @ManyToOne(() => User)
    assesor: User

    @ManyToOne(() => Customer)
    customer: Customer

    @CreateDateColumn({
        name: 'created_date',
        nullable: false,
        type: 'timestamp',
    })
    created_date: Date;

}
