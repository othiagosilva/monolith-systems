import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { AddProductFacadeInputDto } from "./dto/add-product-adm.dto";
import { CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./dto/check-stock-product-adm.dto";
import ProductAdmFacadeInterface from "./product-adm.facade.interface";

export interface UseCaseProps {
    addUseCase: UseCaseInterface;
    checkStockUseCase: UseCaseInterface
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    private _addUsecase: UseCaseInterface;
    private _checkStockUsecase: UseCaseInterface;

    constructor(useCaseProps: UseCaseProps) {
        this._addUsecase = useCaseProps.addUseCase;
        this._checkStockUsecase = useCaseProps.addUseCase;
    }

    async addProduct(input: AddProductFacadeInputDto): Promise<void> {
        return this._addUsecase.execute(input);
    }

    async checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._checkStockUsecase.execute(input);
    }
}