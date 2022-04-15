import { Dispatch, MouseEvent, useEffect, useRef, useState } from "react";
import {FormDataEvent} from "../input/Form";
import Form from "../input/Form";
import Image from "../Image";

interface DialogProps{
    children: any;
    actions?: {
        icon:string, 
        className?: string, 
        onClick: (event: MouseEvent) => void
    }[];
    onSubmit?: (event: FormDataEvent, finished: Dispatch<boolean>) => void;
    onClose: (event: MouseEvent) => void;
}

export default function DialogComponent(props: DialogProps){
    //create a reference for the dialog wrapper 
    let dialogRef = useRef(null)

    //the dialog element
    let dialog = (
        <div className="flex flex-grow m-auto justify-center rounded-2xl shadow-2xl align-middle h-4/5 w-2/3">
            {props.children}
        </div>
    );
    //states for action buttons to rerender for with progress 
    const [submitActive, isSubmitActive] = useState(false)
    const [check, isCheck] = useState(false)
    //rerender on state changes
    useEffect(() => {
        submitActive && isCheck(submitActive)
        setTimeout(() => isCheck(false), 5000)
    }, [submitActive])
    //if an submit event is given the element is wrapped in a form with submit and cancel buttons
    if(props.onSubmit){
        dialog = (
            <Form onSubmit={(event) => {
                isSubmitActive(true);
                props.onSubmit && props.onSubmit(event, isSubmitActive)
                }}>
                <div className="flex flex-grow flex-col align-middle justify-center dialogClose">
                    {dialog}
                    <div className="absolute bottom-0 right-2 flex flex-col justify-evenly h-screen w-16 text-white">
                        <div className="flex flex-col">
                                {props.actions && props.actions.map(action => {
                                    return (
                                        <button className={`bg-opacity-50 hover:bg-opacity-100 p-2 mb-2 border rounded-full text-white transition-all duration-300 ${action.className}`} onClick={(e) => {
                                                e.preventDefault()
                                                action.onClick(e)
                                            }}>
                                            <Image className="flex" pictures={[action.icon]}/>
                                        </button>)
                                })}
                        </div>
                        <div className="flex flex-col">
                            <button className="bg-blue-500 bg-opacity-50 hover:bg-opacity-100 p-2 mb-2 border rounded-full text-white transition-all duration-300">
                                <Image className="flex" pictures={(submitActive && ["/api/icons/loading.gif"]) || (check && ["/api/icons/check.svg"]) || ["/api/icons/save.svg"]}/>
                            </button>
                            <button className="bg-red-500 bg-opacity-50 hover:bg-opacity-100 p-2 border rounded-full transition-all duration-300" onClick={props.onClose}>
                                <Image className="flex" pictures={["/api/icons/delete.svg"]}/>
                            </button>
                        </div>
                    </div>
                </div>
            </Form>
        )
    }

    function close(e:MouseEvent){
        if((e.target as HTMLElement).className.includes("dialogClose")){
            props.onClose(e);
        }
    }

    //visual effects that make the component pop onto screen using tailwind animation
    useEffect(() => {
        if(dialogRef.current){
            const elem = dialogRef.current as HTMLDivElement;
            elem.className = elem.className.replace("scale-0", "scale-100")
            elem.className = elem.className.replace("opacity-0", "opacity-100")
            
            return () => {
                elem.className = elem.className.replace("scale-100", "scale-0")
                elem.className = elem.className.replace("opacity-100", "opacity-0")
            }
        }
    });

    return (
    <div ref={dialogRef} onClick={close} className="fixed top-0 flex flex-col justify-center align-middle z-50  h-screen w-screen p-20 scale-0 opacity-0 transition-all duration-2000 dialogClose bg-black bg-opacity-25">
        {dialog}
    </div>
    )
}
