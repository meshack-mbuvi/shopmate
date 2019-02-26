import { Product } from "./Product";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinColumn, Unique } from "typeorm";
import { Department } from "./Department";

@Entity({ engine: "MyISAM" })
@Unique(["name"])
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Department, department => department.categories, { cascade: ["insert", "update", "insert"] })
  @JoinColumn({ name: "department_id" })
  department: Department;

  @Column({ name: "name", nullable: false, length: 100, unique: true })
  name: string;

  @Column({ type: "text" })
  description: string;

  @ManyToMany(() => Product, product => product.name)
  products: Product[];
}
