import express, { Request, Response } from "express";
import { FindInvoiceFacadeInputDto } from "../../modules/invoice/facade/invoice.facade.interface";
import InvoiceFacadeFactory from "../../modules/invoice/factory/invoice.facade.factory";

export const invoiceRoute = express.Router();

invoiceRoute.get("/:id", async (req: Request, res: Response) => {
  const facade = InvoiceFacadeFactory.create();

  try {
    const input: FindInvoiceFacadeInputDto = {
      id: req.params.id,
    };

    const output = await facade.find(input);

    res.status(201).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});