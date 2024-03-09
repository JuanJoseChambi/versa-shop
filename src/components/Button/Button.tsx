import { Link } from "react-router-dom"
import { ButtonProp } from "../../interfaces/interfaces"

function Button({text, icon, dir, style}: ButtonProp) {
  return (
    <button className={style} >
      <Link to={dir ? dir: "#"} className="flex justify-center items-center">
            <i className={`text-black ${icon}`}></i>
            {text ? text : null}
      </Link>
    </button>
    
  )
}
export default Button