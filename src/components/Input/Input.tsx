
interface InputProp {
    placeholder:string;
    type?:string;
    icon?:string;
    style?:string;
    styleIcon?:string
    iconLeft?:boolean;
    iconRight?:boolean;
}


const styleDefault:string = "w-[95%] py-1 px-2 flex justify-between items-center gap-x-2 text-xs rounded-lg border border-neutral-400 outline-none bg-white"

function Input({ placeholder,  type = "text",  icon,  iconLeft = true, iconRight, styleIcon = "text-sm",style = styleDefault, }: InputProp) {
  return (
    <div className={style}>
        {iconLeft && !iconRight ? <i className={`${styleIcon} ${icon}`}></i> : null}
        <input type={type} className="bg-transparent outline-none w-full" placeholder={placeholder}/>
        {iconRight && !iconLeft? <i className={`${styleIcon} ${icon}`}></i> : null}
    </div>
  )
}

export default Input