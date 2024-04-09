import Button from "../Button/Button"

interface SummaryCartProp {
    subtotal: number;
    setCheckoutProfile?: () => void;
    btnStartPayment?:boolean
}
function SummaryCart({subtotal, setCheckoutProfile, btnStartPayment = true}:SummaryCartProp) {
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
                style="w-[80%] py-2 rounded-full bg-black text-white text-sm" 
                text="Iniciar pago" 
                onClick={setCheckoutProfile} 
            // disable={oneClick} !oneClick && payment() setOneClick(true) 
            />
          {/* {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts:{ valueProp: 'smart_option'}, visual:{ buttonBackground: 'black' }}} />} */}
        </section>}

    </section>
  )
}

export default SummaryCart