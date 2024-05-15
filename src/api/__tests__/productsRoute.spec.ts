import request from "supertest";
import { Umzug } from "umzug";
import { migrator } from "../../test-migrations/config/migrator";
import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { productsRoute } from "../routes/productsRoute";
import { ProductModel } from "../../modules/product-adm/repository/product.model";

describe("API /products e2e tests", () => {
  const app: Express = express();
  app.use(express.json());
  app.use("/products", productsRoute);

  let sequelize: Sequelize;


  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync()
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/products").send({
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 77,
      stock: 10,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.description).toBe("Product 1 description");
    expect(response.body.purchasePrice).toBe(77);
    expect(response.body.stock).toBe(10);
  });
});