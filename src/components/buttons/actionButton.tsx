interface ButtonProps{
    title: string;
    iconSrc: string;
    onClick: () => void;
    className?: string
}

export default function ActionButton(props: ButtonProps){
    return (
        <div onClick={props.onClick} className={`${props.className} m-2 flex flex-col rounded-lg justify-center align-middle bg-blue-700  shadow-2xl text-white`}>
            <div className="w-full mt-2 flex justify-center">
                <img className="h-auto w-20 text-white"  src={props.iconSrc} alt={props.title}></img>
            </div>
            <p className="m-auto">{props.title}</p>
        </div>
    )
}