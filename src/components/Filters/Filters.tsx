import React from "react"
interface Colors {
    color: string
    hxacolor: string
}
interface FiltersProp {
    filter: (string | Colors)[];
    title:string;
    onClick?: (value: string | Colors) => void;
    select?: string;
}

function Filters({filter, title, onClick, select}:FiltersProp) {
  return (
    <div className="h-full relative px-2 py-2 flex-1 flex justify-center items-start flex-wrap gap-x-2 gap-2 text-sm bg-blued-500">
        <h2 className="w-full text-center absolute -top-5 text-sm text-neutral-500 tracking-widest">{title}</h2>
        {filter.map(option => (
            <React.Fragment key={typeof option === "object" ? option.color : option}>
                <label 
                    onClick={() => onClick && onClick(option)}
                    className={`
                    ${typeof option === "object" 
                    ? `w-[20px] h-[20px] rounded-full cursor-pointer ${select === option.color && "border-2 border-rose-600"}` 
                    : `cursor-pointer w-auto px-2 rounded-md border border-neutral-400 text-center ${select === option && "bg-neutral-400 text-white" }`} `} 
                    style={{backgroundColor : `${typeof option === "object" && option.hxacolor}`}} >
                        {typeof option === "object" ? null : option}
                </label>
            </React.Fragment>
        ))}
    </div>
  )
}

export default Filters