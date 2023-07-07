import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('user')
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() //TODO: use @PrimaryGeneratedColumn('uuid') and change number to string
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;
}
