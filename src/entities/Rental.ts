import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Car } from './Car';
import { User } from './User';

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rentalStartDate: Date;

  @Column()
  rentalReturnDate: Date;

  @Column({ nullable: true })
  returnedCarDate: Date;

  @Column({ default: false })
  returnedCar: boolean;

  @Column({ type: 'float' })
  rentalPricePerDay: number;

  @Column({ type: 'float' })
  rentalPricePreview: number;

  @Column({ type: 'float', default: 0.0 })
  rentalPriceTotal: number;

  @Column({ type: 'float', default: 0.0 })
  mileageRan: number;

  @ManyToOne(() => User, (customer) => customer.rentals)
  customer: User;

  @ManyToOne(() => Car, (car) => car.rentals)
  car: Car;
}
