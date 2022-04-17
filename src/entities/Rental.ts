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

  @Column()
  returnedCarDate: Date;

  @Column({ default: false })
  returnedCar: boolean;

  @Column({ type: 'float', scale: 2 })
  rentalPricePerDay: number;

  @Column({ type: 'float', scale: 2 })
  rentalPricePreview: number;

  @Column({ type: 'float', scale: 2, default: 0.0 })
  rentalPriceTotal: number;

  @Column({ type: 'float', scale: 2, default: 0.0 })
  mileageRan: number;

  @ManyToOne(() => User, (user) => user.rentals)
  user: User;

  @ManyToOne(() => Car, (car) => car.rentals)
  car: Car;
}
