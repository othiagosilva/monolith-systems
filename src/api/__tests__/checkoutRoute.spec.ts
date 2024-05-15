import request from "supertest";
import { Umzug } from "umzug";
import { migrator } from "../../test-migrations/config/migrator";
import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { checkoutRoute } from "../routes/checkoutRoute";
import OrderModel from "../../modules/checkout/repository/sequelize/order.model";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import ProductCheckoutModel from "../../modules/checkout/repository/sequelize/product.model";
import TransactionModel from "../../modules/payment/repository/transaction.model";
import { InvoiceModel } from "../../modules/invoice/repository/invoice.model";
import ProductStoreModel from "../../modules/store-catalog/repository/product.model";
import { InvoiceItemsModel } from "../../modules/invoice/repository/invoice-items.model";

describe("API /checkout e2e tests", () => {
  const app: Express = express();
  app.use(express.json());
  app.use("/checkout", checkoutRoute);

  let sequelize: Sequelize;

  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    sequelize.addModels([
      OrderModel,
      ClientModel,
      ProductModel,
      ProductCheckoutModel,
      ProductStoreModel,
      TransactionModel,
      InvoiceModel,
      InvoiceItemsModel,
    ]);
    migration = migrator(sequelize);
    await migration.up();
    // await sequelize.sync();
  });

  afterEach(async () => {
    if (!migration || !sequelize) {
      return;
    }
    migration = migrator(sequelize);
    await migration.down();
    // await sequelize.close();
  });

  it("should do the checkout", async () => {
    await ClientModel.create({
      id: "1",
      name: "Client 1",
      email: "Client 1 description",
      street: "street 1",
      number: "1",
      complement: "complement 1",
      city: "city 1",
      state: "state 1",
      zipcode: "zipCode 1",
      document: "document 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      salesPrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await ProductModel.create({
      id: "2",
      name: "Product 2",
      description: "Product 2 description",
      purchasePrice: 200,
      salesPrice: 200,
      stock: 20,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await OrderModel.create({
      id: "1",
      status: "approved",
      clientId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app)
      .post("/checkout")
      .send({
        clientId: "1",
        products: [{ productId: "1" }, { productId: "2" }],
      });

    expect(response.status).toEqual(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.invoiceId).toBeDefined();
    expect(response.body.total).toEqual(300);
    expect(response.body.status).toEqual("approved");
  });
});