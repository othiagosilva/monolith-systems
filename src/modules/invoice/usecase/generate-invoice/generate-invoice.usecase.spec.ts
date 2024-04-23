import GenerateInvoiceUsecase from "./generate-invoice.usecase";

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn()
    };
}

describe("Generate Invoice usecase unit test", () => {

    it("should generate a invoice", async () => {
        const repository = MockRepository();
        const usecase = new GenerateInvoiceUsecase(repository);

        const input = {
            name: "Client 1",
            document: "document 1",
            street: "street 1",
            number: "number 1",
            complement: "complement 1",
            city: "city 1",
            state: "state 1",
            zipCode: "zipCode 1",
            items: [
                {
                    id: "1",
                    name: "Item 1",
                    price: 10
                },
                {
                    id: "2",
                    name: "Item 2",
                    price: 20
                }
            ]
        };

        const result = await usecase.execute(input);

        expect(repository.generate).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toEqual(input.name);
        expect(result.document).toEqual(input.document);
        expect(result.street).toEqual(input.street);
        expect(result.number).toEqual(input.number);
        expect(result.complement).toEqual(input.complement);
        expect(result.city).toEqual(input.city);
        expect(result.state).toEqual(input.state);
        expect(result.zipCode).toEqual(input.zipCode);
        expect(result.items[0].name).toEqual(input.items[0].name);
        expect(result.items[0].price).toEqual(input.items[0].price);
        expect(result.items[1].name).toEqual(input.items[1].name);
        expect(result.items[1].price).toEqual(input.items[1].price);
        expect(result.total).toBe(30);
    });
});