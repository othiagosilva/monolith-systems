import request from "supertest";
import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { invoiceRoute } from "../routes/invoiceRoute";
import { InvoiceModel } from "../../modules/invoice/repository/invoice.model";
import { InvoiceItemsModel } from "../../modules/invoice/repository/invoice-items.model";
import InvoiceFacadeFactory from "../../modules/invoice/factory/invoice.facade.factory";

describe("API /invoice e2e tests", () => {
  const app: Express = express();
  app.use(express.json());
  app.use("/invoice", invoiceRoute);

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find an invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const invoiceInput = {
      id: "1",
      name: "Invoice 1",
      document: "123456",
      street: "street",
      number: "number",
      complement: "complement",
      city: "city",
      state: "state",
      zipCode: "123456",
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 100,
        },
        {
          id: "2",
          name: "Product 2",
          price: 200,
        },
      ],
    };

    const invoiceCreated = await facade.generate(invoiceInput);

    const response = await request(app).get(`/invoice/${invoiceCreated.id}`);

    expect(response.body.id).toEqual(invoiceCreated.id);
    expect(response.body.name).toEqual(invoiceCreated.name);
    expect(response.body.document).toEqual(invoiceCreated.document);

    expect(response.body.items[0].id).toEqual(invoiceCreated.items[0].id);
    expect(response.body.items[0].name).toEqual(invoiceCreated.items[0].name);
    expect(response.body.items[0].price).toEqual(invoiceCreated.items[0].price);

    expect(response.body.items[1].id).toEqual(invoiceCreated.items[1].id);
    expect(response.body.items[1].name).toEqual(invoiceCreated.items[1].name);
    expect(response.body.items[1].price).toEqual(invoiceCreated.items[1].price);

    expect(response.body.street).toBe(invoiceCreated.street);
    expect(response.body.number).toBe(invoiceCreated.number);
    expect(response.body.city).toBe(invoiceCreated.city);
    expect(response.body.state).toBe(invoiceCreated.state);
    expect(response.body.complement).toBe(invoiceCreated.complement);
  });
});