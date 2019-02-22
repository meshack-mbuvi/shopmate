import { AttributeValue } from "./Attribute";
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Category } from "./Category";

@Entity({ engine: "MyISAM" })
export class Product {
  @PrimaryGeneratedColumn({ name: "product_id" })
  id: number;

  @ManyToOne(type => Category, category => category.name)
  @JoinColumn({ name: "category" })
  category: Category;

  @Column({ type: "text", nullable: false })
  name: string;

  @Column({ type: "text", nullable: false })
  description: string;

  @Column({ type: "decimal", nullable: false })
  price: number;

  @Column({ type: "double", default: 0.0, name: "discounted_price" })
  discountedPrice: number;

  @Column()
  image: string;

  @Column()
  image_2: string;

  @Column()
  thumbnail: string;

  @Column({ nullable: false, default: 0 })
  display: number;

  @OneToMany(
    type => AttributeValue,
    attribute => {
      attribute.attribute, attribute.value;
    }
  )
  attributes: AttributeValue[];
}
