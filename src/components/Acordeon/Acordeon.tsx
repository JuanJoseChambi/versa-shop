import { useState } from "react"

interface PropAcordeon {
    children: React.ReactNode
    height?:string
    
}

function Acordeon({children}:PropAcordeon) {

    const [open, setOpen] = useState(false)
    const [hover, setHover] = useState(false)

  return (
    <div className={`w-full relative  bg-redd-500 ${open ? "h-full" : "h-[65px] overflow-hidden"} `}>
        {children}
        <div className={`w-full h-[25px] flex justify-center items-end ${open ? null : "bg-gradient-to-b from-transparent via-white to-white"} absolute ${!open ? "bottom-0" : "-bottom-4"} left-0 text-xs text-center font-light`}>
            <span className="relative cursor-pointer tracking-widest" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => setOpen(!open)}>
              {!open ? "Mostrar mas..." : "Mostrar menos..."}
              <span className={`w-0 h-[1px] ${hover && "w-full"} transition-[width] duration-500 absolute bottom-0 left-0 bg-neutral-700`}></span>
            </span>
        </div>
    </div>
  )
}

export default Acordeon