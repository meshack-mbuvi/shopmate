import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column("text")
  password: string;

  @Column({ name: "credit_card", length: 15, unique: true })
  creditCard: string;

  @Column("text")
  address_1: string;

  @Column("text")
  address_2: string;

  @Column("text")
  city: number;

  @Column()
  region: string;

  @Column()
  postal_code: string;

  @Column()
  country: string;

  @Column({ default: 1 })
  shipping_region_id: string;

  @Column()
  day_phone: string;

  @Column()
  eve_phone: string;

  @Column()
  mob_phone: string;

  @Column({ name: "is_admin", default: false })
  isAdmin: boolean;
}
