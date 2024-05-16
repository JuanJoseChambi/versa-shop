import { useDispatch } from "react-redux";
import { addToCart, deleteFromCart, removeToCart } from "../../redux/slice/cartSlice"
import { AppDispatch } from "../../redux/store";
import { ProductsInCart } from "../../interfaces/redux";

interface CartCard {
  products:ProductsInCart;
}

function CartCard({products}:CartCard) {
    const dispatch: AppDispatch = useDispatch();

    

  return (
    <article key={products.id} className={`text-black w-full min-h-[100px] pr-3 flex justify-between items-center flex-row bg-blued-500`}>
            
            <picture className="w-[80px] min-h-[80px] max-h-[80px] overflow-hidden bg-redd-500 flex justify-center items-center">
              <img src={products.image} alt={products.name} className="w-[90%]" />
            </picture>

            <article className=" w-[70%] min-h-[70px] bg-greend-500">
              <div className="flex justify-between items-center gap-x-2">
                <div className="flex justify-center items-start flex-col">
                  <h3 className="text-sm font-semibold leading-[13px] text-clipping">{products.name}</h3>
                  <h3><b className="text-xs font-normal">Talle {products.size} | Color {products.color}</b></h3>
                </div>
                <button className="text-lg" onClick={() => dispatch(deleteFromCart(products))}><i className='bx bx-trash-alt'></i></button>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-x-3">

                  <button className="bg-neutral-200 flex justify-center items-center w-[20px] h-[20px] text-center rounded-full" onClick={() => dispatch(removeToCart(products))}>-</button>
                  <p>{products.cantidad}</p>
                  <button className="bg-neutral-200 flex justify-center items-center w-[20px] h-[20px] text-center rounded-full" onClick={() => {products.unit <= products.cantidad ? null : dispatch(addToCart(products))}}>+</button>

                </div>
                <p>$ {products.price}</p>
              </div>
            </article>

    </article>
  )
}

export default CartCard




{/* <button onClick={() => dispatch(removeToCart(products))}>-</button> */}
{/* <button onClick={() => dispatch(addToCart(products))}>+</button> */}