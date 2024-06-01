import React from "react"
export interface Colors {
    color: string
    hxacolor: string
}
interface FiltersProp {
    filter: (string | Colors)[];
    title:string;
    styleTitle?:string;
    onClick?: (value: string | Colors) => void;
    select?: string | string[];
    maxWidth?:string
}

function Filters({filter, title, styleTitle, onClick, select, maxWidth}:FiltersProp) {

    const styleDefault = "-top-5 text-sm text-neutral-500 tracking-widest"

  return (
    <div className={`${maxWidth} h-full relative px-2 py-2 flex-1 flex justify-center items-start flex-wrap gap-x-2 gap-2 text-sm bg-blued-500`}>
        <h2 className={`w-full text-center absolute ${styleTitle ? styleTitle : styleDefault}`}>{title}</h2>
        {filter.map(option => (
            <React.Fragment key={typeof option === "object" ? option.color : option}>
                <label 
                    onClick={() => onClick && onClick(option)}
                    className={`
                    ${typeof option === "object" 
                        ? `w-[20px] h-[20px] rounded-full cursor-pointer 
                            ${typeof select === "string" && select === option.color && "border-2 border-rose-600"}
                            ${Array.isArray(select) && select.includes(option.color) && "border-2 border-rose-600 " }
                            ` 
                        : `cursor-pointer w-auto px-2 rounded-sm text-neutral-800 border border-neutral-400 text-center 
                            ${typeof select === "string" && select === option && "bg-neutral-500 text-white" }`}
                            ${Array.isArray(select) && select.includes(option as string) && "bg-neutral-500 text-white" }`
                    } 
                    style={{backgroundColor : `${typeof option === "object" && option.hxacolor}`}}>
                        {typeof option === "object" ? null : option}
                </label>
            </React.Fragment>
        ))}
    </div>
  )
}

export default Filters