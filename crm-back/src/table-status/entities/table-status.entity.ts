import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
// import v4 as uuid from 'uuid'

@Entity()
export class TableStatus {

    @PrimaryGeneratedColumn()
    id: string;

    @Column('text')
    name: string;
}
