interface SectionTitleProps{
    title: string
}

export default function SectionTitle(props: SectionTitleProps){
    //const dividerSrc = "icons/branch.png"
    return (
        <div className="h-10 w-full flex flex-row align-middle">
            <span className="px-2 tracking-wide text-slate-700">{props.title}</span>       
        </div>
    )
}