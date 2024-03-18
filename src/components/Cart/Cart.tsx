import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import CartCard from "../CartCard/CartCard";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { fetchPOST } from "../../utils/fetchPOST";
// import { deleteAllCart } from "../../redux/slice/cartSlice";


interface CartProp {
    visible:boolean;
    onClose:() =>  void
}

function Cart({visible, onClose}:CartProp) {
    if (!visible) return;

  const {cart} = useSelector((state:RootState) => state.cart)
  // const dispatch: AppDispatch = useDispatch();

  const valueTotalFloat = Array.isArray(cart) ? cart.map(product => product.price * product.cantidad).reduce((accumulator, current) => accumulator + current, 0) : null;

  const valueTotal = typeof valueTotalFloat === 'number' ? parseFloat(valueTotalFloat.toFixed(2)) : null;


  const { getIDLocalStorage, getCartLocalStorage } = useLocalStorage()

  
 
  
  async function handlerPurchase () {
    
    const id = getIDLocalStorage()
    const cartLocal = getCartLocalStorage()
    
    // console.log(id);
    // console.log(cartLocal);
    const {data} = await fetchPOST("http://localhost:3001/purchase/create", {direction:"Casa", userID: id, products: cartLocal})

    // console.log(data);
    // dispatch(deleteAllCart())
    
  }

{/* <Toaster/> */}
  return (
    <aside className="fixed right-0 top-0 py-4 px-4 w-[350px] h-screen bg-gradient-to-r from-[#EAEAEA] to-[#E5E5E5] z-20">
        <button className="absolute top-3 right-8 text-2xl text-black z-10" onClick={onClose}>x</button>
        <h3 className="text-black text-sm font-semibold tracking-widest py-2">MI COMPRA</h3>
        <hr className="bg-neutral-400 h-[2px]"></hr>

        <section className=" w-full h-[17%] 2xl:max-h-[35%] 2xl:h-auto overflow-auto my-5 gap-y-3 flex flex-col justify-start items-center scroll bg-redd-500">
          {cart.length > 0 
          ? cart?.map((products) => (
            <CartCard products={products} key={products.id && products.size && products.color}/>
          ))
          : <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col text-black gap-y-5 bg-gradient-to-r from-[#EAEAEA] to-[#E5E5E5]">
            <h3 className="text-xl tracking-widest border-b border-neutral-700 font-semibold">Carrito vacio</h3>
            <i className="text-3xl bx bx-basket"></i>
            </div> 
          }
        </section>
        <hr className="bg-neutral-400 h-[2px]"></hr>

        <section className="flex justify-center items-start flex-col">
          
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

            <form className="w-full h-[200px] scroll overflow-y-auto flex justify-start items-start text-black flex-col gap-y-2">
              <Input placeholder="Nombre Completo" icon="bx bx-user"/>
              <Input placeholder="Ciudad" icon="bx bx-buildings"/>
              <Input placeholder="Direccion de envio" icon="bx bx-directions"/>
              <Input placeholder="Codigo Postal" icon="bx bx-dialpad-alt"/>
              <Input placeholder="Telefono de Contacto" icon="bx bx-phone"/>
              <Textarea placeholder="Comentarios Adiccionales"/>
          </form>
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