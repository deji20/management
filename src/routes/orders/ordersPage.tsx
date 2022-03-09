import Api from "../../api/api";
import { Component, ReactElement, useEffect, useState} from "react";
import ProductTable from "../../components/product/productTable/productTable";
import { ProductModel } from "../../models/productModel";
import ActionButton from "../../components/buttons/actionButton";
import NavBar from "../../components/navigation/navBar";

interface PageState{
    products: ProductModel[];
    dialog: any;
}

export default function OrdersPage(){
    return (
        <div className="bg-gray-800 min-h-screen">
            <NavBar back="/">
                <input className="flex flex-grow font-bold h-full text-white bg-blue-900 bg-opacity-10 w-full px-3 focus:bg-opacity-100" placeholder="Search" type="text"/>
            </NavBar>
            <div className="px-10 flex justify-center text-gray-500">
                <ActionButton title="Add Category" className=" h-32 w-1/3" iconSrc="/api/icons/plus.svg" onClick={() => console.log("hello world")}/>
            </div>
        </div>
    );
}