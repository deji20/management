import { ChangeEvent, useEffect, useRef, useState } from "react"
import { Picture } from "../../models/productModel";
import Image from "../Image";

interface InputProps{
    inputName: string
    src?: string
    images?: Picture[];
    multiple?: boolean
    onInput?: (input: FileList, images: Picture[]) => void,
}

export default function ImageInput(props: InputProps){
    const [images, setImages] = useState<Picture[]>(props.images || []);
    const inputRef = useRef(null);

    //refreshes image state if props are updated
    useEffect(() => {
        props.images && setImages(props.images);
    }, [props.images]);

    
    let toBase64 = (files: FileList) => {
        for(let i = 0; i < files.length; i++){
            let reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onload = function () {
                if(typeof reader.result === "string"){
                    let res = reader.result;
                    let picture: Picture = {
                        path: res,
                        ratio: { x:100, y:100 },
                        alt: files[i].name,
                        mime: files[i].type,
                    }
                    images.push(picture);
                    setImages([...images]);
                }else{
                    throw new Error("input image couldnt be converted to base 64");
                }
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
    }

    //event handles when picture is clicked
    let uploadFileEvent = () => {
        if(inputRef.current){
            const input = (inputRef.current as HTMLInputElement);
            input.click();
        }
    }
    //event handeling when file has been uploaded
    let fileUploadedEvent = (e: ChangeEvent) => {
        const input = (e.target as HTMLInputElement);
        if(input.files){
            //updating images state adding the new image
            toBase64(input.files);
            props.onInput && props.onInput(input.files, images);
        }
    }

    return (
        <div className="relative flex justify-center align-middle bg-gray-200 rounded-sm cursor-pointer h-full">
            <input type="file" multiple={props.multiple} ref={inputRef} className="absolute w-full h-full hidden" onChange={fileUploadedEvent}/>
            { images.map( (imageInput, i) => <input name={props.inputName} key={i} type="hidden" value={JSON.stringify(imageInput)} /> ) }
            <Image className="place-self-center" pictures={images} onClick={uploadFileEvent}/>
        </div>
    )
}