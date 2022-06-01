import { MouseEventHandler, useState } from "react"
import { Picture } from "../models/productModel";

interface ImageProps{
    className?: string;
    pictures?: Picture[] | string[];
    onClick?: MouseEventHandler<HTMLImageElement>;
    onChange?: (picture: Picture | string, index: number) => void;
}

export default function Image(props: ImageProps){
    const [imageNr, setImage] = useState(0)
    let image;

    //ensures a change in picture props doesnt cause overflow for imageNr
    if(props.pictures && imageNr >= props.pictures?.length && imageNr != 0) setImage(props.pictures.length - 1)
    //changes image styling depending on if it uses the default blank image or not
    if(props.pictures && props.pictures?.length !== 0 && props.pictures?.length > imageNr) {
        if(typeof props.pictures[imageNr] === "string") image = <img src={`${props.pictures[imageNr]}`} alt={"straight"} onClick={props.onClick} className={`place-self-center max-h-full ${props.onClick && "cursor-pointer"}`}/>
        else{
            const img = props.pictures[imageNr] as Picture;
            image = <img src={"http://localhost/api" + img.path} alt={img.alt} onClick={props.onClick} className={`place-self-center max-h-full ${props.onClick && "cursor-pointer"}`}/>
        }
    }
    else{ 
        image = (
            <div className="h-full w-full flex justify-center" onClick={props.onClick}>
                <img src={`/api/icons/blankImage.svg`} alt={"Not Found"} className={`place-self-center w-1/6 h-1/6 ${props.onClick && "cursor-pointer"}`} onClick={props.onClick}/>
            </div>
        )
    }
    
    
    return (
        <div className={`relative flex h-full w-full ${props.className}`}>
            <div className="absolute bottom-4 w-full flex flex-row justify-center">
                {props.pictures && props.pictures.length > 1 && props.pictures.map((image, i) => {
                    return (<div key={i} className="p-2 mx-2 rounded-full bg-opacity-60 bg-black transition-all hover:bg-white hover:scale-150 hover:bg-opacity-100" 
                        onClick={(e) => {
                            e.preventDefault()
                            setImage(i);
                            if(props.pictures?.[i] && props.onChange) props.onChange(props.pictures[i], i)
                        }
                        }></div>)
                })}
            </div>
            {image}
        </div>
    )
}