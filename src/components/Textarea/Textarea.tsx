
interface TextareaProp {
    placeholder?:string;
    name?:string;
    defaultValue?:string;
    style?:string;
    styleDimensions?:string;
    styleColor?:string;
    onChange?:(e:React.ChangeEvent<HTMLTextAreaElement>) => void 
}

const styleDefault:string = "resize-none flex justify-between items-center gap-x-2 text-xs rounded-md bg-white"


function Textarea(
  {placeholder, 
    name, 
    defaultValue,
    style = styleDefault,
    styleDimensions = "w-full min-h-[85px]",
    onChange
  }: TextareaProp) {
  return (
    <div className={`relative py-1 px-2 border border-neutral-400 outline-none  ${style} ${styleDimensions}`}>
      <label className="absolute -top-5 left-0 text-xs tracking-widest text-neutral-600">{name}</label>
      <textarea defaultValue={defaultValue} className={`scroll w-full h-full resize-none outline-none `} placeholder={placeholder} onChange={onChange}></textarea>
    </div>
  )
}

export default Textarea