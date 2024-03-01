import { ButtonProp } from "../../interfaces/interfaces"

function Button({text, icon, dir, style}: ButtonProp) {
  return (
    <button className={style}>
        <a href={dir} className="flex justify-center items-center">
            <i className={`text-black ${icon}`}></i>
            {text ? text : null}
        </a>
    </button>
    
  )
}

export default Button