export interface Customer{
    privatePerson: Person,
    email: string,
    shippingAddress: Address,
    phone: PhoneNumber
}

export interface Person{
    firstName: string
    lastName: string;
}

export interface Address{
    addressLine1: string,
    addressLine2: string,
    city: string,
    postalCode: string,
    country: string,
}

export interface PhoneNumber{
    prefix: string,
    number: string
}
