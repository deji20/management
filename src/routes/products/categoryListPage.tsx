import Api from "../../api/api";
import useSWR from "swr";
import { useState } from "react";
import Image from "../../components/Image";
import ImageInput from "../../components/input/imageInput";

export default function CategoryListPage(){
    const {data: categories, error } = useSWR<string[]>("/product/categories", (key) => Api.get<string[]>(key));
    const {data: mainCategories, error: mainCategoriesError } = useSWR<string[]>("/category", (key) => Api.get<string[]>(key));

    const [edit, setEdit] = useState<string>("");
    return (
        <div className="w-full h-full min-h-[20rem] bg-gray-600 rounded flex flex-col gap-2 text-white text-center">
            <div className="bg-black bg-opacity-50 grid grid-cols-3 h-min ">
                <p className="">Name</p>
                <p className="">Primary</p>
                <p className=""></p>
            </div>
            <div className="h-full w-full flex flex-col gap-1">
                {categories && categories.map((category, i) => {
                    let isMain = (mainCategories && mainCategories.includes(category));
                    let active = category === edit
                    return (
                        <div className="border-b ">
                            <div className="grid grid-cols-3 text-center border-b last:border-none shadow" key={i}>
                                <p className="capitalize text-center">{category}</p>
                                <div className="flex w-min m-auto">
                                    <input name="[category]" value={category} className="p-2 m-auto flex border cursor-pointer rounded-full checked:bg-blue-500" type={"checkbox"} defaultChecked={isMain} />
                                </div>
                                <img src="/api/icons/arrow-white.svg" className={(active ? "rotate-180" : "rotate-90") +" w-8 mr-0 ml-auto text-red-800"} alt="Show More" onClick={() => !active ? setEdit(category) : setEdit("")} />
                            </div>
                            {active && (
                                <div className="flex flex-row">
                                    <div className="grid grid-cols-4 justify-evenly w-full">
                                        <div className="p-3 h-52 col-span-1">
                                            <ImageInput inputName="image"/>
                                        </div>
                                        <div className="col-span-3 p-3 text-black">
                                            <textarea className="h-full w-full p-2 " placeholder="Beskrivelse"/>
                                        </div>
                                    </div>
                                    <div className="p-2 w-min">
                                        <div className="mr-0 ml-auto w-6">
                                            <img src="/api/icons/trash.svg"/>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}