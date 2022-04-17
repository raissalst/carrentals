import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Rental } from './Rental';
import { User } from './User';

export type fuelTypeOptions =
  | 'flex'
  | 'hibrido'
  | 'eletrico'
  | 'gasolina'
  | 'diesel'
  | 'alcool';

export type gearTypeOptions = 'automatico' | 'manual';

export type doorsTypeOptions = 2 | 3 | 4;

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  brand: string;

  @Column()
  year: string;

  @Column()
  color: string;

  @Column({ type: 'enum', enum: [2, 3, 4] })
  doors: doorsTypeOptions;

  @Column({
    type: 'enum',
    enum: ['flex', 'hibrido', 'eletrico', 'gasolina', 'diesel', 'alcool'],
  })
  fuelType: fuelTypeOptions;

  @Column({ length: 7 })
  plate: string;

  @Column({ type: 'enum', enum: ['automatico', 'manual'] })
  gear: gearTypeOptions;

  @Column()
  chassis: string;

  @Column({ type: 'float' })
  currentMileage: number;

  @Column({ type: 'float' })
  rentalPricePerDay: number;

  @Column({ default: true })
  availableToRent: boolean;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Rental, (rentals) => rentals.car)
  rentals: Rental[];

  @ManyToOne(() => User, (company) => company.cars)
  company: User;
}
