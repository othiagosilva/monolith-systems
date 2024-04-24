import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import FindInvoiceUsecase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUsecase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

export interface UseCaseProps {
    findUseCase: UseCaseInterface;
    generateUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private findUsecase: UseCaseInterface;
    private generateUsecase: UseCaseInterface;
    constructor(props: UseCaseProps) {
        this.findUsecase = props.findUseCase;
        this.generateUsecase = props.generateUseCase;
    }
    async find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        return await this.findUsecase.execute(input);
    }
    async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return await this.generateUsecase.execute(input);
    }
}