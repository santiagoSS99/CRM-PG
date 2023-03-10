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

    @Column()
    country: string;

    @Column('varchar', { length: 200 })
    email: string;

    @Column()
    t_number: string;

    @Column()
    gender: string;

    @Column()
    f_birthday: string;

    @Column()
    notifications: boolean;

}
