import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

@Entity({ engine: "MyISAM" })
export class Attribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string; //E.g Color, Size
}

// stores values such as Yellow or XXL
@Entity({ engine: "MyISAM", name: "attribute_value" })
export class AttributeValue {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(type => Attribute, attribute => attribute.name, { nullable: false })
  attribute: Attribute; // The ID of the attribute

  @Column({ nullable: false })
  value: string; //E.g Yellow
}
