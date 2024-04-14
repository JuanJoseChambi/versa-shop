
import { useState } from "react";

interface InputProp {
    placeholder?:string;
    name?:string;
    type?:string;
    defaultValue?:string;
    icon?:string;
    style?:string;
    styleDimensions?:string
    styleIcon?:string
    iconLeft?:boolean;
    iconRight?:boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}


const styleDefault:string = "w-full py-1 px-2 relative flex justify-between items-center gap-x-2 border border-neutral-400 outline-none bg-white rounded-md"

function Input({ placeholder, name, defaultValue = "",type = "text",  icon,  iconLeft = true, iconRight, styleIcon = "text-lg", style = styleDefault, styleDimensions, onChange}: InputProp) {

 
  const [show, setShow] = useState<boolean>(false)

  return (
    <div className={`${style} ${styleDimensions}`}>
        {iconLeft
          ? <i className={`${styleIcon} ${type === "password" ? (show ? "bx bx-show" : "bx bx-hide") : icon}`} onClick={() => setShow(!show)}></i> 
          : null}
        <label className="absolute -top-5 left-0 text-xs tracking-widest text-neutral-600">{name}</label>
        <input defaultValue={defaultValue} type={type === "password" ? (show ? "text" : "password") : type } className=" bg-transparent outline-none w-full no-eye-icon" placeholder={placeholder} onChange={onChange}  />

        {iconRight && !iconLeft
          ? <i className={`${styleIcon} ${type === "password" ? (show ? "bx bx-show" : "bx bx-hide") : icon}`} onClick={() => setShow(!show)}></i> 
          : null}
    </div>
  )
}

export default Input










 // const [styleInput, setStyleInput] = useState<boolean>(false)
{/* <label className={`${styleInput ? "-top-2 text-black transition-[color_top]" : "text-neutral-500"} absolute left-7 bg-white tracking-widest px-2  duration-1000`}>{placeholder}</label> */}
{/* onMouseDown={() => setStyleInput(true)} onMouseLeave={() => setStyleInput()}*/}