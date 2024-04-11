import { AddProductFacadeInputDto } from "./dto/add-product-adm.dto";
import { CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./dto/check-stock-product-adm.dto";

export default interface ProductAdmFacadeInterface {
    addProduct(input: AddProductFacadeInputDto): Promise<void>;
    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto>;
}