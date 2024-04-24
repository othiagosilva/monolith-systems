import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "../repository/invoice.model";
import { InvoiceItemsModel } from "../repository/invoice-items.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("Invoice Facade test", () => {
    let sequelize: Sequelize

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

    it("should generate a invoice", async ()=> {
        const facade = InvoiceFacadeFactory.create();
        const input = {
            id: "1",
            name: "Client 1",
            document: "Document 1",
            street: "Street 1", 
            number: "1", 
            complement: "Complement 1", 
            city: "City 1", 
            state: "State 1", 
            zipCode: "ZipCode 1",
            items: [
                {
                    id: "1",
                    name: "Item 1",
                    price: 100
                },
                {
                    id: "2",
                    name: "Item 2",
                    price: 200
                }
            ],
        }

        await facade.generate(input);

        const result = await InvoiceModel.findOne({ where: { id: "1" }, include: ["items"] });

        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result.id).toEqual("1");
        expect(result.name).toEqual(input.name);
        expect(result.document).toEqual(input.document);
        expect(result.street).toEqual(input.street);
        expect(result.number).toEqual(input.number);
        expect(result.complement).toEqual(input.complement);
        expect(result.city).toEqual(input.city);
        expect(result.state).toEqual(input.state);
        expect(result.zipCode).toEqual(input.zipCode);
        expect(result.items.length).toBe(2);
    });
});