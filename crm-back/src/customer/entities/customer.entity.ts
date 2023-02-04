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

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        default: 'profile.png',
    })
    profile: string;

    @Column()
    t_number: string;

    @Column()
    gender: string;

    @Column()
    f_birthday: string;

    @Column()
    identification: string;

}
