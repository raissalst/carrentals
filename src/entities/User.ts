import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Address } from './Address';
import { Car } from './Car';
import { Rental } from './Rental';

export type UserTypeOptions = 'admin' | 'cliente' | 'empresa';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true, length: 14, nullable: true })
  cpf: string;

  @Column({ unique: true, length: 18, nullable: true })
  cnpj: string;

  @Column()
  phone: string;

  @Column({ type: 'enum', enum: ['admin', 'cliente', 'empresa'] })
  userType: UserTypeOptions;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne((type) => Address)
  @JoinColumn()
  address: Address;

  @OneToMany(() => Car, (cars) => cars.company)
  cars: Car[];

  @OneToMany(() => Rental, (rentals) => rentals.customer)
  rentals: Rental[];
}
