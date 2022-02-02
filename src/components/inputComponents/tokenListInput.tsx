import { KeyboardEvent, MouseEvent, useRef, useState } from "react";
import PredictInput from "./predict";

interface InputProps{
    inputName: string;
    placeholder?: string
    src?: string;
    values?: string[];
    submitable?: boolean;
    predict?: (input: string) => string[] | Promise<string[]>;
    tokenElement?: (name: string) => JSX.Element;
    onInput?: (input: string, tokens: string[]) => void;
    className?: string;
}

export default function TokenListInput(props: InputProps){
    const [tokens, setToken] = useState<string[]>(props.values || []);
    const inputRef = useRef(null);

    const keyboardEvent = (e: KeyboardEvent) => {
        e.preventDefault();
        //retrieving input value and updating token array state
        let input = e.target as HTMLInputElement
        const newArr = [...tokens, input.value]
        setToken(newArr);

        //calls the props callback function if it exists, passing the new input as well as the new array  
        props.onInput && props.onInput(input.value, newArr);
        //reset input
        input.value = "";
    }
    const clickEvent = (e: MouseEvent<HTMLLIElement>) => {
        const item = e.target as HTMLLIElement;
        if(item && item.innerText){
            let value = item.innerText
            const newArr = [...tokens, value]
            setToken(newArr);

            //calls the props callback function if it exists, passing the new input as well as the new array  
            props.onInput && props.onInput(value, newArr);
        }
    }

    const removeToken = (token: string) => {
        setToken(tokens.filter(t => t !== token));
    }

    return (
        <div className={"flex flex-col cursor-pointer h-full "}>
                {props.predict 
                    ? <PredictInput predictFunc={props.predict} className={`text-sm w-full border h-8 ${props.className}`} placeholder={props.placeholder} onEnter={keyboardEvent} onClick={clickEvent}/> 
                    : <input type="text" ref={inputRef} placeholder={props.placeholder} className={`px-2 m-2 text-sm w-full ${props.className}`} onKeyDown={keyboardEvent}/>}
                <fieldset name="tokens" className="flex flex-wrap justify-center text-xs">
                    {
                        tokens.map((token, i) => {
                            //if a custom token element generating function is given in props use that to create the token 
                            if(props.tokenElement){
                                return props.tokenElement(token)
                            }
                            // else use a default token element
                            else{
                                return (
                                    <div key={i} className="border flex align-middle rounded-lg h-5 pl-1 m-1 bg-blue-200 cursor-auto">
                                    <span className="relative flex flex-row ">
                                        {props.submitable && <input readOnly hidden name={props.inputName} value={token}/>}
                                        <span className="mx-1">{token}</span>
                                        <div className="flex rounded-r-lg hover:scale-125 p-1 duration-500 transition-all bg-red-400  cursor-pointer" onClick={ () => removeToken(token) } >
                                            <img src="/api/icons/delete.svg" alt="delete"/>
                                        </div>
                                    </span>
                                </div>
                            )}
                        })
                    }
                </fieldset>
        </div>
    )
}