import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Address } from './Address';

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

  @Column({ unique: true, length: 14 })
  cpf: string;

  @Column({ unique: true, length: 18 })
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
}
