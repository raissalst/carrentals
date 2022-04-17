import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    cpf: string;

    @Column()
    cnpj: string;

    @Column()
    phone: string;

    @Column()
    userType: string;
  
    @Column({ default: false })
    isAdmin: boolean;

    @Column({ default: true })
    isActive: boolean;

}
