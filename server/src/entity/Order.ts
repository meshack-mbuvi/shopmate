import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity({ engine: "MyISAM" })
export class Order {
  @PrimaryGeneratedColumn({ name: "order_id" })
  orderId: number;

  @Column({ name: "shipping_id", type: "int" })
  shippingId: number;

  @Column({ type: "double", name: "total_amount", default: 0.0, nullable: false })
  totalAmount: number;

  @Column({ nullable: false, type: "datetime", name: "created_on" })
  createdOn: Date;

  @Column({ nullable: false, type: "datetime", name: "shipped_on" })
  shippedOn: Date;

  @Column({ type: "int", nullable: false, default: 0 })
  status: number;

  @Column("text")
  comments: string;

  @Column({ name: "auth_code", length: 50 })
  authCode: string;

  @Column({ length: 50 })
  reference: string;

  @Column({ name: "tax_id", type: "int" })
  taxId: number;

  @OneToOne(type => User, user => user.name, { nullable: false })
  customer: User;
}

@Entity({ engine: "MyISAM", name: "order_details" })
export class OrderDetail {
  @PrimaryGeneratedColumn({ type: "int", name: "item_id" })
  itemId: number;

  @OneToOne(type => Order, order => order.customer, { nullable: false })
  orderId: Order;

  @Column({ name: "product_id", type: "int", nullable: false })
  productId: number;

  @Column({ type: "text", nullable: false })
  attributes: string;

  @OneToOne(type => Product, product => product.name, { nullable: false })
  product: Product;

  @Column({ type: "int", nullable: false })
  quantity: number;

  @OneToOne(type => Product, product => product.price, { nullable: false })
  @JoinColumn({ name: "unit_cost", referencedColumnName: "price" })
  unitCost: number;
}
