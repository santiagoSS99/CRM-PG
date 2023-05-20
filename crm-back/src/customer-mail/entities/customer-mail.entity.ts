import { User } from "src/auth/entities/user.entity";
import { Customer } from "src/customer/entities/customer.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CustomerMail {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    subject: string

    @Column()
    content: string

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
