import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Department } from "./Department";

@Entity({ engine: "MyISAM" })
export class Category {
  @PrimaryGeneratedColumn({ name: "category_id" })
  id: number;

  @ManyToOne(type => Department, department => department.name, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "department_id" })
  department: Department;

  @Column({ type: "text", nullable: false })
  name: string;

  @Column({ type: "text" })
  description: string;
}
