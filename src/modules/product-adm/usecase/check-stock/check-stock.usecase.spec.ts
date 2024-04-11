import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../repository/product.model";
import CheckStockUseCase from "./check-stock.usecase";
import ProductRepository from "../../repository/product.repository";
import Product from "../../domain/product.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";

describe ("Check Stock Usecase test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
    
    it ("should check stock", async () => {
        const productProps = {
            id: new Id("1"),
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10,
        }
        const product = new Product(productProps);
        const productRepository = new ProductRepository();
        await productRepository.add(product);

        const usecase = new CheckStockUseCase(productRepository);

        const input = {
            productId: "1",
        }

        const result = await usecase.execute(input);

        expect(result.productId).toBe(product.id.id);
        expect(result.stock).toBe(product.stock);
    })
});