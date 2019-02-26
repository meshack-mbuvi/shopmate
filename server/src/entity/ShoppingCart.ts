import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./Product";

@Entity({ engine: "MyISAM", name: "shopping_cart" })
export class ShoppingCart {
  @PrimaryGeneratedColumn({ name: "item_id" })
  itemId: number;

  @Column({ length: 32, nullable: false, name: "card_id" })
  cardId: string;

  @OneToMany(type => Product, product => product.name)
  product: Product;

  @Column({ type: "text", nullable: false })
  attributes: string;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false, default: true, name: "buy_now" })
  buyNow: boolean;

  @Column({ nullable: false, type: "timestamp", name: "added_on" })
  addedOn: Date;
}
