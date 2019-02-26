import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Product } from "../entity/Product";

export class ProductController {
  private productRepository: any;
  private validator: any;

  constructor() {
    this.productRepository = getRepository(Product);
  }

  public async save(req: Request, res: Response) {
    const { name, description, price, discounted_price, image, image_2, thumbnail, display, category } = req.body;

    try {
      const dataToValidate = {
        name: name || "",
        description: description || ""
      };

      const valid = this.validator.validate(dataToValidate);

      if (!valid) {
        const message = "Please provide category name and description";
        return res.status(400).send({ message: message });
      }
      const productExists = await this.productRepository.findOne({ name });

      if (productExists) {
        const message = "A product with given name already exists";
        return res.status(409).send({ message: message });
      }

      const product = await new Product();

      product.name = name;
      product.description = description;
      product.price = price;
      product.discountedPrice = discounted_price || 0;
      product.image = image;
      product.image_2 = image_2;
      product.thumbnail = thumbnail;
      product.display = display;
      product.category = category;

      const result = await this.productRepository.save(product);

      return res.status(201).send(result);
    } catch (error) {
      return res.send(error);
    }
  }
}
