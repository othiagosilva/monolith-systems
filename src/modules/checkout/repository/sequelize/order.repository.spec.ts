import { Sequelize } from "sequelize-typescript";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import OrderModel from "./order.model";
import Product from "../../domain/product.entity";
import OrderRepository from "./order.repository";
import Order from "../../domain/order.entity";
import { ClientModel } from "../../../client-adm/repository/client.model";
import ProductModel from "./product.model";

describe("Order sequelize repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ClientModel, ProductModel, OrderModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a order", async () => {
    const client = new Client({
      id: new Id("1"),
      name: "Client 1",
      email: "x@x.com",
      address: "Address 1",
    });

    const product1 = new Product({
      id: new Id("1"),
      name: "Product 1",
      description: "Description 1",
      salesPrice: 20,
    });

    const product2 = new Product({
      id: new Id("1"),
      name: "Product 1",
      description: "Description 1",
      salesPrice: 20,
    });

    const order = new Order({
      client: client,
      products: [product1, product2],
    });

    const orderRepository = new OrderRepository();
    await orderRepository.addOrder(order);

    const orderDb = await OrderModel.findOne({
      where: { id: order.id.id },
    });

    expect(order.id.id).toEqual(orderDb.id);
    expect(order.client).toEqual({
      ...orderDb.client,
      _createdAt: expect.any(Date),
      _updatedAt: expect.any(Date),
      _id: expect.any(Object),
    });
    expect(order.products[0]).toEqual({
      ...orderDb.products[0],
      _createdAt: expect.any(Date),
      _updatedAt: expect.any(Date),
      _id: expect.any(Object),
    });
    expect(order.products[1]).toEqual({
      ...orderDb.products[1],
      _createdAt: expect.any(Date),
      _updatedAt: expect.any(Date),
      _id: expect.any(Object),
    });
    expect(order.status).toBe("pending");
  });

  it("should find a order", async () => {
    const client = new Client({
      id: new Id("1"),
      name: "Client 1",
      email: "x@x.com",
      address: "Address 1",
    });

    const product1 = new Product({
      id: new Id("1"),
      name: "Product 1",
      description: "Description 1",
      salesPrice: 20,
    });

    const product2 = new Product({
      id: new Id("2"),
      name: "Product 2",
      description: "Description 2",
      salesPrice: 20,
    });

    const orderOnDb = await OrderModel.create({
      id: new Id("1").id,
      client: client,
      products: [product1, product2],
      status: "pending",
    });

    const orderRepository = new OrderRepository();
    const result = await orderRepository.findOrder("1");

    expect(result.id.id).toEqual(orderOnDb.id);
    expect(result.client).toEqual({
      ...orderOnDb.client,
      _createdAt: expect.any(String),
      _updatedAt: expect.any(String),
      _id: expect.any(Object),
    });
    expect(result.products[0]).toEqual({
      ...orderOnDb.products[0],
      _createdAt: expect.any(String),
      _updatedAt: expect.any(String),
      _id: expect.any(Object),
    });
    expect(result.products[1]).toEqual({
      ...orderOnDb.products[1],
      _createdAt: expect.any(String),
      _updatedAt: expect.any(String),
      _id: expect.any(Object),
    });
    expect(result.status).toEqual(orderOnDb.status);
  });
});