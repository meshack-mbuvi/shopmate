import { getRepository } from "typeorm";
import { Validator } from "./../validation/validator";
import { Category } from "./../entity/Category";
import { Response, Request } from "express";

export class CategoryController {
  private categoryRepository: any;
  private validator: any;

  constructor() {
    this.categoryRepository = getRepository(Category);
    this.validator = new Validator();
  }

  public async save(req: Request, res: Response) {
    const { name, description, department } = req.body;

    const dataToValidate = {
      name: name,
      description: description
    };

    const valid = this.validator.validate(dataToValidate);

    if (!valid) {
      const message = "Please provide category name and description";
      return res.status(400).send({ message: message });
    }

    try {
      const category = await new Category();

      const categoryExist = await this.categoryRepository.findOne({ name });

      if (categoryExist) {
        const message = "A category with given name already exists";
        return res.status(409).send({ message: message });
      }

      category.department = department;
      category.name = name;
      category.description = description;

      return res.status(201).send(await this.categoryRepository.save(category));
    } catch (error) {
      return res.send(error);
    }
  }

  public async update(req: Request, res: Response) {
    const { name, description } = req.body;

    const dataToValidate = {
      name: name || "",
      description: description || ""
    };

    const valid = this.validator.validate(dataToValidate);

    if (!valid) {
      const message = "Please provide category name and description";
      return res.status(400).send({ message: message });
    }

    try {
      const category = await this.categoryRepository.findOne(req.params.id);

      if (!category) {
        const message = "Category with given id does not exist";
        return res.status(404).send({ message: message });
      }

      if (category.name === name) {
        const message = "A category with given name already exists";
        return res.status(409).send({ message: message });
      }

      category.name = name || category.name;
      category.description = description || category.description;

      return res.send(await this.categoryRepository.save(category));
    } catch (error) {
      return res.send(error);
    }
  }

  public async all(req: Request, res: Response) {
    try {
      const results = await this.categoryRepository.find({ relations: ["department"] });
      return res.send(results);
    } catch (error) {
      return res.send(error);
    }
  }

  public async one(req: Request, res: Response) {
    try {
      const results = await this.categoryRepository.findOne(req.params.id, { relations: ["department"] });

      if (results) {
        return res.send(results);
      }

      const message = "No category found with provided id";
      return res.status(404).send({ message: message });
    } catch (error) {
      return res.send(error);
    }
  }
}
