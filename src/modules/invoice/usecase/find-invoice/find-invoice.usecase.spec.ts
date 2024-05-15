import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../../@shared/value-object/address";
import InvoiceItems from "../../domain/entity/invoice-items.entity";
import Invoice from "../../domain/entity/invoice.entity";
import FindInvoiceUsecase from "./find-invoice.usecase";

const address = new Address(
    "street 1",
    "1",
    "complement 1",
    "city 1",
    "state 1",
    "zipCode 1",
)

const item1 = new InvoiceItems({
    id: new Id(),
    name: "Item 1",
    price: 10
});

const item2 = new InvoiceItems({
    id: new Id(),
    name: "Item 2",
    price: 20
});

const invoice = new Invoice({
    name: "Client 1",
    document: "document 1",
    address: address,
    items: [item1, item2]
});

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    };
};

describe("Find Invoice usecase unit test", () => {

    it("should find a invoice", async () => {
        const repository = MockRepository();
        const usecase = new FindInvoiceUsecase(repository);

        const result = await usecase.execute({ id: "1" });

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toBe(invoice.id.id);
        expect(result.name).toBe("Client 1");
        expect(result.document).toBe("document 1");
        expect(result.street).toBe("street 1");
        expect(result.number).toBe("1");
        expect(result.zipCode).toBe("zipCode 1");
        expect(result.city).toBe("city 1");
        expect(result.complement).toBe("complement 1");
        expect(result.state).toBe("state 1");
        expect(result.items[0].id).toBe(invoice.items[0].id.id);
        expect(result.items[0].name).toBe("Item 1");
        expect(result.items[0].price).toBe(10)
        expect(result.items[1].id).toBe(invoice.items[1].id.id);
        expect(result.items[1].name).toBe("Item 2");
        expect(result.items[1].price).toBe(20)
    });
});