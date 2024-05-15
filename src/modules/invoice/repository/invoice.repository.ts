import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/value-object/address";
import InvoiceItems from "../domain/entity/invoice-items.entity";
import Invoice from "../domain/entity/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceItemsModel } from "./invoice-items.model";
import { InvoiceModel } from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {

    async find(id: string): Promise<Invoice> {

        const invoiceModel = await InvoiceModel.findOne({
            where: { id: id },
            include: ["items"],
        });

        const invoice = new Invoice({
            id: new Id(invoiceModel.id),
            name: invoiceModel.name,
            document: invoiceModel.document,
            address: new Address(
                invoiceModel.street,
                invoiceModel.number,
                invoiceModel.complement,
                invoiceModel.city,
                invoiceModel.state,
                invoiceModel.zipCode
            ),
            items: invoiceModel.items.map((item) => {
                return new InvoiceItems({
                    id: new Id(item.id),
                    name: item.name,
                    price: item.price
                });
            }),
            createdAt: invoiceModel.createdAt,
            updatedAt: invoiceModel.updatedAt
        });

        return invoice;
    }

    async generate(invoice: Invoice): Promise<void> {
        const create = await InvoiceModel.create(
            {
              id: invoice.id.id,
              name: invoice.name,
              document: invoice.document,
              street: invoice.address.street,
              number: invoice.address.number,
              city: invoice.address.city,
              state: invoice.address.state,
              zipCode: invoice.address.zipCode,
              complement: invoice.address.complement,
              createdAt: invoice.createdAt,
              updatedAt: invoice.updatedAt,
              items: invoice.items.map((item) => {
                return {
                  id: item.id.id,
                  name: item.name,
                  price: item.price,
                  createdAt: item.createdAt,
                  updatedAt: item.updatedAt,
                };
              }),
            },
            {
              include: [{ model: InvoiceItemsModel }],
            }
          );
    }
}