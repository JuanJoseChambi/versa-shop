
interface TextareaProp {
    placeholder:string;
    name?:string;
    style?:string;
    styleDimensions?:string;
    styleColor?:string;
}

const styleDefault:string = "resize-none flex justify-between items-center gap-x-2 text-xs rounded-md bg-white"


function Textarea(
  {placeholder, 
    name, 
    style = styleDefault,
    styleDimensions = "w-full min-h-[85px]"
  }: TextareaProp) {
  return (
    <div className={`relative py-1 px-2 border border-neutral-400 outline-none  ${style} ${styleDimensions}`}>
      <label className="absolute -top-5 left-0 text-xs tracking-widest text-neutral-600">{name}</label>
      <textarea className={`w-full h-full resize-none outline-none `} placeholder={placeholder}></textarea>
    </div>
  )
}

export default Textarea