import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.dto";
import ClientAdmFacadeInterface from "./client-adm.facade.interface";

export interface UseCaseProps {
    findUsecase: UseCaseInterface;
    addUsecase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
    private _addUsecase: UseCaseInterface;
    private _findUsecase: UseCaseInterface;

    constructor(useCaseProps: UseCaseProps) {
        this._addUsecase = useCaseProps.addUsecase;
        this._findUsecase = useCaseProps.findUsecase;
    }

    async add(input: AddClientFacadeInputDto): Promise<void> {
        await this._addUsecase.execute(input);
    }

    async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        return this._findUsecase.execute(input);
    }
}