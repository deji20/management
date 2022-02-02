import { MouseEventHandler, useState } from "react"
import { Picture } from "../models/productModel";

interface ImageProps{
    className?: string;
    pictures?: Picture[] | string[];
    onClick?: MouseEventHandler<HTMLImageElement>;
}

export default function Image(props: ImageProps){
    const [imageNr, setImage] = useState(0)

    
    const fallBack = (img: any) => {
        //img.target.src = `${PUBLIC_API}/icons/blankImage.svg`;
        console.log(img.target.src);
        img.target.src = `/api/icons/blankImage.svg`;
    }
    let image;
    
    //changes image styling depending on if it uses the default blank image or not
    if(props.pictures && props.pictures?.length !== 0) {
        if(typeof props.pictures[imageNr] === "string") image = <img src={`${props.pictures[imageNr]}`} alt={"straight"} className={"place-self-center max-h-full"}/>
        else{
            const img = props.pictures[imageNr] as Picture;
            image = <img src={img.path} alt={img.alt} className={"place-self-center max-h-full"} onClick={props.onClick} onError={fallBack}/>
        }
    }
    else{ 
        image = <img src={`/api/icons/blankImage.svg`} alt={"Not Found"} className={"place-self-center h-1/6"} onClick={props.onClick}/>
    }
    
    
    return (
        <div className={`relative flex ${props.className}`} >
            <div className="absolute bottom-4 w-full flex flex-row justify-center">
                {props.pictures && props.pictures.length > 1 && props.pictures.map((image, i) => {
                    return (<div key={i} className="h-2 w-2 mx-2 rounded-full bg-opacity-90 bg-white hover:bg-opacity-100" 
                        onClick={(e) => {
                            e.preventDefault()
                            setImage(i);
                        }
                        }></div>)
                })}
            </div>
            {image}
        </div>
    )
}