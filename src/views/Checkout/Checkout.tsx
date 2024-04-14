import { useDispatch, useSelector } from "react-redux"
import Nav from "../../components/Nav/Nav"
import { AppDispatch, RootState } from "../../redux/store"
import Button from "../../components/Button/Button"
import { useEffect, useState } from "react"
import CheckoutProfile from "../../components/CheckoutProfile/CheckoutProfile"
import CheckoutCart from "../../components/CheckoutCart/CheckoutCart"
import SummaryCart from "../../components/SummaryCart/SummaryCart"
import SummaryProfile from "../../components/SummaryProfile/SummaryProfile"
import { deleteAllCart } from "../../redux/slice/cartSlice"
import { error, success } from "../../utils/alert"
import { fetchPOST } from "../../utils/fetchPOST"
import { ResponseData } from "../../interfaces/interfaces"
import { useEncode } from "../../hooks/useEncode"
import { Link } from "react-router-dom"
import shop from "../../assets/checkout/shop.svg"
import { deletePreferenceProfile } from "../../redux/slice/preferenceProfileSlice"
const { VITE_C_CART} = import.meta.env

function Checkout() {
  
  const { cart } = useSelector((state:RootState) => state.cart)
  const { profilePurchase } = useSelector((state:RootState) => state.preferenceProfile)
  const subtotal = cart.map(product => product.price * product.cantidad).reduce((accumulator, current) => accumulator + current, 0)

  const [checkoutProfile, setCheckoutProfile] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { decode } = useEncode()

  const cartProducts = decode(VITE_C_CART)
    
  async function handlerPurchase (payment_id:string) {
    const {data} = await fetchPOST("http://localhost:3001/purchase/create", { direction:profilePurchase.street, userEmail: profilePurchase.email, payment_id: payment_id, products:cartProducts }) as {data:ResponseData}
    dispatch(deletePreferenceProfile())
    if (data.error) return error(data.message);
    if (!data.error) {
      dispatch(deleteAllCart())
      return success(data.message)
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const params: any = {};
    for (const [key, value] of urlParams) {
      params[key] = value;
    }
    if (params["status"] === "approved" && cartProducts.length > 0) {
      handlerPurchase(params["payment_id"])
    } 
    console.log(profilePurchase);
    
  },[])

  return (
    <main>
        <Nav style="sticky"/>
        {cartProducts.length > 0
          ? 
            <section className="w-[95%] mx-auto h-auto flex justify-evenly items-start py-10 bg-blued-500"> 
              <section className="w-[60%] h-[450px] px-3 bg-redd-500">

                { !checkoutProfile ? <CheckoutCart/> : <CheckoutProfile/>}

              </section>

              <section className="w-[30%] py-5 rounded-lg flex justify-center items-center gap-y-3 flex-col px-5 bg-neutral-200">
                <h3 className="tracking-wider font-semibold">Resumen de Compra</h3>

                {!checkoutProfile ? <SummaryCart subtotal={subtotal} setCheckoutProfile={() => setCheckoutProfile(true)}/> : <SummaryProfile/>}

                <Button style="text-sm" text="Seguir comprando" dir="/shop"/>

              </section>
            </section>
          : 
            <section className="w-[95%] min-h-[200px] mx-auto flex justify-center items-center flex-col py-10 bg-neutral-200 rounded-md">
              <img src={shop} alt="" className="w-[200px] bg-redd-500"/>
              <h2 className="text-sm font-semibold text-neutral-800 tracking-widest">No hay productos en el carrito</h2>
              <Link to={"/shop"}>
                <h3 className="text-xs pt-5">Seguir comprando</h3>
              </Link>
            </section>
        }
    </main>
  )
}

export default Checkout

