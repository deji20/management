import { Link } from "react-router-dom";

interface ButtonProps{
    title: string;
    iconSrc: string;
    onClick?: () => void;
    className?: string;
    link?: string;
}

export default function ActionButton(props: ButtonProps){
    const styling = `flex flex-col rounded-lg justify-center align-middle bg-blue-700 shadow-2xl text-white text-center ${props.className} `
    let button = (
        <div onClick={props.onClick} className={`${!props.link && styling}`}>
            <div className="w-full flex justify-center">
                <img className="h-auto w-20 text-white"  src={props.iconSrc} alt={props.title}></img>
            </div>
            <p className="m-auto">{props.title}</p>
        </div>);
    if(props.link) button = <Link className={styling} to={props.link}> {button} </Link>

    return button;
}