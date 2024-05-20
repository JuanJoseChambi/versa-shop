// import { useState } from "react";

interface PropDeliveryMethodOption {
    title:string;
    subtitle:string;
    price?:string;
    nameRadio:string;
}
function DeliveryMethodOption({title, subtitle, price, nameRadio}:PropDeliveryMethodOption) {

    // const [radio, setRadio] = useState()
    // defaultChecked
  return (
    <section className="w-full py-4 flex justify-start items-center border gap-x-3 px-3 border-neutral-400">
        <div className="w-auto flex justify-center items-center bg-redd-500">
            <input type="radio" defaultChecked name={nameRadio} className="w-4 h-4"/>
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