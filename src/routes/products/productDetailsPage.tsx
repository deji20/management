import TokenListInput from "../../components/inputComponents/tokenListInput";
import ImageInput from "../../components/inputComponents/imageInput";
import SectionTitle from "../../components/misc/sectionTitle";
import { ProductModel } from "../../models/productModel";
import ProductInfo from "../../components/product/productInfo";
import Api from "../../api/api";
import { useEffect, useRef, useState } from "react";

interface ProductProps{
    product?: ProductModel;
}

export default function ProductDetailsPage(props: ProductProps){
    let categories = useRef<string[]>()
    
    useEffect(() => {
        (async () => {
            categories.current = await Api.get(`/product/categories`)
        })()
    }, [])
    
    function deleteProduct(){
        props.product && Api.delete("/product", props.product._id);
    }

    let version;
    if(props.product?.version?.length) version = props.product?.version[0];
    return (
        <div className="relative">
            <div className="w-full h-full relative grid grid-cols-8 self-center rounded shadow-2xl bg-white">
                <div className="flex flex-1 flex-col col-span-3 h-full">
                    <div className="max-h-64">
                        <ImageInput multiple inputName="[pictures]" images={version?.pictures}/>
                    </div>
                        <SectionTitle title="categories"/>
                    <div>
                        <TokenListInput values={props.product?.categories} predict={(input) => {
                            return categories.current?.filter(cat => cat.includes(input)) || [];
                        }} placeholder="Categories" submitable inputName="[categories]"/>
                    </div>
                    <div className="flex flex-grow">
                        <div className="flex flex-row w-full place-items-end place-self-end self-end p-4 bg-gray-400 rounded-b text-white ">
                            <input name="price" type="number" className="font-light bg-white bg-opacity-10 w-full text-right placeholder:text-white" placeholder="price" defaultValue={props.product?.price} />
                            <span> Kr</span>
                        </div>
                    </div>
                </div>
                <div className="justify-self-center flex flex-col col-span-5 h-full w-full border">
                    <div className="flex-1">
                        <div>
                            <SectionTitle title="Name"/>
                            <input className="w-full bg-gray-200 px-10" name="name" type="text" defaultValue={props.product?.name}></input>
                        </div>
                        <SectionTitle title="Info"/>
                        <ProductInfo product={props.product}></ProductInfo>
                    </div>
                    <div className="flex flex-col w-full h-56 place-self-end">
                        <SectionTitle title="Description"/>
                        <textarea name="version.description" className="bg-gray-100 border overflow-scroll rounded p-2 flex-1" defaultValue={version?.description}/>
                    </div>
                </div>
            </div>
        </div>
    )
}