import { IsArray } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string

    @Column('text', {
        select: false
    })
    password: string

    @Column('text')
    fullName: string

    @Column('boolean', {
        default: true
    })
    isActive: boolean

    // @Column()
    // @IsArray()
    // roles: string[]

    @Column('simple-array', { default: "user" })
    roles: string[];


}
