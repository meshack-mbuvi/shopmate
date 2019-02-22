import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Category } from "./Category";

@Entity({ engine: "MyISAM" })
export class Department {
  @PrimaryGeneratedColumn({ name: "department_id" })
  id: number;

  @Column({ type: "text", nullable: false })
  name: string;

  @Column("text")
  description: string;

  @ManyToMany(type => Category, category => category.name)
  categories: Category[];
}
