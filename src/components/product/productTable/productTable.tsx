import { ProductModel } from "../../../models/productModel";
import ProductRow from "./productRow";


interface ProductTableProps{
    products: ProductModel[]
}

export default function ProductTable(props: ProductTableProps){
    return (
        <table className="w-full h-48  border-collapse">
            <tbody className="h-min">
                <tr className="text-white bg-gray-800">
                    <th className="w-1/12 h-min py-3">Name</th>
                    <th className="w-1/12">Price</th>
                    <th className="w-1/12">Amount</th>
                    <th></th>
                    <th>Categories</th>
                    <th className="w-1/12"></th>
                </tr>
                {props.products?.map(product => {
                    return <ProductRow product={product} key={product._id}/>
                })}
            </tbody>
        </table>
    )
}