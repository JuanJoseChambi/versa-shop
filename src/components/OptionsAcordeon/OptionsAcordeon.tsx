import React from "react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";


interface Options {
  text?:string;
  dir?:string;
  node?:ReactNode;
  iconLeft?:string;
  iconRight?:string;
  onClick?:() => void
}

interface OptionsAcordeonProp {
  visible:boolean;
  options: Options[]
}

function OptionsAcordeon({visible, options}:OptionsAcordeonProp) {
  if (!visible) return null

  return (
    <section className="w-auto pl-3 pr-5 py-3 flex justify-center items-start flex-col gap-y-2 rounded-lg absolute top-16 right-0 bg-white text-black border border-neutral-300 shadow-xl">
      {options.map((option, index) => (
        <React.Fragment key={`${option.dir || ""}-${option.text}-${index}`}>
          {option.node 
          ? option.node 
          : <Link to={`${option.dir || ""}`}>
              <button  className="text-sm flex justify-center items-center gap-x-2" onClick={option.onClick}>
              <i className={`text-lg ${option.iconLeft}`}></i>
              {option.text}
              </button>
            </Link>}
        </React.Fragment>
      ))}
    </section>
  )
}

export default OptionsAcordeon