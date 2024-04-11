import { CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "../../facade/dto/check-stock-product-adm.dto";
import ProductGateway from "../../gateway/product.gateway";

export default class CheckStockUseCase {

    private _productRepository: ProductGateway;

    constructor(productRepository: ProductGateway) {
        this._productRepository = productRepository;
    }

    async execute(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        const product = await this._productRepository.find(input.productId);

        return {
            productId: product.id.id,
            stock: product.stock
        }
    }
}