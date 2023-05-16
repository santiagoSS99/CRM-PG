import { User } from "src/auth/entities/user.entity";
import { Customer } from "src/customer/entities/customer.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CustomerCall {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    date: string

    @Column()
    hour: string

    @Column()
    result: string

    @Column()
    note: string

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
