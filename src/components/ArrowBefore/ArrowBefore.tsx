import { useState } from "react";
import { Link } from "react-router-dom"

interface ArrowBeforeProp {
    redirect:string;
    style?:string;
    text?:string;
    icon?:string
    styleIcon?:string;
}

const iconDefault = "bx bxs-chevron-left"
const styleDefault = "absolute top-3 left-4 text-sm flex justify-center items-center gap-x-1"
const styleIconDefault = "text-2xl"


function ArrowBefore({redirect, style = styleDefault ,text, icon = iconDefault, styleIcon = styleIconDefault} :ArrowBeforeProp) {
    const [hover, setHover] = useState(false)

  return (
    <div className={style} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        
            <Link to={redirect}>
                <i className={`${styleIcon} ${icon}`}></i>
            </Link> 

        <Link to={redirect} >
            {text}
            <div className={`${hover ? "w-full" : null} w-0 min-h-[1px] bg-neutral-800 transition-[width] duration-500`}></div>
        </Link>
    </div>
  )
}

export default ArrowBefore