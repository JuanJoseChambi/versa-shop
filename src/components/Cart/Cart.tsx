import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addToCart, deleteToCart, removeToCart } from "../../redux/slice/cartSlice";


interface CartProp {
    visible:boolean;
    onClose:() =>  void
}

function Cart({visible, onClose}:CartProp) {
    if (!visible) return;

  const {cart} = useSelector((state:RootState) => state.cart)
  const dispatch: AppDispatch= useDispatch();

  const valueTotal = Array.isArray(cart) ? cart.map(product => product.price * product.cantidad).reduce((accumulator, current) => accumulator + current, 0) : null;


  return (
    <aside className="fixed right-0 top-0 py-5 px-4 w-[350px] h-screen bg-gradient-to-r from-[#EAEAEA] to-[#E5E5E5] z-20">
        <button className="absolute top-3 right-8 text-2xl text-black" onClick={onClose}>x</button>
        <h3 className="text-black text-sm font-semibold tracking-widest py-2">MI COMPRA</h3>
        <hr className="bg-neutral-400 h-[2px]"></hr>

        <section className=" w-full h-[20%] overflow-auto my-5 gap-y-3 flex flex-col justify-start items-center scroll bg-redd-500">
          {cart?.map((products) => (
            <article key={products.id} className="text-black w-full min-h-[100px] pr-3 flex justify-between items-center flex-row bg-blued-500">
              <picture className="w-[80px] min-h-[80px] max-h-[80px] overflow-hidden bg-redd-500 flex justify-center items-center">
                <img src={products.image} alt="" className="w-[90%]" />
              </picture>

              <article className=" w-[70%] min-h-[70px] bg-greend-500">
                <div className="flex justify-between items-center gap-x-2">
                  <h3 className="text-sm font-semibold">{products.name} | Talle {products.size}</h3>
                  <button className="text-lg" onClick={() => dispatch(deleteToCart(products))}><i className='bx bx-trash-alt'></i></button>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex justify-center items-center gap-x-3">
                    <button onClick={() => dispatch(addToCart(products))}>+</button>
                    <p>{products.cantidad}</p>
                    <button onClick={() => dispatch(removeToCart(products))}>-</button>
                  </div>
                  <p>$ {products.price}</p>
                </div>
              </article>


            </article>
          ))}
        </section>
        <hr className="bg-neutral-400 h-[2px]"></hr>

        <div className="flex justify-start items-center gap-x-3 pt-3">
          <label className="text-black text-xs flex justify-start items-center gap-x-1 bg-redd-500">
            <input type="checkbox" value={"hola"} className="text-black" />
            Mi Ubicacion
          </label>
          <label className="text-black text-xs flex justify-start items-center gap-x-1 bg-redd-500">
            <input type="checkbox" value={"hola"} className="text-black" />
            Agregar una Ubicacion
          </label>
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