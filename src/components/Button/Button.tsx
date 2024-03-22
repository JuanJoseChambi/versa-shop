import { Link } from "react-router-dom"
import { ButtonProp } from "../../interfaces/components"


function Button({text, icon, dir, style, onClick, img}: ButtonProp) {

  const styleImage = "flex justify-center items-center w-[35px] h-[35px] bg-blue-500 rounded-full"
  
  return (
    <button className={img ? styleImage : style} onClick={onClick}>
      <Link to={dir ? dir: "#"} className=" flex justify-center items-center">
            {icon && <i className={`${icon}`}></i>}         
            {text && text}
            {img && <img src={img} alt={img} className="w-full object-cover"/>}
      </Link>
      
    </button>
    
  )
}
export default Button