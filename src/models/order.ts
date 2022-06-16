import { Customer } from "./customer";
import { ProductModel } from "./productModel";

export interface Order{
    id: string,
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
    NEW = "new",
    PAYED = "payed",
    CANCELLED = "cancelled",
    SHIPPED = "shipped"
}