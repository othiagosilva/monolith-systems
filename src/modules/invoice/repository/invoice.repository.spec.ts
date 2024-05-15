import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";
import { InvoiceItemsModel } from "./invoice-items.model";
import Invoice from "../domain/entity/invoice.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/entity/invoice-items.entity";
import InvoiceRepository from "./invoice.repository";
import Address from "../../@shared/value-object/address";

describe("Invoice Repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
        });

        await sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
    it("should create a invoice", async () => {
        const invoiceRepository = new InvoiceRepository();

        const invoice = new Invoice({
            id: new Id("1"),
            name: "Invoice 1",
            document: "Document 1",
            address: new Address(
                "Street 1",
                "1",
                "Complement 1",
                "City 1",
                "State 1",
                "ZipCode 1"
            ),
            items: 
            [new InvoiceItems({
             id: new Id("1"),
             name: "Item 1",
             price: 10
            }), 
             new InvoiceItems({
             id: new Id("2"),
             name: "Item 2",
             price: 20
            })],
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await invoiceRepository.generate(invoice);

        const invoiceModel = await InvoiceModel.findOne({ where: { id: invoice.id.id } });

        expect(invoiceModel.id).toEqual(invoice.id.id);
        expect(invoiceModel.name).toEqual(invoice.name);
        expect(invoiceModel.document).toEqual(invoice.document);
        expect(invoiceModel.street).toEqual(invoice.address.street);
        expect(invoiceModel.number).toEqual(invoice.address.number);
        expect(invoiceModel.complement).toEqual(invoice.address.complement);
        expect(invoiceModel.city).toEqual(invoice.address.city);
        expect(invoiceModel.state).toEqual(invoice.address.state);
        expect(invoiceModel.zipCode).toEqual(invoice.address.zipCode);
        expect(invoiceModel.createdAt).toEqual(invoice.createdAt);
        expect(invoiceModel.updatedAt).toEqual(invoice.updatedAt);
    });

    it("should find a invoice", async () => {
        const invoiceRepository = new InvoiceRepository();

        const invoice = new Invoice({
            id: new Id("1"),
            name: "Invoice 1",
            document: "Document 1",
            address: new Address(
                "Street 1",
                "1",
                "Complement 1",
                "City 1",
                "State 1",
                "ZipCode 1"
            ),
            items: 
            [new InvoiceItems({
             id: new Id("1"),
             name: "Item 1",
             price: 10
            }), 
             new InvoiceItems({
             id: new Id("2"),
             name: "Item 2",
             price: 20
            })],
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await invoiceRepository.generate(invoice);

        const result = await invoiceRepository.find(invoice.id.id);

        expect(result.id.id).toBe(invoice.id.id);
        expect(result.name).toBe("Invoice 1");
        expect(result.document).toBe("Document 1");
        expect(result.address.street).toBe("Street 1");
        expect(result.address.number).toBe("1");
        expect(result.address.zipCode).toBe("ZipCode 1");
        expect(result.address.city).toBe("City 1");
        expect(result.address.complement).toBe("Complement 1");
        expect(result.address.state).toBe("State 1");
        expect(result.items[0].id.id).toBe(invoice.items[0].id.id);
        expect(result.items[0].name).toBe("Item 1");
        expect(result.items[0].price).toBe(10)
        expect(result.items[1].id.id).toBe(invoice.items[1].id.id);
        expect(result.items[1].name).toBe("Item 2");
        expect(result.items[1].price).toBe(20)
    });
});