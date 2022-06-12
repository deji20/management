import { Link } from "react-router-dom";
import Image from "../Image";

interface navProps{
    back?: string;
    className?: string;
    children?: any;
}
export default function NavBar(props: navProps){
    return (
        <div className={`sticky bg-black bg-opacity-70 h-10 flex flex-row justify-between w-screen text-white ${props.className}`}>
            {props.back && 
            <Link to={props.back} className="h-full">
                <div className="flex w-7 rounded-full -rotate-90 m-2">
                    <Image className="" pictures={["/api/icons/arrow-white.svg"]}/>
                </div>
            </Link>}
            {props.children}
        </div>);
}