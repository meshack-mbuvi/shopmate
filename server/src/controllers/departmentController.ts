import { Validator } from "./../validation/validator";
import { Department } from "./../entity/Department";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

export class DepartmentController {
  private departmentRepository: any;
  private validator: any;

  constructor() {
    this.departmentRepository = getRepository(Department);
    this.validator = new Validator();
  }

  public async save(req: Request, res: Response) {
    const { name, description } = req.body;

    const dataToValidate = {
      name: name,
      description: description
    };

    const valid = this.validator.validate(dataToValidate);

    if (!valid) {
      const message = "Please provide department name and description";
      return res.status(400).send({ message: message });
    }

    const departmentExists = await this.departmentRepository.findOne({ name });
    if (departmentExists) {
      const message = "Department with given name already exists";
      return res.status(409).send({ message: message });
    }

    const department = await new Department();
    department.name = name;
    department.description = description;

    try {
      const results = await this.departmentRepository.save(department);

      return res.status(201).send(results);
    } catch (error) {
      return res.send(error);
    }
  }

  public async update(req: Request, res: Response) {
    const valid = this.validator.validate(req.body);

    if (!valid) {
      const message = "Please provide department name, description or both";
      return res.status(400).send({ message: message });
    }

    try {
      const { name, description } = req.body;
      const departmentExists = await this.departmentRepository.findOne({ name });

      if (departmentExists) {
        const message = "Department with given name already exists";
        return res.status(409).send({ message: message });
      }

      const department = await this.departmentRepository.findOne(req.params.id);

      department.name = name || department.name;
      department.description = description || description.name;

      return await this.departmentRepository.save(department);
    } catch (error) {
      const message = "Department with given name already exists";
      return res.status(409).send({ message: message });
    }
  }

  public async all(req: Request, res: Response) {
    try {
      const results = await this.departmentRepository.find({ relations: ["categories"] });
      return res.send(results);
    } catch (error) {
      return res.send(error);
    }
  }

  public async one(req: Request, res: Response) {
    try {
      const results = await this.departmentRepository.findOne(req.params.id, { relations: ["categories"] });

      if (!results) {
        const message = "Department with provided id not found";
        return res.status(404).send({ message: message });
      }

      return res.send(results);
    } catch (error) {
      return res.send(error);
    }
  }

  public async search(value: any) {
    try {
      const results = await this.departmentRepository.findOne({ value });
      return results;
    } catch (error) {
      throw error;
    }
  }
}
