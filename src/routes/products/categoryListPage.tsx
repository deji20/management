import Api from "../../api/api";
import { useEffect, useState } from "react";
import ActionButton from "../../components/buttons/actionButton";
import useSWR from "swr";

interface CategoryProps{
}

export default function CategoryListPage(props: CategoryProps){
    const {data: categories, error } = useSWR<string[]>("/product/categories", (key) => Api.get<string[]>(key));
    const {data: mainCategories, error: mainCategoriesError } = useSWR<string[]>("/category", (key) => Api.get<string[]>(key));

    console.log(mainCategories);
    console.log(categories);
    return (
        <table className="min-w-full min-h-max bg-gray-600 p-2 rounded table-auto">
            <tbody>
                <tr className="bg-gray-500 rounded-t-lg text-white">
                    <td className="p-2">Name</td>
                    <td className="w-min">Primary</td>
                    <td className="p-2">Delete</td>
                </tr>
                {categories && categories.map((category, i) => {
                    let isMain = (mainCategories && mainCategories.includes(category));
                    return (
                        <tr className="border-b last:border-none" key={i}>
                            <td className="p-2 ">
                                <p className="flex flex-grow capitalize text-white">
                                    {category}
                                </p>
                            </td>
                            <td className="w-min">
                                <input name="[category]" value={category} className="w-7 h-7 flex border cursor-pointer rounded-full checked:bg-blue-500" type={"checkbox"} defaultChecked={isMain} />
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