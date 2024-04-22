import { Sequelize } from "sequelize-typescript";
import ClientModel from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUsecase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import FindClientUsecase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";

describe ("Client Adm Facade Repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a client", async () => {
        const repository = new ClientRepository();
        const addUseCase = new AddClientUsecase(repository);
        const facade = new ClientAdmFacade({
            addUsecase: addUseCase,
            findUsecase: undefined,
        });

        const input = {
            id: "1",
            name: "Client 1",
            email: "email 1",
            address: "address 1",
        };

        await facade.add(input);

        const result = await ClientModel.findOne({ where: { id: input.id } });
        expect(result).toBeDefined();
        expect(result.id).toEqual(input.id);
        expect(result.name).toEqual(input.name);
        expect(result.email).toEqual(input.email);
        expect(result.address).toEqual(input.address);
    });

    it("should find a client", async () => {
        // const repository = new ClientRepository();
        // const findUseCase = new FindClientUsecase(repository);
        // const addUseCase = new AddClientUsecase(repository);
        // const facade = new ClientAdmFacade({
        //     addUsecase: addUseCase,
        //     findUsecase: findUseCase,
        // });

        const facade = new ClientAdmFacadeFactory().create();

        const input = {
            id: "1",
            name: "Client 1",
            email: "email 1",
            address: "address 1",
        };

        await facade.add(input);

        const result = await facade.find({ id: input.id });

        expect(result.id).toEqual(input.id);
        expect(result.name).toEqual(input.name);
        expect(result.email).toEqual(input.email);
        expect(result.address).toEqual(input.address);
    });
});