import { Link } from "react-router-dom"
import { ButtonProp } from "../../interfaces/components"


function Button({text, iconLeft, iconRight, dir, style, onClick, img}: ButtonProp) {

  const styleImage = "flex justify-center items-center w-[35px] h-[35px] bg-slate-300 rounded-full"
  
  return (
    <button className={img ? styleImage : style} onClick={onClick}>
      <Link to={dir ? dir: "#"} className=" flex justify-center items-center">
            {iconLeft && <i className={`${text ? "scale-150 mr-2" : ""} ${iconLeft}`}></i>}         
            {text && text}
            {iconRight && <i className={`${text ? "scale-150 mr-2" : ""} ${iconRight}`}></i>}         
            {img && <img src={img} alt={img} className="w-full object-cover"/>}
      </Link>
      
    </button>
    
  )
}
export default Button