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
    <aside className="fixed right-0 top-0 py-4 px-4 w-[350px] h-screen bg-white z-20">
        <button className="absolute top-3 right-8 text-2xl text-black z-50" onClick={onClose}>x</button>
        <h3 className="text-black text-sm font-semibold tracking-widest py-2">MI COMPRA</h3>
        <hr className="bg-neutral-400 h-[2px]"></hr>

        <section className=" w-full min-h-[17%] max-h-[47%] 2xl:max-h-[35%] 2xl:h-auto overflow-auto my-5 gap-y-3 flex flex-col justify-start items-center scroll bg-redd-500">
          {cart.length > 0 
          ? cart?.map((products) => (
            <CartCard products={products} key={`${products.id} ${products.size} ${products.color}`}/>
          ))
          : <div className="absolute top-0 z-20 left-0 w-full h-full flex justify-center items-center flex-col text-black gap-y-5 bg-white">
            <h3 className="text-xl tracking-widest border-b border-neutral-700 font-semibold">Carrito vacio</h3>
            <i className="text-3xl bx bx-basket"></i>
            </div> 
          }
    
        </section>
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
            <Button style="w-full text-white py-2 rounded-full text-sm bg-black " text="Iniciar Compra" dir="/checkout"/>
            <Button style="w-auto mx-auto text-black py-2 rounded-full text-sm" text="Seguir Comprando" onClick={onClose}/>
          </section>
    </aside>
  )
}

export default Cart