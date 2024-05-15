import request from "supertest";
import { Umzug } from "umzug";
import { migrator } from "../../test-migrations/config/migrator";
import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { checkoutRoute } from "../routes/checkoutRoute";
import OrderModel from "../../modules/checkout/repository/sequelize/order.model";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import ProductModel from "../../modules/checkout/repository/sequelize/product.model";
import {ProductModel as ProductAdmModel} from "../../modules/product-adm/repository/product.model";
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

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    sequelize.addModels([
      OrderModel,
      ClientModel,
      ProductModel,
      ProductAdmModel,
      ProductStoreModel,
      TransactionModel,
      InvoiceModel,
      InvoiceItemsModel,
    ]);
    migration = migrator(sequelize);
    await migration.up();
  });

  afterAll(async () => {
    if (!migration || !sequelize) {
      return;
    }
    migration = migrator(sequelize);
    await migration.down();
  });

  it("should do the checkout", async () => {
    const response = await request(app)
      .post("/checkout")
      .send({
        clientId: "1",
        products: [
          {
            productId: "1",
            quantity: 1,
          },
          {
            productId: "2",
            quantity: 1,
          },
          {
            productId: "3",
            quantity: 3,
          },
        ],
      });
  });
});