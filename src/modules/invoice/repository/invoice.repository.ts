import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/entity/invoice-items.entity";
import Invoice from "../domain/entity/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import Address from "../value-object/address";
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
            address: new Address({
                street: invoiceModel.street,
                number: invoiceModel.number,
                zipCode: invoiceModel.zipCode,
                city: invoiceModel.city,
                complement: invoiceModel.complement,
                state: invoiceModel.state,
            }),
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
              street: invoice.address.getStreet(),
              number: invoice.address.getNumber(),
              city: invoice.address.getCity(),
              state: invoice.address.getState(),
              zipCode: invoice.address.getZipCode(),
              complement: invoice.address.getComplement(),
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