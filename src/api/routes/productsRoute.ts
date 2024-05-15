import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../modules/product-adm/factory/facade.factory";
import { AddProductFacadeInputDto } from "../../modules/product-adm/facade/dto/add-product-adm.dto";

export const productsRoute = express.Router();

productsRoute.post("/", async (req: Request, res: Response) => {
  const facade = ProductAdmFacadeFactory.create();

  try {
    const input: AddProductFacadeInputDto = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      stock: req.body.stock,
    };

    const output = await facade.addProduct(input);
    res.status(201).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});