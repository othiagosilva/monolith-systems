import Address from "../../../@shared/value-object/address"

export interface AddClientInputDto {
  id?: string
  name: string
  email: string
  document: string
  address: Address
}

export interface AddClientOutputDto {
  id: string
  name: string
  email: string
  document: string
  address: Address
  createdAt: Date
  updatedAt: Date
}