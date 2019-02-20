import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity({ engine: "MyISAM" })
export class Department {
  @PrimaryGeneratedColumn()
  department_id: number;

  @Column({ type: "text", nullable: false })
  name: string;

  @Column("text")
  description: string;
}

@Entity({ engine: "MyISAM" })
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({ nullable: false })
  department_id: number;

  @Column({ type: "text", nullable: false })
  name: string;

  @Column({ type: "text" })
  description: string;
}

@Entity({ engine: "MyISAM" })
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column({ type: "text", nullable: false })
  name: string;

  @Column({ type: "text", nullable: false })
  description: string;

  @Column({ type: "decimal", nullable: false })
  price: number;

  @Column({ type: "decimal", default: 0.0 })
  discounted_price: number;

  @Column()
  image: string;

  @Column()
  image_2: string;

  @Column()
  thumbnail: string;

  @Column({ nullable: false, default: 0 })
  display: number;
}

@Entity({ engine: "MyISAM", name: "product_category" })
export class ProductCategory {
  @PrimaryColumn()
  product_id: number;

  @PrimaryColumn()
  category_id: number;
}

@Entity({ engine: "MyISAM" })
export class Attribute {
  @PrimaryGeneratedColumn()
  attribute_id: number;

  @Column("text")
  name: string; //E.g Color, Size
}

// stores values such as Yellow or XXL
@Entity({ engine: "MyISAM", name: "attribute_value" })
export class AttributeValue {
  @PrimaryGeneratedColumn()
  attribute_value_id: string;

  @PrimaryColumn({ nullable: false })
  attribute_id: number; // The ID of the attribute

  @Column({ nullable: false })
  value: string; //E.g Yellow
}

@Entity({ engine: "MyISAM", name: "product_attribute" })
export class ProductAttribute {
  @PrimaryColumn()
  product_id: number;

  @PrimaryColumn()
  attribute_value_id: number;
}

@Entity({ engine: "MyISAM", name: "shopping_cart" })
export class ShoppingCart {
  @PrimaryGeneratedColumn()
  item_id: number;

  @Column({ length: 32, nullable: false })
  cart_id: string;

  @Column({ nullable: false })
  product_id: number;

  @Column({ type: "text", nullable: false })
  attributes: string;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false, default: true })
  buy_now: boolean;

  @Column({ nullable: false, type: "datetime" })
  added_on: Date;
}

@Entity({ engine: "MyISAM" })
export class Orders {
  @PrimaryGeneratedColumn()
  order_id: number;

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

  @PrimaryColumn({ name: "customer_id" })
  customerId: number;

  @Column({ name: "auth_code", length: 50 })
  authCode: string;

  @Column({ length: 50 })
  reference: string;

  @Column({ name: "shipping_id", type: "int" })
  shippingId: number;

  @Column({ name: "tax_id", type: "int" })
  taxId: number;
}

@Entity({ engine: "MyISAM", name: "order_details" })
export class OrderDetail {
  @PrimaryGeneratedColumn({ type: "int", name: "item_id" })
  itemId: number;

  @Column({ name: "order_id", type: "int", nullable: false })
  orderId: number;

  @Column({ name: "product_id", type: "int", nullable: false })
  productId: number;

  @Column({ type: "text", nullable: false })
  attributes: string;

  @Column({ name: "product_name", nullable: false, type: "text" })
  productName: string;

  @Column({ type: "int", nullable: false })
  quantity: number;

  @Column({ name: "unit_cost", nullable: false, type: "double" })
  unitCost: number;
}
