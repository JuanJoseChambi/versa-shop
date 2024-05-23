import Button from "../Button/Button"

interface SummaryCartProp {
    subtotal: number;
    setCheckoutProfile?: () => void;
    setCheckout?: () => void;
    btnStartPayment?:boolean
}

// setCheckoutProfile
function SummaryCart({subtotal, setCheckout, btnStartPayment = true}:SummaryCartProp) {
  return (
    <section className="w-full flex justify-between items-center gap-y-3 flex-col text-sm py-3">
        <div className="w-full flex justify-between items-center">
            <h3>Subtotal</h3>
            <h3>$ {subtotal}</h3>
        </div>
        <div className="w-full flex justify-between items-center">
            <h3>Envio</h3>
            <h3>Gratis</h3>
        </div>
        <div className="w-full h-[1px] bg-neutral-400"></div>
        <div className="w-full flex justify-between items-center">
            <h3 className="text-xl font-semibold tracking-widest">Total</h3>
            <h3 className="text-xl font-semibold">$ {subtotal}</h3>
        </div>
        {btnStartPayment && <section className="w-full flex justify-center items-center flex-col gap-y-3">
            <Button 
                style="w-[80%] py-2 rounded-sm bg-neutral-800 text-white text-sm" 
                text="Iniciar pago" 
                onClick={setCheckout} 
            />
        </section>}

    </section>
  )
}

export default SummaryCart