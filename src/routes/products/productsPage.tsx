import Api from "../../api/api";
import { Component, ReactElement, useEffect, useState} from "react";
import ProductTable from "../../components/product/productTable/productTable";
import { ProductModel } from "../../models/productModel";
import ProductDetailsPage from "./productDetailsPage";
import CategoryListPage from "./categoryListPage";
import DialogComponent from "../../components/dialogs/baseDialog";
import ActionButton from "../../components/buttons/actionButton";
import NavBar from "../../components/navigation/navBar";

interface PageState{
    products: ProductModel[];
    dialog: any;
}

export default function ProductsPage(){
    const [dialog, openDialog] = useState<ReactElement | null>(null);
    const [products, setProducts] = useState<ProductModel[]>([]);

    //get products to display
    const updateProducts = (search?: string) => {
        Api.get<ProductModel[]>("/product?"+search).then(res => {
            setProducts(res);
        }).catch(err => console.log(err));
    }

       //displays the dialog window for creating categories and setting base categories 
       const createCategories = () => { 
        openDialog(
            <DialogComponent
                onClose={() => {
                    openDialog(null);
                }}

                onSubmit={(e, active) => {
                    let data = e.data as {category: string[]}
                    setTimeout(() => {
                        Api.post("/category", data.category).then(() => {
                            active(false);
                        })
                    }, 1000)
                }}>
                <CategoryListPage />
            </DialogComponent>
        )
    }
    
    //runs when component is first initialized
    useEffect(() => {
        updateProducts()
    }, [])

    return (
        <div className="bg-gray-800 min-h-screen">
            <NavBar back="/">
                <input className="flex flex-grow font-bold h-full text-white bg-blue-900 bg-opacity-10 w-full px-3 focus:bg-opacity-100" placeholder="Search" type="text" onChange={(event) => updateProducts("search=name="+event.target.value)}/>
            </NavBar>
            {dialog}
            <div className="px-10 flex justify-center text-gray-500">
                <ActionButton link="create" title="Add Product" className=" h-32 w-1/3" iconSrc="/api/icons/plus.svg"/>
                <ActionButton title="Add Category" className=" h-32 w-1/3" iconSrc="/api/icons/plus.svg" onClick={createCategories}/>
            </div>
            <ProductTable products={products}/>
        </div>
    );
}