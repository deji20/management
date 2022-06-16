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
    const [imageNr, setImageNr] = useState<number>(0);
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
                        ratio: { x:1000, y:1000 },
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
        <div className="relative flex justify-center align-middle bg-gray-200 rounded-sm cursor-pointer h-full w-full">
            <div
                onClick={() => {
                    const filterImages = images.filter((img, i) => i != imageNr)
                    if(filterImages.length <= imageNr) setImageNr(filterImages.length - 1);
                    if(inputRef?.current){
                        const input = (inputRef.current as HTMLInputElement)
                        setImages(filterImages);
                        input.files && props.onInput && props.onInput(input?.files, filterImages);
                    };
                }} 
                className="absolute right-2 top-2 z-50 w-5 bg-red-900 bg-opacity-40 rounded-full hover:bg-opacity-80">
                <Image pictures={["/api/icons/delete.svg"]}/>
            </div>
            <input type="file" multiple={props.multiple} ref={inputRef} className="absolute w-full h-full hidden" onChange={fileUploadedEvent}/>
            { images.map( (imageInput, i) => <input name={props.inputName} key={i} type="hidden" value={JSON.stringify(imageInput)} /> ) }
            <Image local={images[imageNr] && images[imageNr].path.includes("data:image")} className="place-self-center" pictures={images} onChange={(pic, i) => setImageNr(i)} onClick={uploadFileEvent}/>
        </div>
    )
}