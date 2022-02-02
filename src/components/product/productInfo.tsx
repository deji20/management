import { ProductModel } from "../../models/productModel";

interface InfoProps{
    product?: ProductModel;
    className?: string;
}

export default function ProductInfo(props: InfoProps){
    return (
        <div className={props.className}>
            <table className={"table-fixed text-sm text-left w-full"}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                        <th>Options</th> 
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Size:</td>
                        <td>
                            <select className="w-full">
                                <option>XXS</option>
                                <option>XS</option>
                                <option>S</option>
                                <option>M</option>
                                <option>L</option>
                                <option>XL</option>
                                <option>XXL</option>
                            </select>
                        </td>
                        <td>
                            <input className="w-full" type="checkbox"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Color:</td>
                        <td>
                            <input className="w-full" type="text"></input>
                        </td>
                        <td>
                            <input className="w-full" type="checkbox"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Material:</td>
                        <td>
                            <input className="w-full" type="text"/>
                        </td>
                        <td>
                            <input className="w-full" type="checkbox"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}