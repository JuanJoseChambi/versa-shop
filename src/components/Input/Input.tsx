
import { useState } from "react";

interface InputProp {
    placeholder?:string;
    name?:string;
    type?:string;
    defaultValue?:string;
    value?: string;
    icon?:string;
    style?:string;
    styleDimensions?:string;
    styleText?:string;
    styleIcon?:string
    iconLeft?:boolean;
    iconRight?:boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onClickIcon?: () => void;
}


const styleDefault:string = "rounded-sm p-1 focus:border-black"

function Input({ 
    placeholder, 
    name, 
    defaultValue = "",
    value,
    type = "text",  
    icon,  
    iconLeft, 
    iconRight, 
    style = styleDefault, 
    styleIcon = "text-lg", 
    styleText = "text-sm",
    styleDimensions = "w-full", 
    onChange,
    onClickIcon}: InputProp) {

 
  const [show, setShow] = useState<boolean>(false)

  return (
    <div className={`relative outline-none ${icon && "px-2"} gap-x-2 flex justify-between items-center bg-white border border-neutral-400 focus:border-black ${style} ${styleDimensions} ${styleText}`}>
        {iconLeft === true
          ? <i className={`${styleIcon} ${type === "password" ? (show ? "bx bx-show" : "bx bx-hide") : icon}`} onClick={() => {setShow(!show), onClickIcon}}></i> 
          : null}
        <label className="absolute -top-5 left-0 text-xs tracking-widest text-neutral-600">{name}</label>
        <input  value={value} defaultValue={defaultValue} type={type === "password" ? (show ? "text" : "password") : type } className=" bg-transparent outline-none w-full no-eye-icon" placeholder={placeholder} onChange={onChange}  />

        {iconRight === true
          ? <i className={`${styleIcon} ${type === "password" ? (show ? "bx bx-show" : "bx bx-hide") : icon}`} onClick={() => {setShow(!show), onClickIcon}}></i> 
          : null}
    </div>
  )
}

export default Input










 // const [styleInput, setStyleInput] = useState<boolean>(false)
{/* <label className={`${styleInput ? "-top-2 text-black transition-[color_top]" : "text-neutral-500"} absolute left-7 bg-white tracking-widest px-2  duration-1000`}>{placeholder}</label> */}
{/* onMouseDown={() => setStyleInput(true)} onMouseLeave={() => setStyleInput()}*/}