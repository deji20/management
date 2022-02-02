import { ReactElement, useState } from "react";
import Api from "../../../api/api";
import { ProductModel } from "../../../models/productModel";
import ProductDetailsPage from "../../../routes/products/productDetailsPage";
import DialogComponent from "../../dialogs/baseDialog";
import ProductInfo from "../productInfo";
import Image from "../../Image";


export default function ProductRow(props: {product: ProductModel}){
    const [dialog, ShowDialog] = useState<ReactElement | null>();
    const [product, updateProduct] = useState<ProductModel>(props.product);

    let picture;
    if(product.version?.length > 0 && product.version[0].pictures && product.version[0].pictures[0]){
        picture = product.version[0].pictures[0];
        picture.path = `${product.version[0].pictures[0].path}`;
    }

    function update(){ 
        ShowDialog(
            <DialogComponent
                onClose={() => {
                    ShowDialog(null);
                }}
                actions={[
                    {
                        icon: "/api/icons/trash.svg",
                        className: "bg-red-800",
                        onClick: async () => {
                            let result = await Api.delete<ProductModel>("/product", product._id);
                            ShowDialog(null);
                        }
                    }
                ]}
                onSubmit={async (e: any) => {
                    if(e.data){
                        e.data.version.pictures = e.data.pictures;
                        delete e.data.pictures;
                        let data: any = e.data;
                        const newProduct = await Api.patch<ProductModel>("/product", product._id , data as ProductModel);
                        updateProduct(newProduct);
                        ShowDialog(null);
                    }
                }}>
                <ProductDetailsPage product={product}/>
            </DialogComponent>
        );
    }
    return (
        <tr  onClick={update}>
            <td className="bg-gray-500 rounded-xl m-4 grid grid-cols-5 place-items-center cursor-pointer">
            {dialog}
                <div className="text-center text-white">
                    <p>{product.name}</p>
                </div>
                <div className="flex flex-wrap text-center">
                    {product.categories?.map((token, i) => {
                        return(
                            <div key={i} className="border rounded-lg m-1 px-1 bg-blue-200">
                                <span className="text-xs">
                                    {token}
                                </span>
                            </div>)
                    })}
                </div>
                <div className="flex flex-wrap text-center text-white">
                    <p>{product.price}<sub className="text-sm">Kr</sub></p>
                </div>
                <div className="flex flex-wrap text-center">
                    <ProductInfo className="flex flex-grow justify-center text-white rounded-xl w-full" product={product}/>
                </div>
                <div className="flex flex-wrap text-center">
                        <Image className="m-auto h-28" pictures={picture && [picture]}/>
                </div>
            </td>
        </tr>
    )
}