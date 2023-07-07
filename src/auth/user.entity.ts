import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() //TODO: use @PrimaryGeneratedColumn('uuid') and change number to string
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
