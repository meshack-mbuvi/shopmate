import { Category } from "./Category";
import { AttributeValue } from "./Attribute";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", nullable: false, length: 100, unique: true })
  name: string;

  @Column({ type: "text", nullable: false })
  description: string;

  @Column({ type: "decimal", nullable: false })
  price: number;

  @Column({ type: "decimal", default: 0.0, name: "discounted_price" })
  discountedPrice: number;

  @Column()
  image: string;

  @Column()
  image_2: string;

  @Column()
  thumbnail: string;

  @Column({ nullable: false, default: 0 })
  display: number;

  @OneToMany(type => AttributeValue, attribute => attribute.value)
  attributes: AttributeValue[];

  @ManyToMany(type => Category)
  @JoinTable({
    name: "product_category",
    joinColumns: [
      {
        name: "product_id",
        referencedColumnName: "id"
      }
    ],
    inverseJoinColumns: [
      {
        name: "category_id",
        referencedColumnName: "id"
      }
    ]
  })
  category: Category;
}
