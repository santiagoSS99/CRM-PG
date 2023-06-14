import { IsArray } from "class-validator";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("varchar", { length: 200 })
    email: string;

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

    @Column('simple-array',{nullable: true})
    roles: string[];

    @BeforeInsert()
    checkFieldBeforeInsert() {
        this.email = this.email.toLowerCase().trim()
    }

    @BeforeInsert()
    checkFieldBeforeUpdate() {
        // this.email = this.email.toLowerCase().trim()
        this.checkFieldBeforeInsert()
    }


}
