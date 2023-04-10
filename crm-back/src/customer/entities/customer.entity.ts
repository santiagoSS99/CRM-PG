import { profile } from "console";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column()
    surnames: string;

    @Column({default: 'CO'})
    country: string;

    @Column('varchar', { length: 200 })
    email: string;

    @Column()
    t_number: string;

    @Column({default: "3"})
    gender: string;

    @Column()
    f_birthday: string;

    @Column()
    notifications: boolean;

}
