interface SectionTitleProps{
    title: string
}

export default function SectionTitle(props: SectionTitleProps){
    //const dividerSrc = "icons/branch.png"
    return (
        <div className="h-10 w-full flex flex-row align-middle">
            <span className="m-auto text-lg">{props.title}</span>       
        </div>
    )
}