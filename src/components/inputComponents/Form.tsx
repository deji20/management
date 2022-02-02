import { FormEvent } from "react";

interface FormProps{
    onSubmit: (event: FormDataEvent) => void;
    children: any;
}

//interface that adds the parsed form data as an object passed to callback function
export interface FormDataEvent extends FormEvent{
    data?: {}
}

function parseArray(key: string, value: any, obj: any = {}){
    if((key.indexOf("[") === 0 && key.includes("]")) || obj[key]){
        key = key.replace("[", "").replace("]", "")
        if(Array.isArray(obj[key])){
            value = [...obj[key], value];
        }else{
            value = [value];
        }
    }
    return [key, value];
}

//recursivly parses objects based on the "." denominator
function parseObject(key: string, value: any, obj: any = {}): Object{
    if(key.includes(".")){
        let parent = key.slice(0, key.indexOf("."));
        key = key.substring(key.indexOf(".") + 1);
        [key, value] = parseArray(key, value, obj)
        obj[parent] = { ...obj[parent], ...parseObject(key, value) }
    }else{
        [key, value] = parseArray(key, value, obj)
        obj[key] = value;
    }
    return obj;
}
function parseKeys(formData: FormData){
    let obj: any = {};
    formData.forEach((value, key) => {
        if(typeof value === "string"){
            if(value[0] === "{") value = JSON.parse(value);
        }
        parseObject(key, value, obj)
    })
    return obj;
}

export default function Form(props: FormProps){
    //function that takes care of retrieving and formatting input fields
    function handleSubmit(e: FormEvent){
        e.preventDefault();
        //format input fields into a javascript object
        let formData = new FormData(e.target as HTMLFormElement);
        let obj = parseKeys(formData)

        let dataEvent = e as FormDataEvent;
        dataEvent.data = obj

        //pass new object into callback function
        props.onSubmit(dataEvent);
    }

    return(
        <form onSubmit={handleSubmit} onKeyDown={(e) => e.preventDefault}>
            {props.children}
        </form>
    )
}