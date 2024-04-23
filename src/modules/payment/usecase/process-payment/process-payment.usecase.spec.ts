import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction-entity";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transaction = new Transaction({
    id: new Id("1"),
    orderId: "1",
    amount: 100
})

const MockRepository = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
    }
}

const transaction2 = new Transaction({
    id: new Id("1"),
    orderId: "1",
    amount: 50
})

const MockRepositoryDeclined = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction2)),
    }
}

describe("Payment Usecase Unit Test", () => {

    it("should approve a transaction", async () => {
        const paymentRepository = MockRepository();
        const usecase = new ProcessPaymentUseCase(paymentRepository);
        const input = {
            orderId: "1",
            amount: 100
        };

        const output = await usecase.execute(input);

        expect(output.transactionId).toBe(transaction.id.id);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(output.orderId).toBe(input.orderId);
        expect(output.amount).toBe(input.amount);
        expect(output.status).toBe("approved");
        expect(output.createdAt).toBeInstanceOf(Date);
        expect(output.updatedAt).toBeInstanceOf(Date);
    });

    it("should decline a transaction", async () => {
        const paymentRepository = MockRepositoryDeclined();
        const usecase = new ProcessPaymentUseCase(paymentRepository);
        const input = {
            orderId: "1",
            amount: 50
        };

        const output = await usecase.execute(input);

        expect(output.transactionId).toBe(transaction2.id.id);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(output.orderId).toBe(input.orderId);
        expect(output.amount).toBe(input.amount);
        expect(output.status).toBe("declined");
        expect(output.createdAt).toBeInstanceOf(Date);
        expect(output.updatedAt).toBeInstanceOf(Date);
    });
});