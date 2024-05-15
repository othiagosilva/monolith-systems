import Address from "../../@shared/value-object/address"

export interface AddClientFacadeInputDto {
    id?: string
    name: string
    email: string
    document: string
    address: Address
  }
  
  export interface FindClientFacadeInputDto {
    id: string
  }
  
  export interface FindClientFacadeOutputDto {
    id: string
    name: string
    email: string
    document: string
    address: Address
    createdAt: Date
    updatedAt: Date
  }