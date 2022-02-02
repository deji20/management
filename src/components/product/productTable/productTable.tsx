import { ProductModel } from "../../../models/productModel";
import ProductRow from "./productRow";


interface ProductTableProps{
    products: ProductModel[]
}

export default function ProductTable(props: ProductTableProps){
    return (
        <table className="w-full h-48">
            <tbody className="h-48">
                {props.products?.map(product => {
                    return <ProductRow product={product} key={product._id}/>
                })}
            </tbody>
        </table>
    )
}