import Api from "../../api/api";
import { Component, ReactElement, useEffect, useState} from "react";
import ProductTable from "../../components/product/productTable/productTable";
import { ProductModel } from "../../models/productModel";
import ProductDetailsPage from "./productDetailsPage";
import CategoryListPage from "./categoryListPage";
import DialogComponent from "../../components/dialogs/baseDialog";
import ActionButton from "../../components/buttons/actionButton";

interface PageState{
    products: ProductModel[];
    dialog: any;
}

export default function ProductsPage(){
    const [dialog, openDialog] = useState<ReactElement | null>(null);
    const [products, setProducts] = useState<ProductModel[]>([]);


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
    //displays the dialog window for creating new products
    const createProduct = (product?: ProductModel) => { 
        openDialog(
            <DialogComponent 
                onClose={() => {
                    updateProducts();
                    openDialog(null);
                }}
                onSubmit={async (e: any) => {
                    if(e.data){ 
                        e.data.version.pictures = e.data.pictures;
                        delete e.data.pictures;
                        let data: ProductModel = e.data;
                        if(!Array.isArray(data.version)) data.version = [data.version];
                        Api.post("/product", data); 
                        updateProducts();
                        openDialog(null);
                }}
            }>
                <ProductDetailsPage product={product}/>
            </DialogComponent>
        )
    }

    //get products to display
    const updateProducts = (search?: string) => {
        Api.get<ProductModel[]>("/product?"+search).then(res => {
            setProducts(res);
        });
    }

    //runs when component is first initialized
    useEffect(() => {
        updateProducts()
    }, [])

    return (
        <div className="bg-gray-800 min-h-screen">
            {dialog}
            <div className="px-10 flex justify-center text-gray-500">
                <ActionButton title="Add Product" className=" h-32 w-1/3" iconSrc="/api/icons/plus.svg" onClick={createProduct}/>
                <ActionButton title="Add Category" className=" h-32 w-1/3" iconSrc="/api/icons/plus.svg" onClick={createCategories}/>
            </div>
            <input className="w-full font-bold h-10 text-white bg-blue-600 px-3" placeholder="Search" type="text" onChange={(event) => updateProducts("search=name="+event.target.value)}/>
            <ProductTable products={products}/>
        </div>
    );
}