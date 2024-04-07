import { useDispatch, useSelector } from "react-redux"
import Nav from "../../components/Nav/Nav"
import { AppDispatch, RootState } from "../../redux/store"
import TitleDashboard from "../../components/TitleDashboard/TitleDashboard"
import Dashboard from "../../components/Dashboard/Dashboard"
import { addToCart, deleteFromCart, removeToCart } from "../../redux/slice/cartSlice"
import Button from "../../components/Button/Button"
import { useState } from "react"
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react"

function Checkout() {
  
    const { cart } = useSelector((state:RootState) => state.cart)
    const dispatch: AppDispatch = useDispatch();
    const subtotal = cart.map(product => product.price * product.cantidad).reduce((accumulator, current) => accumulator + current, 0)

    const [preferenceId, setPreferenceId] = useState<string>("")
    
    // initMercadoPago('TEST-8c97ff92-f23a-406c-84b3-a074d4765515', {locale:"es-AR"});
    initMercadoPago('TEST-8c97ff92-f23a-406c-84b3-a074d4765515', { locale: 'es-AR' })

    async function payment () {
      const body = {
        title:"Buso Nike",
        quantity:5,
        price:10
      };

      const response = await fetch("http://localhost:3001/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      
      const preference = await response.json();
      
      setPreferenceId(preference.id)
    }

    console.log(preferenceId);
    
  return (
    <main>
        <Nav style="sticky"/>
        <section className="w-[95%] mx-auto h-auto flex justify-evenly items-start py-10 bg-blued-500"> 
          <section className="w-[60%] px-3 bg-redd-500">
            <TitleDashboard titles={
              [
                {text:"Producto", width:"w-[60%]"},
                {text:"Talla",width:"w-[15%]"},
                {text:"Precio",width:"w-[15%]"},
                {text:"Subtotal",width:"w-[15%]"}
              ]
              }/>
              {cart.map((product) => (
                  <Dashboard key={product.id} divide={false} values={[
                    {value:product.image, type:"image", width:"w-[60px] min-h-[45px] max-h-[45px] overflow-hidden",
                    value2:
                    <>
                      <div className="text-sm tracking-wider">{product.name}</div>
                      <div className="text-xs">Talle: {product.size} | Color: {product.color}</div>
                    </>, width2:"w-[50%] bg-greend-500 text-start",

                    value3:
                    <div className="flex justify-center items-center gap-x-3">
                      <button className="bg-neutral-300 w-[20px] h-[20px] text-center rounded-full" onClick={() => dispatch(removeToCart(product))}>-</button>
                      <p>{product.cantidad}</p>
                      <button className="bg-neutral-300 w-[20px] h-[20px] text-center rounded-full" onClick={() => dispatch(addToCart(product))}>+</button>
                    </div>, width3:"w-[15%]",

                    value4:`$ ${product.price}`, width4:"w-[15%]",

                    value5:
                    <div className="relative flex justify-center items-center">
                      <b>$ {product.price * product.cantidad}</b>
                      <button className="text-lg absolute right-0" onClick={() => dispatch(deleteFromCart(product))}><i className='bx bx-trash-alt'></i></button>
                    </div>, width5:"w-[15%]"}
                  ]}/>
              ))}
          </section>
          <section className="w-[30%] py-5 rounded-lg flex justify-center items-center flex-col bg-neutral-200 border border-neutral-300">
            <h3 className="tracking-wider font-semibold">Resumen de Compra</h3>
            <section className="w-[90%] flex justify-between items-center gap-y-3 flex-col">
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
              <div className="w-full flex justify-center items-center flex-col gap-y-3">
                <Button style="w-[80%] py-2 rounded-full bg-black text-white" text="Comprar" onClick={() => payment()}/>
                {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts:{ valueProp: 'smart_option'}, visual:{ buttonBackground: 'black' }}} />}
                <Button style="w-[80%] py-2 rounded-full border border-neutral-700" text="Seguir comprando" dir="/shop"/>
              </div>
            </section>
          </section>
        </section>
    </main>
  )
}

export default Checkout