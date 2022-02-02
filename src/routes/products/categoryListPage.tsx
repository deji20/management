import Api from "../../api/api";
import { useEffect, useState } from "react";
import ActionButton from "../../components/buttons/actionButton";

interface CategoryProps{
}

export default function CategoryListPage(props: CategoryProps){
    let [categories, setCategories] = useState<string[]>([]);
    let [mainCategories, setMainCategories] = useState<string[]>([]);
    useEffect(() => {
        (async () => {
            let result = await Api.get<string[]>("/product/categories");
            let main = await Api.get<string[]>("/category");

            //convert to set to avoid overlap
            setCategories(Array.from(new Set([...result, ...main])));
            setMainCategories(main);
        })()
    }, [])

    return (
        <table className="min-w-full min-h-max bg-white p-2 rounded-b">
            <tbody>
                <tr className="bg-gray-500 rounded-t-lg text-white">
                    <td className="p-2">Name</td>
                    <td>Primary</td>
                    <td className="p-2">Delete</td>
                </tr>
                {categories.map((category, i) => {
                    let isMain = mainCategories.includes(category);
                    return (
                        <tr className="border-b" key={i}>
                            <td className="p-2 ">
                                <p className="flex flex-grow capitalize">
                                    {category}
                                </p>
                            </td>
                            <td className="w-10">
                                <input name="[category]" value={category} className="p-3 flex m-auto border cursor-pointer rounded-full checked:bg-blue-500" type={"checkbox"} defaultChecked={isMain} />
                            </td>
                            <td className="w-10">
                                <img src="/api/icons/trash.svg" className="w-8 m-auto text-red-800" alt="Delete" />
                            </td>
                        </tr>)
                })}
            </tbody>
        </table>
    )
}