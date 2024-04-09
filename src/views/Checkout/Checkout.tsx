import { useSelector } from "react-redux"
import Nav from "../../components/Nav/Nav"
import { RootState } from "../../redux/store"
import Button from "../../components/Button/Button"
import { useState } from "react"
// import { Wallet, initMercadoPago } from "@mercadopago/sdk-react"
import CheckoutProfile from "../../components/CheckoutProfile/CheckoutProfile"
import CheckoutCart from "../../components/CheckoutCart/CheckoutCart"
import SummaryCart from "../../components/SummaryCart/SummaryCart"
import SummaryProfile from "../../components/SummaryProfile/SummaryProfile"
// const {VITE_MP_P_KEY} = import.meta.env

function Checkout() {
  
    const { cart } = useSelector((state:RootState) => state.cart)
    const subtotal = cart.map(product => product.price * product.cantidad).reduce((accumulator, current) => accumulator + current, 0)

    // const [preferenceId, setPreferenceId] = useState<string>("")
    const [checkoutProfile, setCheckoutProfile] = useState(false);
    // const [oneClick, setOneClick] = useState<boolean>(false)
    
    // initMercadoPago(VITE_MP_P_KEY, { locale: 'es-AR' })

    // async function payment () {
      
    //   const body = {
    //     title:"Buso Nike",
    //     quantity:5,
    //     price:10
    //   };

    //   const response = await fetch("http://localhost:3001/create_preference", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(body),
    //   });
      
    //   const preference = await response.json();
      
    //   setPreferenceId(preference.id)
    // }

  return (
    <main>
        <Nav style="sticky"/>
        <section className="w-[95%] mx-auto h-auto flex justify-evenly items-start py-10 bg-blued-500"> 
        <section className="w-[60%] h-[450px] px-3 bg-redd-500">
          
          { !checkoutProfile ? <CheckoutCart/> : <CheckoutProfile/>}

        </section>

          <section className="w-[30%] py-5 rounded-lg flex justify-center items-center gap-y-3 flex-col px-5 bg-neutral-200">
            <h3 className="tracking-wider font-semibold">Resumen de Compra</h3>

            {!checkoutProfile ? <SummaryCart subtotal={subtotal} setCheckoutProfile={() => setCheckoutProfile(true)}/> : <SummaryProfile/>}

              <Button style="text-sm" text="Seguir comprando" dir="/shop"/>

          </section>
        </section>
    </main>
  )
}

export default Checkout