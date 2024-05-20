import {check, deliverySvg, payment} from "../../assets/IconSvgs/IconSvgs"

interface PropCheckoutProgress {    
    currentCheckout?: string
}

function CheckoutProgress({currentCheckout}: PropCheckoutProgress) {
  return (
    
    <ul className="flex justify-between items-center px-10 py-2 ">
        <li>
            <button className={`w-[20px] text-center flex justify-center items-center flex-col bg-transparent cursor-pointer ${currentCheckout === "cart" ? "opacity-100": "opacity-70"}`} aria-disabled="true" >
                <div className={`${currentCheckout === "cart" ? "p-[6px]" : "p-[4px]"} border border-neutral-500 rounded-full `}>
                    {check}
                </div>
                <p className="text-sm">Carrito</p>
            </button>
        </li>
        <li className="flex-1 h-[1px] bg-neutral-400 relative -top-[10px]"></li>
        <li>
            <button className={`w-[20px] text-center flex justify-center items-center flex-col bg-transparent cursor-pointer ${currentCheckout === "delivery" ? "opacity-100": "opacity-70"}`}>
                <div className={`${currentCheckout === "delivery" ? "p-[6px]" : "p-[4px]"} border border-neutral-500 rounded-full `}>
                    {currentCheckout === "delivery" ? deliverySvg["sm"] : check}
                </div>
                <p className="text-sm">Entrega</p>
            </button>
        </li>
        <li className="flex-1 h-[1px] bg-neutral-400 relative -top-[10px]"></li>
        <li>
            <button className={`w-[20px] text-center flex justify-center items-center flex-col bg-transparent cursor-pointer ${currentCheckout === "payment" ? "opacity-100": "opacity-70"}`} aria-disabled="true">
                <div className={`${currentCheckout === "payment" ? "p-[6px]" : "p-[4px]"} border border-neutral-500 rounded-full `}>
                    {payment}
                </div>
                <p className="text-sm">Pago</p>
            </button>
        </li>
    </ul>

  )
}

export default CheckoutProgress