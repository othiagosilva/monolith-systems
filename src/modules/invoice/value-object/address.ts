type AddressProps = {
    street: string;
    number: string;
    zipCode: string;
    city: string;
    complement?: string;
    state: string;
  };
  
  export default class Address {
    private street: string = "";
    private number: string = "0";
    private zipCode: string = "";
    private city: string = "";
    private complement: string = "";
    private state: string = "";
  
    constructor(address: AddressProps) {
      this.street = address.street;
      this.number = address.number;
      this.zipCode = address.zipCode;
      this.city = address.city;
      this.complement = address.complement;
      this.state = address.state;
    }
  
    getComplement(): string {
      return this.complement;
    }
  
    getState(): string {
      return this.state;
    }
  
    getStreet(): string {
      return this.street;
    }
  
    getNumber(): string {
      return this.number;
    }
  
    getZipCode(): string {
      return this.zipCode;
    }
  
    getCity(): string {
      return this.city;
    }
  
    toString() {
      return `${this.street}, ${this.number}, ${this.zipCode} ${this.city}`;
    }
  }