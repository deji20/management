import { useEffect } from "react";
import { useState } from "react";

interface InputProps{
    value: number;
    onChange?: (value: number) => void;
    className?: string;
}

export default function NumberInput(props: InputProps){
    const [value, setValue] = useState<number>(props.value)

    useEffect(() => {
        setValue(props.value); 
    }, [props.value])

    useEffect(() => {
        props.onChange && props.onChange(value) 
    }, [value])

    return (
        <input 
            type="text" 
            className={props.className}
            value={value} 
            pattern="[0-9]*"
            onChange={
                (event) => {
                    const input = event.target as HTMLInputElement;
                    if(input.validity.valid && input.value){
                        setValue(Number.parseInt(input.value));
                    }else if(!input.value){
                        setValue(0);
                    }else{
                        event.preventDefault()
                    };
                }
            } 
        />
    )
}