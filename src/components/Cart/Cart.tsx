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

  console.log(cart);


  return (
    <aside className="fixed right-0 top-0 py-5 px-4 w-[300px] h-screen bg-gradient-to-r from-[#EAEAEA] to-[#E5E5E5] z-20">
        <button className="absolute top-3 right-8 text-2xl text-black" onClick={onClose}>x</button>
        <h3 className="text-black text-lg font-bold tracking-widest">MI COMPRA</h3>
        <hr className="bg-neutral-400 h-[2px]"></hr>

        <section className=" w-full h-[300px] overflow-auto my-5 gap-y-3 flex flex-col justify-start items-center scroll bg-redd-500">
          {cart?.map((products) => (
            <article key={products.id} className="text-black w-full min-h-[100px] pr-3 flex justify-between items-center flex-row bg-blued-500">
              <picture className="w-[80px] flex justify-center items-center">
                <img src={products.image} alt="" />
              </picture>
              <article className=" w-[160px] min-h-[70px] bg-greend-500">
                  <h3>{products.name} | Talle {products.size}</h3>
                <div className="flex justify-between items-center">
                  <div className="flex justify-center items-center gap-x-3">
                    <button onClick={() => dispatch(addToCart(products))}>+</button>
                    <p>{products.cantidad}</p>
                    <button onClick={() => dispatch(removeToCart(products))}>-</button>
                    <button className="text-lg" onClick={() => dispatch(deleteToCart(products))}><i className='bx bx-trash-alt'></i></button>
                  </div>
                  <p>$ {products.price}</p>
                </div>
              </article>
            </article>
          ))}
        </section>
    </aside>
  )
}

export default Cart