import { FilterField } from "../../models/filter";

interface HeaderProps{
    name: string;
    className?: string;

    filterName?: string;
    onChange?: (filter: FilterField) => void;
}

export default function HeaderField(props: HeaderProps){
    return (
        <th className={`bg-black bg-opacity-70 border-r border-opacity-10 ${props.className}`}>
            <div className="flex w-full p-1 text-lg tracking-wider font-light">
                {props.onChange ? (
                    <div className="flex flex-col-reverse">
                        <input name={props.name} placeholder="Id" className="peer pl-2 bg-transparent border-b border-white" type="text" onKeyUp={(elem) => props.onChange && props.onChange(new FilterField(props.filterName || props.name, elem.currentTarget.value))}/>
                        <label className="overflow-hidden w-full text-left pl-2 text-gray-400  transform duration-500 h-7 peer-placeholder-shown:h-0">{props.name}</label>
                    </div>
                ): (
                    <p>{props.name}</p>
                )}
                
            </div>
        </th>
    )
}