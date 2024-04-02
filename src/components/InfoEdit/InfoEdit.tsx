import { useState } from "react"

interface InfoEditProp {
    label:string;
    currentValue:string;
    setState?:(e:React.ChangeEvent<HTMLInputElement>) => void;
    state?:string;
}

function InfoEdit({label, currentValue, setState, state}:InfoEditProp) {

    const [hover, setHover] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)


  return (
    <section className="bg-redd-500 w-1/2" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <label className="text-sm  text-neutral-400">{label}</label>
        <div className="flex justify-between items-center">
            {edit 
                ? <input type="text" className="w-1/2 bg-redd-500 outline-none" placeholder={currentValue} onChange={setState} /> 
                : <h2 className="w-1/2">{currentValue}</h2>}
            {hover && !edit && <i className="cursor-pointer mx-auto bg-redd-500 bx bx-edit" onClick={() => setEdit(!edit)}></i> }
            {edit && state && <i className="cursor-pointer mx-auto bx bx-check"></i>}
            {!state && edit && <i className="cursor-pointer mx-auto bx bx-x" onClick={() => setEdit(!edit)}></i>}

        </div>
    </section>
  )
}

export default InfoEdit