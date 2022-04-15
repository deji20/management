import { useState } from "react";

interface InputProps{
    defaultValue?: number;
    onChange?: (value: number) => void;
    className?: string;
}

export default function NumberInput(props: InputProps){
    const [value, setValue] = useState<number>(props.defaultValue || 0);

    return (
        <input 
            type="text" 
            className={props.className} 
            value={value.toString()} 
            pattern="[0-9]*"
            onChange={
                (event) => {
                    const input = event.target as HTMLInputElement;
                    if(input.validity.valid && input.value){
                        setValue(Number.parseInt(input.value));
                        props.onChange && props.onChange(value);
                    }else if(!input.value){
                        setValue(0);
                        props.onChange && props.onChange(value);
                    }else{
                        event.preventDefault()
                    };
                }
            } 
        />
    )
}