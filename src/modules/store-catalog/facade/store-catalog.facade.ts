import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUsecase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface, { FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from "./store-catalog.facade.interface";

export interface UseCaseProps {
    findUseCase: FindProductUsecase;
    findAllUseCase: FindAllProductsUseCase;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface{
    private findUsecase: FindProductUsecase;
    private findAllUsecase: FindAllProductsUseCase;
    constructor(props: UseCaseProps) {
        this.findUsecase = props.findUseCase;
        this.findAllUsecase = props.findAllUseCase;
    }
    async find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
        return await this.findUsecase.execute(id);
    }

    async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
        return await this.findAllUsecase.execute();
    }
}