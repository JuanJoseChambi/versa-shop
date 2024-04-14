import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import SummaryCart from "../SummaryCart/SummaryCart"
import Input from "../Input/Input"
import { useState } from "react"

function SummaryProfile() {
    const { cart } = useSelector((state:RootState) => state.cart)
    const subtotal = cart.map(product => product.price * product.cantidad).reduce((accumulator, current) => accumulator + current, 0);

    const [offer, setOffer] = useState<boolean>(false)

  return (
    <section className="bg-redd-500 w-full">
        <section className="w-full max-h-[200px] py-2 bg-blued-500 flex flex-col justify-start items-center">
            {cart.map((product) => (
                <div key={product.id} className="w-full flex justify-start items-start gap-x-2 bg-greend-500">
                    <picture className=" w-[60px] h-[60px] flex justify-center items-center overflow-hidden bg-redd-500">
                        <img src={product.image} alt="" className="object-cover"/>
                    </picture>
                    <section className="w-full flex flex-col justify-center items-start bg-redd-500">
                        <article>
                            <h2 className="">{product.name}</h2>
                            <h3 className="text-sm">Talle: {product.size} | Color: {product.color}</h3>
                        
                        </article>
                        <article className="w-full flex justify-between items-center">
                            <h3 className="text-sm">{product.cantidad}</h3>
                            <h3 className="">$ {product.price}</h3>
                        </article>
                    </section>
                    
                </div>
            ))}
        </section>
        <div className="w-full h-[1px] bg-neutral-400"></div>
        <section className={`flex justify-self-center items-center gap-x-2 ${offer ? "pt-8 pb-4" : "py-4"}`} >
            {!offer && <i className="bx bxs-offer scale-150"></i>}
            {!offer && <h3 className="text-sm cursor-pointer" onClick={() => setOffer(true)}>Ingrese un codigo de descuento <b>Aqui</b></h3>}
            {offer && <Input name="Descuento" placeholder="" icon="bx bxs-offer"/>}
        </section>
        <div className="w-full h-[1px] bg-neutral-400"></div>
        <SummaryCart subtotal={subtotal} btnStartPayment={false}/>
    </section>
  )
}

export default SummaryProfile