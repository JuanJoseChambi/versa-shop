import { useDispatch, useSelector } from "react-redux"
import Nav from "../../components/Nav/Nav"
import { AppDispatch, RootState } from "../../redux/store"
import Button from "../../components/Button/Button"
import { useEffect, useState } from "react"
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
import ArrowBefore from "../../components/ArrowBefore/ArrowBefore"
import CheckoutPayment from "../../components/CheckoutPayment/CheckoutPayment"
import CheckoutDelivery from "../../components/CheckoutDelivery/CheckoutDelivery"
import CheckoutProgress from "../../components/CheckoutProgress/CheckoutProgress"
const { VITE_C_CART, VITE_URL_BASE} = import.meta.env



interface ConfigStateCheckout {
  [key: string]: {
    component: React.ReactNode;
    state: string
  }
}

function Checkout() {
  
  const { cart } = useSelector((state:RootState) => state.cart)
  const { profilePurchase } = useSelector((state:RootState) => state.preferenceProfile)
  const subtotal = cart.map(product => product.price * product.cantidad).reduce((accumulator, current) => accumulator + current, 0)

  const configStateCheckout:ConfigStateCheckout = {
    cart: {
      component: <CheckoutCart/>,
      state: "cart"
    },
    delivery: {
      component: <CheckoutDelivery setCheckout={() => setCheckout("payment")}/>,
      state: "delivery"
    },
    payment: {
      component: <CheckoutPayment/>,
      state: "payment"
    }
  }


  const [checkout, setCheckout] = useState<string>("cart");
  const dispatch: AppDispatch = useDispatch();
  const { decode } = useEncode()

  const cartProducts = decode(VITE_C_CART)
    
  async function handlerPurchase (payment_id:string) {
    const {data} = await fetchPOST(`${VITE_URL_BASE}/purchase/create`, { 
      city: profilePurchase.city,
      country: profilePurchase.country,
      email: profilePurchase.email,
      houseApartament: profilePurchase.houseApartament,
      idUser: profilePurchase.id,
      lastname: profilePurchase.lastname,
      methodOfDelivery: profilePurchase.methodOfDelivery,
      name: profilePurchase.name,
      neighborhood: profilePurchase.neighborhood,
      number: profilePurchase.number,
      phone: profilePurchase.phone,
      postalCode: profilePurchase.postalCode,
      street:profilePurchase.street, 
      
      userEmail: profilePurchase.email, 
      payment_id: payment_id, 
      products:cartProducts 
    }) as {data:ResponseData}
    // dispatch(deletePreferenceProfile())
    if (data.error) return error(data.message);
    if (!data.error) {
      dispatch(deletePreferenceProfile())
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
    // console.log(params);
    // console.log(profilePurchase);
    
  },[])
  
  const { component, state } = configStateCheckout[checkout] || {component: null, state: ""};
  // console.log(component);
  
  return (
    <main className="min-h-screen bg-greend-500">
        <Nav style="sticky"/>
        {cartProducts?.length > 0
          ? 
            <section className="w-area  mx-auto h-auto flex justify-evenly items-start flex-col gap-y-8 lg:gap-0 lg:flex-row pt-10 pb-28 bg-blued-500"> 
              <section className="w-full lg:w-[65%] h-auto lg:min-h-[500px] px-3 bg-re-500">

                {state !== "cart" && <CheckoutProgress currentCheckout={state}/>}

                {component}

              </section>

              <section className="sticky w-full lg:w-[30%] top-10 py-5 rounded-lg flex justify-center items-center gap-y-3 flex-col px-5 bg-neutral-100">
                <h3 className="tracking-wider font-semibold">Resumen de Compra</h3>
                {checkout !== "cart" && <ArrowBefore onClick={() => setCheckout("cart")} styleIcon="text-lg" />}
                {checkout === "cart" ? <SummaryCart subtotal={subtotal} setCheckout={() => setCheckout("delivery")}/> : <SummaryProfile/>}

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

