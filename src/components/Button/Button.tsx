import { Link } from "react-router-dom"
import { ButtonProp } from "../../interfaces/components"
import { useState } from "react"


function Button({text, iconLeft, iconRight, dir, style, styleIcon, onClick, img, hover, disable}: ButtonProp) {
  const [hoverButton, setHoverButton] = useState<boolean>(false)
  const [loader, setLoader] = useState(false)
  const styleImage = "flex justify-center items-center w-[35px] h-[35px] bg-slate-300 rounded-full"
  
  return (
    <Link to={dir ? dir : "#"} className={`relative ${img ? styleImage : `${style} ${disable && "pointer-events-none select-none bg-neutral-400 text-neutral-300"}`}`} onClick={onClick} onMouseEnter={() => setHoverButton(true)} onMouseLeave={() => setHoverButton(false)}>
        <div className="flex justify-center items-center">
          {iconLeft && <i className={`${text ? `scale-150 mr-2 ${styleIcon}` : ""} ${iconLeft}`}></i>}
          { !disable && text }
          { disable && (setTimeout(() => {setLoader(true)}, 3000)) && (loader ? text : <i className="bx bx-loader-alt bx-spin"></i>)}

          <div className={`${hover && hoverButton ? "w-full": "w-0"} absolute bottom-0 h-[1px] bg-blue-500  transition-[width] duration-500`}></div>
          {iconRight && <i className={`${text ? `scale-150 ml-2 ${styleIcon}` : ""} ${iconRight}`}></i>}
          {img && <img src={img} alt={img} className="w-full object-cover" />}
        </div>
    </Link>
  );
}
export default Button