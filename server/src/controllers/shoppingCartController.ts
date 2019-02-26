import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ShoppingCart } from "./../entity/ShoppingCart";

export class ShoppingCartController {
  private cartRepository: any;

  constructor() {
    this.cartRepository = getRepository(ShoppingCart);
  }

  public async save(req: Request, res: Response) {
    const { cardId, product, attributes, quantity } = req.body;

    try {
      const shoppingCart = await new ShoppingCart();

      shoppingCart.cardId = cardId;
      shoppingCart.product = product;
      shoppingCart.attributes = attributes;
      shoppingCart.quantity = quantity;

      return res.status(201).send(await this.cartRepository.save(shoppingCart));
    } catch (error) {
      return res.send(error);
    }
  }
}
