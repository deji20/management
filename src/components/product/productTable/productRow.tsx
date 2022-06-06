import { ReactElement, useState } from "react";
import { ProductModel } from "../../../models/productModel";
import Image from "../../Image";
import { useNavigate } from "react-router-dom";


export default function ProductRow(props: {product: ProductModel}){
    const [product, updateProduct] = useState<ProductModel>(props.product);
    const nav = useNavigate();

    let picture;
    if(product.version?.length > 0 && product.version[0].pictures && product.version[0].pictures[0]){
        picture = product.version[0].pictures[0];
        picture.path = `${product.version[0].pictures[0].path}`;
    }

    return (
        <tr 
            onClick={() => product.id && nav(product.id)}
            className="my-1 child:border-gray-800 child:border-r place-items-center h-min border-gray-800 text-white text-center cursor-pointer font-light border-t bg-opacity-20 bg-gray-500  hover:bg-opacity-30 first:border-t-none ">
            <td className="w-min">
                <p>{product.id}</p>
            </td>
            <td className="">
                    <p>{product.name}</p>
            </td>
            <td className="border-gray-800 border-r">
            <p>{product.price}<sub className="text-2xs">KR</sub></p>
            </td>
            <td className="border-gray-800 border-r w-min">
                <p>{
                product?.version.reduce<number>((prev, version)  => prev += version.amount, 0) || 0
                }</p>
            </td>
            <td className="border-gray-800 border-r">
                <div className="flex justify-center flex-wrap">
                    {product.categories?.map((token, i) => {
                        return(
                            <div key={i} className="w-min shadow-2xl rounded-lg m-1 px-2 py-1 bg-blue-800">
                                <span className="text-xs tracking-wider text-white">
                                    {token}
                                </span>
                            </div>)
                    })}
                </div>
            </td>
            <td className="border-gray-800 border-r">
                <Image className="m-auto" pictures={picture && [picture]}/>
            </td>
        </tr>
    )
}