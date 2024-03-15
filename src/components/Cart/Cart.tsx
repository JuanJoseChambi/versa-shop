import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CartCard from "../CartCard/CartCard";


interface CartProp {
    visible:boolean;
    onClose:() =>  void
}

function Cart({visible, onClose}:CartProp) {
    if (!visible) return;

  const {cart} = useSelector((state:RootState) => state.cart)

  const valueTotalFloat = Array.isArray(cart) ? cart.map(product => product.price * product.cantidad).reduce((accumulator, current) => accumulator + current, 0) : null;
  // console.log(valueTotal);

  const valueTotal = typeof valueTotalFloat === 'number' ? parseFloat(valueTotalFloat.toFixed(2)) : null;
  
  // console.log(valueTotal);
  

  return (
    <aside className="fixed right-0 top-0 py-5 px-4 w-[350px] h-screen bg-gradient-to-r from-[#EAEAEA] to-[#E5E5E5] z-20">
        <button className="absolute top-3 right-8 text-2xl text-black" onClick={onClose}>x</button>
        <h3 className="text-black text-sm font-semibold tracking-widest py-2">MI COMPRA</h3>
        <hr className="bg-neutral-400 h-[2px]"></hr>

        <section className=" w-full h-[20%] overflow-auto my-5 gap-y-3 flex flex-col justify-start items-center scroll bg-redd-500">
          {cart?.map((products) => (
            <CartCard products={products} key={products.id}/>
          ))}
        </section>
        <hr className="bg-neutral-400 h-[2px]"></hr>

        <div className="flex justify-center items-start flex-col">
          <div className="flex justify-start items-center gap-x-3 py-3">
            <label className="text-black text-xs flex justify-start items-center gap-x-1 bg-redd-500">
              <input type="checkbox" value={"hola"} className="text-black" />
              Mi Ubicacion
            </label>
            <label className="text-black text-xs flex justify-start items-center gap-x-1 bg-redd-500">
              <input type="checkbox" value={"hola"} className="text-black" />
              Agregar una Ubicacion
            </label>
          </div>
            <div className="w-full flex justify-center items-start text-black flex-col gap-y-4">
              <input type="text" className="w-[95%] py-1 px-3 text-sm rounded-lg border border-neutral-400 outline-none" placeholder="Responsable"/>
              <input type="text" className="w-[95%] py-1 px-3 text-sm rounded-lg border border-neutral-400 outline-none" placeholder="Provincia"/>
              <input type="text" className="w-[95%] py-1 px-3 text-sm rounded-lg border border-neutral-400 outline-none" placeholder="Calle"/>
              <input type="text" className="w-[95%] py-1 px-3 text-sm rounded-lg border border-neutral-400 outline-none" placeholder="Direccion"/>
          </div>
        </div>

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

        <button className="w-full rounded-full py-3 text-sm text-white bg-neutral-800">Iniciar Compra</button>

    </aside>
  )
}

export default Cart