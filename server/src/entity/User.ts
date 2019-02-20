import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export type UserType = "voter" | "candidate" | "admin";
export type UserId = number;

@Entity()
export class User {
  @PrimaryGeneratedColumn() customer_id: UserId;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column("text") password: string;

  @Column({ length: 15, unique: true })
  credit_card: string;

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
}
