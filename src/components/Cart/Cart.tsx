import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CartCard from "../CartCard/CartCard";
import { CartProp } from "../../interfaces/components";
import Button from "../Button/Button";

function Cart({visible, onClose}:CartProp) {
  
  const {cart} = useSelector((state:RootState) => state.cart);
  if (!visible) return null;

  const valueTotalFloat = Array.isArray(cart) ? cart.map(product => product.price * product.cantidad).reduce((accumulator, current) => accumulator + current, 0) : null;
  
  const valueTotal = typeof valueTotalFloat === 'number' ? parseFloat(valueTotalFloat.toFixed(2)) : null;

  return (
    <aside className="fixed right-0 top-0 py-4 px-4 w-full h-screen sm:w-[350px] bg-white z-20 border-l border-neutral-400">
      <div className="w-full h-auto bg-redd-500 sticky top-0">
        <button className="absolute top-0 right-8 text-2xl text-black z-50" onClick={onClose}>x</button>
        <h3 className="text-black text-sm font-semibold tracking-widest py-2">MI COMPRA</h3>
        <hr className="bg-neutral-400 h-[2px]"></hr>
      </div>

        {cart.length > 0 ? 
            <section className=" w-full min-h-[10%] max-h-[50%] 2xl:max-h-[50%] 2xl:h-auto overflow-auto my-5 gap-y-3 flex flex-col justify-start items-center scroll bg-redd-500">
                {cart?.map((products) => (
                  <CartCard products={products}/>
                ))}
          </section>
        : <section className="w-full h-full bg-redd-500 flex justify-center items-center flex-col pointer-events-none select-none">
            <h3 className="w-[100%] text-2xl text-neutral-800 tracking-widest text-center font-bold">CARRITO VACIO</h3>
            <p className="w-[80%] text-neutral-800 font-light text-center">AÑada un producto a carrito para proceder con la compra</p>
          </section> 
        }
    
        <hr className="bg-neutral-400 h-[2px]"></hr>

        <div className="py-4">
          <div className="flex justify-between items-center text-black text-sm">
            <p className="">Subtotal</p>
            <p>$ {valueTotal}</p>
          </div>
          <div className="flex justify-between items-center text-black text-sm">
            <p className="text-black text-sm">Envio</p>
            <p>Gratis</p>
          </div>
        </div>

        <hr className="bg-neutral-400 h-[2px]"></hr>

        <div className="text-black flex justify-between items-center py-5">
          <h3 className="text-xl">Precio Total:</h3>
          <h3 className="text-xl">$ {valueTotal}</h3>
        </div>

          <section className="flex justify-center items-center flex-col gap-y-3">
            <Button style="w-full text-white py-2 rounded-sm text-sm bg-neutral-800 " text="Iniciar Compra" dir="/checkout"/>
            <Button style="w-auto mx-auto text-black py-2 rounded-full text-sm" text="Seguir Comprando" onClick={onClose}/>
          </section>
    </aside>
  )
}

export default Cart