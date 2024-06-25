
interface TextareaProp {
    placeholder?:string;
    name?:string;
    defaultValue?:string;
    value?: string
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
    value,
    style = styleDefault,
    styleDimensions = "w-full min-h-[85px]",
    onChange
  }: TextareaProp) {
  return (
    <div className={`relative pt-1 px-2 border border-neutral-400 outline-none overflow-hidden ${style} ${styleDimensions}`}>
      <label className="absolute -top-5 left-0 text-xs tracking-widest text-neutral-600">{name}</label>
      <textarea value={value} defaultValue={defaultValue} className={`scroll w-full resize-none outline-none ${styleDimensions} bg-redd-500`} placeholder={placeholder} onChange={onChange}></textarea>
    </div>
  )
}

export default Textarea