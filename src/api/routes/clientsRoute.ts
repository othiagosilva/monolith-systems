import express, { Request, Response } from "express";
import ClientAdmFacadeFactory from "../../modules/client-adm/factory/client-adm.facade.factory";
import { AddClientFacadeInputDto } from "../../modules/client-adm/facade/client-adm.facade.dto";

export const clientsRoute = express.Router();

clientsRoute.post("/", async (req: Request, res: Response) => {
  const facade = ClientAdmFacadeFactory.create();

  try {
    const input: AddClientFacadeInputDto = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      document: req.body.document,
      address: req.body.address,
    };

    const output = await facade.add(input);
    res.status(201).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});