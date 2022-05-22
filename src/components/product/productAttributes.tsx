import { useEffect } from "react";
import { useState } from "react";
import { Attribute, ProductModel } from "../../models/productModel";
import Image from "../Image";

interface AttributeProps{
    attributes: Attribute[];
    onChange?: (attributes: Attribute[]) => void;
    className?: string;
}

export default function ProductAttributes(props: AttributeProps){
    const [attributes, setAttributes] = useState<Attribute[]>(props.attributes || [])

    useEffect(() => {
        setAttributes(props.attributes);
    }, [props.attributes])

    useEffect(() => {
        props.onChange && props.onChange(attributes);
    }, [attributes])

    return (
        <div className={props.className}>
            <table className="table-fixed text-sm text-left">
                {attributes.map((attribute, i) => {
                    return (
                        <tr key={i} className="flex">
                            <td className="w-1/4">
                                <input 
                                    className="w-full p-1 px-2 text-right rounded-l-lg bg-transparent" 
                                    type="text" 
                                    placeholder={attribute.name} 
                                    onChange={(event) => {
                                            attribute.name = event.target.value
                                            setAttributes(attributes);
                                        }} />
                            </td>
                            <td className="text-center">:</td>
                            <td className="flex flex-grow">
                                <input className="p-1 w-full px-2 rounded-r-lg" 
                                type="text" 
                                placeholder={attribute.value}
                                onChange={(event) => {
                                    attribute.value = event.target.value
                                    setAttributes(attributes);
                                }}
                                />    
                            </td>
                        </tr>
                    )
                })}
                <tr className="flex">
                    <td className="w-1/4"></td>
                    <td></td>
                    <td>
                        <button
                            className="w-10" 
                            onClick={() => setAttributes([...attributes, {name: "Name", value: "Value"}])}>
                            <Image pictures={["/api/icons/plus.svg"]}/>
                        </button>
                    </td>
                </tr>
            </table>
        </div>
    )
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