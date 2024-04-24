import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceItems from "../../domain/entity/invoice-items.entity";
import Invoice from "../../domain/entity/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import Address from "../../value-object/address";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUsecase implements UseCaseInterface {

    constructor(private invoiceRepository: InvoiceGateway) {}

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {

        const invoice = new Invoice({
            id: new Id(input.id) || new Id(),
            name: input.name,
            document: input.document,
            address: new Address({
                street: input.street,
                number: input.number,
                complement: input.complement,
                city: input.city,
                state: input.state,
                zipCode: input.zipCode
            }),
            items: input.items.map((item) => {
                return new InvoiceItems({
                    id: new Id(item.id),
                    name: item.name,
                    price: item.price
                });
            })
        });

        console.log(invoice)

        await this.invoiceRepository.generate(invoice);

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.getStreet(),
            number: invoice.address.getNumber(),
            complement: invoice.address.getComplement(),
            city: invoice.address.getCity(),
            state: invoice.address.getState(),
            zipCode: invoice.address.getZipCode(),
            items: invoice.items.map(item => ({
                id: item.id.id,
                name: item.name,
                price: item.price
            })),
            total: invoice.items.reduce((total, item) => total + item.price, 0)
        };
    };
}