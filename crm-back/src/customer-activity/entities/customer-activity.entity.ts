import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CustomerActivity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    type: string

    @Column()
    activity: string

    @Column()
    assesor: string

    @Column()
    customer: string

    @CreateDateColumn({
        name: 'created_date',
        nullable: false,
        type: 'timestamp',
    })
    created_date: Date;
}
