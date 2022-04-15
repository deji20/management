import TokenListInput from "../../components/input/tokenListInput";
import ImageInput from "../../components/input/imageInput";
import { ProductModel } from "../../models/productModel";
import ProductInfo from "../../components/product/productInfo";
import Api from "../../api/api";
import UseSwr from "swr";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Image from "../../components/Image";
import NavBar from "../../components/navigation/navBar";
import NumberInput from "../../components/input/numberInput";

export default function ProductDetailsPage(props: any){
    //get id from url parameter
    const { id } = useParams()
    const nav = useNavigate()
    
    //get all categories for the category prediction
    let {data: categories, error:categoryError } =  UseSwr<string[]>(
        "/product/categories",
        key => Api.get<string[]>(key),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        })

    //try to pull product from database
    const {data: prod, error: productError } =  UseSwr<ProductModel>(
        `/product/${id}`,
        key => Api.get<ProductModel>(key),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        }
    );

    const [product, setProduct] = useState<ProductModel>(prod || {
        name: "",
        price: 0,
        categories: [],
        version: [{
            amount: 0, 
            description:"",
            pictures:[]
        }]
    });

    // sets the product state if database query is successful 
    useEffect(() => {
        !productError && prod && setProduct(prod);
    }, [prod]);

    //displays the dialog window for creating new products
    const submit = () => {
        if(product._id) Api.patch("/product", product._id, product);
        else Api.post("/product", product)
    }
    const deleteProduct = async () => {
        if(product._id){
            let result = await Api.delete("/product", product._id)
            nav("/products")
        } 
        
    }

    return (
        <div className="bg-gray-800 min-h-screen w-screen flex align-middle flex-col">
            <NavBar back="/products">
                <div className="flex flex-row justify-end p-1">
                    <button className="bg-red-800 w-10 bg-opacity-50 hover:bg-opacity-100 rounded transition-all duration-300" onClick={deleteProduct}>
                        <Image className="flex p-1" pictures={["/api/icons/trash.svg"]}/>
                    </button>
                    <button className="bg-blue-800 w-10 bg-opacity-50 hover:bg-opacity-100 rounded mx-5 transition-all duration-300" onClick={submit}>
                        <Image className="flex p-1" pictures={["/api/icons/save.svg"]}/>
                    </button>
                </div>
            </NavBar>
            <div className="flex md:p-20 w-2/3 place-self-center">
                <div className="w-full h-full relative grid grid-cols-3 md:grid-cols-8 bg-gray-100 rounded shadow-2xl">
                    <div className="flex flex-1 flex-col col-span-3 h-full">
                        <div className="flex justify-center h-64">
                            <ImageInput 
                                onInput={
                                (file, allImages) => {
                                    if(product) product.version[0].pictures = allImages;
                                }} 
                                multiple 
                                inputName="[pictures]"  
                                images={ product.version[0].pictures }
                            />
                        </div>

                        <div className="p-2">
                            <label className="text-slate-700 font-semibold text-lg">Kategorier </label>
                            <TokenListInput
                                onInput={(token, tokens) => {
                                    console.log(tokens);
                                    if(product) product.categories = tokens;
                                }}
                                values={product?.categories} 
                                //Prediction function which shows existing categories
                                predict={(input) => categories?.filter(cat => (cat.includes(input) && !product?.categories?.includes(input))) || []} 
                                placeholder="Categories" submitable inputName="[categories]"
                            />
                        </div>

                        <div className="flex flex-grow">
                            <div className="flex flex-row w-full place-items-end place-self-end self-end bg-gray-400 rounded-b text-white ">
                                <NumberInput className="font-light bg-white bg-opacity-10 w-full p-2 tracking-wide text-right placeholder:text-white" defaultValue={product.price} onChange={(e) => {product.price = e; setProduct(product)}}/>
                                <span className="p-2">Kr</span>
                            </div>
                        </div>
                    
                    </div>

                    <div className="place-self-start justify-between flex flex-col rounded col-span-5 h-full w-full px-2">
                        <div className="flex flex-col m-2">
                            <label className="text-slate-700 font-semibold text-lg">Navn</label>
                            <input 
                                onChange={(name) => {
                                    if(product) product.name = name.target.value
                                }} 
                                className="w-full bg-gray-200 p-2 rounded-lg shadow-xl" 
                                name="name" type="text" 
                                defaultValue={product?.name || ""} 
                            />
                        </div>
                        <div className="flex flex-col m-2">
                            <label className="text-slate-700 font-semibold text-lg">Info </label>
                            <ProductInfo className="p-1 rounded-lg shadow-lg bg-black bg-opacity-10" product={product}/>
                        </div>
                        <div className="flex flex-col w-full h-56 place-self-end p-2">
                            <label className="text-slate-700 font-semibold text-lg">Beskrivelse </label>
                            <textarea 
                                onChange={(description) => product.version[0].description = description.target.value}
                                name="version.description" 
                                className="bg-gray-200 shadow-xl overflow-auto rounded p-2 flex-1" 
                                defaultValue={product.version[0].description}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}