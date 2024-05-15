import request from "supertest";
import { Umzug } from "umzug";
import { migrator } from "../../test-migrations/config/migrator";
import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { clientsRoute } from "../routes/clientsRoute";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import Address from "../../modules/@shared/value-object/address";
import ClientRepository from "../../modules/client-adm/repository/client.repository";
import AddClientUseCase from "../../modules/client-adm/usecase/add-client/add-client.usecase";
import ClientAdmFacade from "../../modules/client-adm/facade/client-adm.facade";

describe("API /clients e2e tests", () => {
  const app: Express = express();
  app.use(express.json());
  app.use("/clients", clientsRoute);

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    sequelize.addModels([ClientModel]);
    await sequelize.sync()
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const response = await request(app).post("/clients").send({
      name: "Lucian",
      email: "lucian@xpto.com",
      document: "1234-5678",
      address: {
        street: "Rua 123",
        number: "99",
        complement: "Casa Verde",
        city: "Criciúma",
        state: "SC",
        zipCode: "88888-888",
      },
    })

    expect(response.status).toBe(201);
  });
});