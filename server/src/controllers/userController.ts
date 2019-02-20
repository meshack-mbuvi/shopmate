import { Request, Response } from "express";

import { User } from "../entity/User";
import { Validator } from "../validation/validator";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export class UserController {
  UserRepository: any;
  validator: any;

  constructor(connection: any) {
    this.UserRepository = connection.getRepository(User);
    this.validator = new Validator();
  }

  public async all(req: Request, res: Response) {
    let results = await this.UserRepository.find();
    return res.send(results);
  }

  public async one(req: Request, res: Response) {
    let results = await this.UserRepository.findOne(req.params.id);

    if (!results) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.send(results);
  }

  public async login(req: Request, res: Response) {
    const { password, email } = req.body;

    const user = await this.UserRepository.findOne(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      user.token = token;
      delete user.password;
      return res.status(200).send({ user });
    } else {
      return res.status(401).send({ message: "Wrong password or email!" });
    }
  }

  public async save(req: Request, res: Response) {
    try {
      const {
        name,
        email,
        password,
        credit_card,
        address_1,
        address_2,
        city,
        region,
        postal_code,
        country,
        shipping_region_id,
        day_phone,
        eve_phone,
        mob_phone
      } = req.body;

      const data_to_validate = {
        name: name,
        email: email,
        password: password,
        credit_card: credit_card,
        address_1: address_1,
        address_2: address_2,
        city: city,
        region: region,
        postal_code: postal_code,
        country: country,
        shipping_region_id: shipping_region_id,
        day_phone: day_phone,
        eve_phone: eve_phone,
        mob_phone: mob_phone
      };

      let valid = this.validator.validate(data_to_validate);
      if (!valid) {
        return res.status(400).send({ message: "Input data should not be empty" });
      }
      const user = await new User();

      const passwordHash = bcrypt.hashSync(user.password, 10);

      user.name = name;
      user.email = email;
      user.credit_card = credit_card;
      user.password = passwordHash;
      user.address_1 = address_1;
      user.address_2 = address_2;
      user.city = city;
      user.region = region;
      user.postal_code = postal_code;
      user.country = country;
      user.shipping_region_id = shipping_region_id;
      user.day_phone = day_phone;
      user.eve_phone = eve_phone;
      user.mob_phone = mob_phone;

      let results = await this.UserRepository.save(user);
      delete results.password;

      return res.status(201).send(results);
    } catch (error) {
      return res.status(409).send({
        message: "A user with provided details already exist"
      });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { first_name, last_name, type, phone } = req.body;
      const data_to_validate = {
        first_name: first_name,
        last_name: last_name,
        type: type,
        phone: phone
      };

      let user = await this.UserRepository.findOne(req.params.id);

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      let valid = this.validator.validate(data_to_validate);

      if (!valid) {
        return res.status(400).send({ message: "Input data should not be empty" });
      }

      if (type === "voter" || type === "candidate" || type === "admin") {
        user.type = type;
      } else {
        user.type = "voter";
      }

      user.first_name = first_name;
      user.last_name = last_name;
      user.phone = phone;

      let results = await this.UserRepository.save(user);

      return res.status(200).send(results);
    } catch (error) {
      return res.status(409).send({
        message: "A user with provided details already exist"
      });
    }
  }
}
