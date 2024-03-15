import { TooltipProp } from "../../interfaces/interfaces";


export default function Tooltip({ text, children }:TooltipProp) {
    return (
    <div className="group relative flex">
        {children}
        <span className="absolute top-10 w-auto scale-0 transition-[transform] rounded bg-gray-800 p-2 text-[10px] text-white group-hover:scale-100">{text}</span>
    </div>
    )
}
