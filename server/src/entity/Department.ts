import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", nullable: false, length: 100, unique: true })
  name: string;

  @Column("text")
  description: string;

  @OneToMany(type => Category, category => category.department)
  categories: Category[];
}
