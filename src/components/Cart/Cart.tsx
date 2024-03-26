import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import CartCard from "../CartCard/CartCard";
import { fetchPOST } from "../../utils/fetchPOST";
import { deleteAllCart } from "../../redux/slice/cartSlice";
import { CartProp } from "../../interfaces/components";
import { useDecode } from "../../hooks/useDecode";
import { useEncode } from "../../hooks/useEncode";
import { error, success } from "../../utils/alert";
import { ResponseData } from "../../interfaces/interfaces";
const { VITE_C_USER, VITE_C_CART } = import.meta.env

function Cart({visible, onClose}:CartProp) {
  
  const dispatch: AppDispatch = useDispatch();
  const {cart} = useSelector((state:RootState) => state.cart);
  const { id } = useDecode(VITE_C_USER);
  const { decode } = useEncode()
  
  if (!visible) return null; // Se usa la condicion de vsibile despues de inicializar los Hooks, por que sino da error de Static Flag
  
  const valueTotalFloat = Array.isArray(cart) ? cart.map(product => product.price * product.cantidad).reduce((accumulator, current) => accumulator + current, 0) : null;
  
  const valueTotal = typeof valueTotalFloat === 'number' ? parseFloat(valueTotalFloat.toFixed(2)) : null;
  
  
  const cartProducts = decode(VITE_C_CART)

  
  async function handlerPurchase () {
    
    const {data} = await fetchPOST("http://localhost:3001/purchase/create", {direction:"Casa", userID: id, products:cartProducts }) as {data:ResponseData}

    if (data.error) return error(data.message);
    if (!data.error) return success(data.message)
    
    dispatch(deleteAllCart())
  }



  return (
    <aside className="fixed right-0 top-0 py-4 px-4 w-[350px] h-screen bg-gradient-to-r from-[#EAEAEA] to-[#E5E5E5] z-20">
        <button className="absolute top-3 right-8 text-2xl text-black z-50" onClick={onClose}>x</button>
        <h3 className="text-black text-sm font-semibold tracking-widest py-2">MI COMPRA</h3>
        <hr className="bg-neutral-400 h-[2px]"></hr>

        <section className=" w-full h-[17%] 2xl:max-h-[35%] 2xl:h-auto overflow-auto my-5 gap-y-3 flex flex-col justify-start items-center scroll bg-redd-500">
          {cart.length > 0 
          ? cart?.map((products) => (
            <CartCard products={products} key={`${products.id} ${products.size} ${products.color}`}/>
          ))
          : <div className="absolute top-0 z-20 left-0 w-full h-full flex justify-center items-center flex-col text-black gap-y-5 bg-gradient-to-r from-[#EAEAEA] to-[#E5E5E5]">
            <h3 className="text-xl tracking-widest border-b border-neutral-700 font-semibold">Carrito vacio</h3>
            <i className="text-3xl bx bx-basket"></i>
            </div> 
          }
        </section>
        <hr className="bg-neutral-400 h-[2px]"></hr>

        <section className="flex justify-center items-start flex-col">
          
        </section>

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

        <button className="w-full rounded-full py-3 text-sm text-white bg-neutral-800" onClick={handlerPurchase}>Iniciar Compra</button>

    </aside>
  )
}

export default Cart