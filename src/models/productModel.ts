import { url } from "inspector"

export interface ProductModel{
    _id?: string;
    price: number,
    name: string,
    categories: string[],
    version: Version[]
}

export interface Version{
    pictures: Picture[],
    attributes: Attribute[],
    description: string,
    amount: number,
}

export interface Attribute{
    name: string,
    value: string,
}

export interface Picture{
    ratio: {
        x: number, 
        y:number
    }
    path: string,
    alt: string,
    mime: string,
}

export interface Category{
    name: string,
    mainCategory: boolean
}