import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderStatus {
    @PrimaryGeneratedColumn()
    id: string;

    @Column('text')
    name: string;
}
