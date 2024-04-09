import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart, removeToCart } from "../../redux/slice/cartSlice"
import Dashboard from "../Dashboard/Dashboard"
import TitleDashboard from "../TitleDashboard/TitleDashboard"
import { AppDispatch, RootState } from "../../redux/store";

function CheckoutCart() {
    const { cart } = useSelector((state:RootState) => state.cart)


    const dispatch: AppDispatch = useDispatch();

  return (
    <>
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
    </>
  )
}

export default CheckoutCart