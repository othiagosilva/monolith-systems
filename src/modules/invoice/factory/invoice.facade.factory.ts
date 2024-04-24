import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUsecase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUsecase from "../usecase/generate-invoice/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
    static create() {
        const invoiceRepository = new InvoiceRepository();
        const invoiceGenerateUsecase = new GenerateInvoiceUsecase(invoiceRepository);
        const invoiceFindUsecase = new FindInvoiceUsecase(invoiceRepository);
        const facade = new InvoiceFacade({
            findUseCase: invoiceFindUsecase,
            generateUseCase: invoiceGenerateUsecase
        });

        return facade;
    }
}