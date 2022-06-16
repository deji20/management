import TokenListInput from "../../components/input/tokenListInput";
import ImageInput from "../../components/input/imageInput";
import { ProductModel, Version } from "../../models/productModel";
import ProductAttributes from "../../components/product/productAttributes";
import Api from "../../api/api";
import UseSwr from "swr";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Image from "../../components/Image";
import NavBar from "../../components/navigation/navBar";
import NumberInput from "../../components/input/numberInput";
import { versions } from "process";

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

    const [product, setProduct] = useState<ProductModel>({
        name: "",
        price: 0,
        categories: [],
        version: [{
            amount: 0, 
            description:"",
            attributes: [],
            pictures:[]
        }]
    });
    const [versionNr, setVersionNr] = useState<number>(0);
   
    // sets the product state if database query is successful 
    useEffect(() => {
        !productError && prod && setProduct(prod);
    }, [prod]);

    function clone<T>(obj: Object): T{
        return JSON.parse(JSON.stringify(obj)) as T;
    }
    return (
        <div className="bg-blue-500 min-h-screen w-screen flex align-middle flex-col">
            <NavBar back="/products">
                <div className="flex flex-row justify-end p-1">
                    <button 
                        className="bg-red-800 w-10 bg-opacity-50 hover:bg-opacity-100 rounded transition-all duration-300" 
                        onClick={async () => {
                            if(product.id){
                                let result = await Api.delete("/product", product.id)
                                nav("/products")
                            }}
                        }>
                        <Image className="flex p-1" pictures={["/api/icons/trash.svg"]}/>
                    </button>
                    <button 
                        className="bg-blue-800 w-10 bg-opacity-50 hover:bg-opacity-100 rounded mx-5 transition-all duration-300" 
                        onClick={() => {
                                if(product.id) Api.patch<ProductModel>("/product", product.id, product).then(res => res && setProduct(res));
                                else Api.post<ProductModel>("/product", product).then(res => res && setProduct(res));
                            }}>
                        <Image className="flex p-1" pictures={["/api/icons/save.svg"]}/>
                    </button>
                </div>
            </NavBar>
            <div className="flex md:p-20 w-2/3 place-self-center">
                <div className="w-full h-full relative grid grid-cols-4 md:grid-cols-8 bg-gray-100 rounded rounded-tr-none shadow-2xl">
                    <div className="flex flex-1 flex-col col-span-4 md:grid-cols-4 h-full">
                        <div className="flex justify-center h-64 w-full">
                            <ImageInput 
                                onInput={
                                (file, allImages) => {
                                    if(product) product.version[versionNr].pictures = allImages;
                                }} 
                                multiple 
                                inputName="[pictures]"  
                                images={ product.version[versionNr].pictures }
                            />
                        </div>

                        <div className="p-2">
                            <label className="text-slate-700 font-semibold text-lg">Kategorier </label>
                            <TokenListInput
                                onInput={(token, tokens) => {
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
                                <NumberInput 
                                    className="font-light bg-white bg-opacity-10 w-full p-2 tracking-wide text-right placeholder:text-white" 
                                    value={product.price} 
                                    onChange={(e) => {product.price = e; setProduct(product)}}/>
                                <span className="p-2">Kr</span>
                            </div>
                        </div>
                    </div>

                    <div className="place-self-start justify-between flex flex-col rounded col-span-4 h-full w-full px-2">
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
                            <ProductAttributes 
                                className="w-full p-1 rounded-lg shadow-lg bg-black bg-opacity-10" 
                                onChange={(attributes) => product.version[versionNr].attributes = attributes}
                                attributes={product.version[versionNr].attributes}/>
                        </div>
                        <div className="flex flex-col w-full h-56 place-self-end p-2">
                            <label className="text-slate-700 font-semibold text-lg">Beskrivelse </label>
                            <textarea 
                                onChange={(description) => product.version[versionNr].description = description.target.value}
                                name="version.description" 
                                className="bg-gray-200 shadow-xl overflow-auto rounded p-2 flex-1" 
                                defaultValue={product.version[versionNr].description}/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-end">
                    <ul className="bg-opacity-50">
                        {product.version.map((version, i) => {
                            return (
                                <li key={i} onClick={() => setVersionNr(i)} className={"bg-blue-500 rounded-r-lg mb-1 cursor-pointer hover:bg-opacity-60 text-white bg-opacity-40 w-full p-2 px-4 shadow-xl " + (i == versionNr && "bg-opacity-70")}>
                                    <p className="px-2 cursor-pointer whitespace-nowrap">Version {i + 1}</p>
                                </li>
                            )
                        })}
                        <li>
                            <Image onClick={() => {
                                let newProd = clone<ProductModel>(product)
                                newProd.version = [...product.version, clone<Version>(product.version[versionNr])];
                                setProduct(newProd);
                            }} className="w-10 m-auto" pictures={["/api/icons/plus.svg"]}/>
                        </li>
                    </ul>
                    <div className="flex flex-grow justify-evenly">
                        <div className="flex flex-col w-28">
                            <h1 className="text-lg text-white bg-white bg-opacity-10 text-center rounded-t">Amount</h1>
                            <div className="flex flex-row w-full place-items-end place-self-end self-end bg-black bg-opacity-30 rounded-b text-white ">
                                <NumberInput 
                                    className="font-light bg-white bg-opacity-10 w-full p-2 tracking-wide text-right placeholder:text-white" 
                                    value={product.version[versionNr].amount} 
                                    onChange={(e) => {
                                        product.version[versionNr].amount = e; 
                                        setProduct(product)
                                    }}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}