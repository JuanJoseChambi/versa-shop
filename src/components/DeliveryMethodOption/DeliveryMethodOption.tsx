// import { useState } from "react";

interface PropDeliveryMethodOption {
    title?:string;
    subtitle?:string;
    price?:string;
    nameRadio?:string;
    valueRadio?:string;
    defaultChecked?:boolean;
    disable?:boolean;
    onChange?:(e:React.ChangeEvent<HTMLInputElement>) => void
}
function DeliveryMethodOption({title, subtitle, price, nameRadio, valueRadio, defaultChecked, disable, onChange}:PropDeliveryMethodOption) {

  return (
    <section className={`w-full relative py-4 flex justify-start items-center border gap-x-3 px-3 border-neutral-400 ${disable && "select-none pointer-events-none"}`}>
        {disable && <div className="absolute top-0 left-0 w-full h-full bg-[#0000006f] backdrop-blur-sm flex justify-center items-center text-white font-extralight tracking-widest select-none pointer-events-none">No Disponible</div>}
        <div className="w-auto flex justify-center items-center bg-redd-500">
            <input type="radio" value={valueRadio} defaultChecked={defaultChecked} name={nameRadio} onChange={onChange} className="w-4 h-4"/>
        </div>
        <section className="flex-1 flex justify-center items-start flex-col">
            <h3 className="font-semibold leading-4">{title}</h3>
            <p className="text-sm text-neutral-500">{subtitle}</p>
        </section>
        <h3 className="font-semibold">{price}</h3>
    </section>
  )
}

export default DeliveryMethodOption