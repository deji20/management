import { Customer } from "./customer";
import { ProductModel } from "./productModel";

export interface Order{
    customer?: Customer,
    paymentId: string,
    created?: Date,
    products: OrderLine[],
    status: OrderStatus,
}

export interface OrderLine{
    product: ProductModel,
    amount: number,
}

export enum OrderStatus{
    NEW = "NEW",
    PAYED = "PAYED"

}