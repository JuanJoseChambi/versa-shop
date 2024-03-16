
interface TextareaProp {
    placeholder:string;
    style?:string
}

const styleDefault:string = "w-full min-h-[50px] resize-none py-1 px-2 flex justify-between items-center gap-x-2 text-xs rounded-lg border border-neutral-400 outline-none bg-white"


function Textarea({placeholder, style = styleDefault}: TextareaProp) {
  return (
    <textarea className={style} placeholder={placeholder}></textarea>
  )
}

export default Textarea