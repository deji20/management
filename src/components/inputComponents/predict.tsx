import { KeyboardEventHandler, MouseEventHandler, useState } from "react";
import Image from "../Image";

interface PredictProps{
    children?: JSX.Element
    predictFunc?:  (searchText: string) => string[] | Promise<string[]>;
    placeholder?: string;
    className?: string;
    onClick?: MouseEventHandler<HTMLLIElement>;
    onEnter?: KeyboardEventHandler<HTMLInputElement>;
    ref?: any;

}

export default function PredictInput(props: PredictProps){
    const [results, setResults] = useState<string[]>([])
    const [visible, isVisible] = useState(true); 
    let dropdown = (<div className="flex m-1 rounded-full hover:bg-gray-300 bg-opacity-50" onClick={() => isVisible(!visible)}><Image className={`flex transform transition-all duration-500 ${visible && results.length > 0 ? "-" : ""}rotate-180`} pictures={["/api/icons/arrow.svg"]}/> </div>)
    return(
        <div>
            <div className={`relative flex ${props.className}`}>
                <input type="text" className="px-2 text-sm w-full" 
                    onKeyDown={(e) => {
                        if(e.key === "Enter"){
                            e.preventDefault();
                            isVisible(false)
                            props.onEnter && props.onEnter(e)
                        }
                    }} 
                    onChange={async (event) => {
                        isVisible(true);
                        props.predictFunc && setResults(await props.predictFunc(event.target.value))
                    }
                }/>
                {dropdown}
            </div>
            <div className="relative z-50">
                <ul className="absolute w-full max-h-60 overflow-scroll">
                    {visible && results.map((result) => {
                        return (
                            <li className="border p-1 px-2 text-white text-bold tracking-widest bg-opactity-50 bg-purple-300 transition duration-100 hover:drop-shadow-xl hover:scale-105 hover:bg-opacity-100 hover:bg-blue-700" 
                                onClick={ (event) => {
                                    isVisible(false);
                                    props.onClick && props.onClick(event)
                                }}>
                                {result}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )

}