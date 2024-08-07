import { useState } from "react";
import { Link } from "react-router-dom"

interface ArrowBeforeProp {
    redirect?:string;
    style?:string;
    stylePosition?:string;
    styleText?:string;
    text?:string;
    icon?:string
    styleIcon?:string;
    onClick?:() => void
}

const iconDefault = "bx bxs-chevron-left"
const styleDefault = " text-sm flex justify-center items-center gap-x-1 z-10";
const stylePositionDefault = "absolute top-3 left-4"
const styleTextDefault = "text-black"
const styleIconDefault = "text-2xl"


function ArrowBefore({redirect, styleText = styleTextDefault, stylePosition = stylePositionDefault , style = styleDefault ,text, icon = iconDefault, styleIcon = styleIconDefault, onClick} :ArrowBeforeProp) {
    const [hover, setHover] = useState(false)

  return (
    <div className={`${style} ${stylePosition} ${styleText}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={onClick}>
        
            <Link to={redirect || "#"}>
                <i className={`${styleIcon} ${icon}`}></i>
            </Link> 

        <Link to={redirect || "#"} >
            {text}
            <div className={`${hover ? "w-full" : null} w-0 min-h-[1px] bg-neutral-800 transition-[width] duration-500 z-10`}></div>
        </Link>
    </div>
  )
}

export default ArrowBefore