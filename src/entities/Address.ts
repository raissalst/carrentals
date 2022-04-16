import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { string } from 'yup';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  country: string;
}
