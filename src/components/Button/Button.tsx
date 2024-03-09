import { Link } from "react-router-dom"
import { ButtonProp } from "../../interfaces/interfaces"

function Button({text, icon, dir, style, onClick}: ButtonProp) {
  return (
    <button className={style} onClick={onClick}>
      <Link to={dir ? dir: "#"} className="flex justify-center items-center">
            <i className={`${icon}`}></i>
            {text ? text : null}
      </Link>
    </button>
    
  )
}
export default Button