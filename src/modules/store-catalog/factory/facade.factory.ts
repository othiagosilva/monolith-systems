import StoreCatalogFacade from "../facade/store-catalog.facade";
import ProductRepository from "../repository/product.repository";
import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUsecase from "../usecase/find-product/find-product.usecase";

export default class StoreCatalogFacadeFactory {

    static create(): StoreCatalogFacade{

        const productRepository = new ProductRepository();
        const findProductUsecase = new FindProductUsecase(productRepository);
        const findAllProdcutUseCase = new FindAllProductsUseCase(productRepository);

        const facade = new StoreCatalogFacade({
            findUseCase: findProductUsecase,
            findAllUseCase: findAllProdcutUseCase
        });
        return facade;
    }
}