import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Diary {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: string;

    @Column()
    emotion!: number;

    @Column('text')
    content!: string;
}
