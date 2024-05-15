import Id from "../../../@shared/domain/value-object/id.value-object";
import Order from "../../domain/order.entity";
import CheckoutGateway from "../../gateway/checkout.gateway";
import OrderModel from "./order.model";

export default class OrderRepository implements CheckoutGateway {
  async addOrder(order: Order): Promise<void> {
    try {
      await OrderModel.create({
        id: order.id.id,
        client: order.client,
        products: order.products,
        status: order.status,
      });
    } catch (e) {
      console.log(e)
    }
  }

  async findOrder(id: string): Promise<Order> {
    const order = await OrderModel.findOne({ where: { id } });

    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }

    return new Order({
      id: new Id(order.id),
      client: order.client,
      products: order.products,
      status: order.status,
    });
  }
}