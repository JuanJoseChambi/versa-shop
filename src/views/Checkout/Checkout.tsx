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
const { VITE_C_CART} = import.meta.env



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
      state: ""
    },
    delivery: {
      component: <CheckoutDelivery setCheckout={() => setCheckout("payment")}/>,
      state: ""
    },
    payment: {
      component: <CheckoutPayment/>,
      state: ""
    }
  }


  const [checkout, setCheckout] = useState<string>("cart");
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
    console.log(params);
    console.log(profilePurchase);
    
  },[])
  
  const { component, state } = configStateCheckout[checkout] || {component: null, state: ""};
  // console.log(component);
  
  return (
    <main className="min-h-screen bg-greend-500">
        <Nav style="sticky"/>
        {cartProducts.length > 0
          ? 
            <section className="w-area mx-auto h-auto flex justify-evenly items-start flex-col gap-y-8 lg:gap-0 lg:flex-row pt-10 pb-28 bg-blued-500"> 
              <section className="w-full lg:w-[65%] h-auto lg:h-[500px] px-3 bg-re-500">
                {/* <div className="min-w-[100px] max-w-[600px] h-[1px] mx-auto bg-gray-500">
                  <div className="w-[20px] bg-red-500">
                    <div className="">
                      <svg className="w-[15px] h-auto" width="9px" height="9px" viewBox="0 0 1024 1024"><path d="M392.715 691.38L243.381 542.047C226.741 525.407 200.288 525.407 183.648 542.047C167.008 558.687 167.008 585.14 183.648 601.78L362.421 780.553C379.061 797.193 405.941 797.193 422.581 780.553L874.848 328.713C891.488 312.073 891.488 285.62 874.848 268.98C858.208 252.34 831.755 252.34 815.115 268.98L392.715 691.38Z"></path></svg>
                    </div>
                    <p>Carrito</p>
                  </div>
                  <div></div>
                  <div></div>
                </div> */}

                <ul className="flex justify-between items-center px-10 py-2 text-sm">
                  <li>
                    <button className="w-[20px] text-center flex justify-center items-center flex-col bg-transparent cursor-pointer" aria-disabled="true" >
                      <div className="p-[6px] border border-neutral-500 rounded-full">
                        <svg className="svg" width="10px" height="10px" viewBox="0 0 1024 1024"><path d="M392.715 691.38L243.381 542.047C226.741 525.407 200.288 525.407 183.648 542.047C167.008 558.687 167.008 585.14 183.648 601.78L362.421 780.553C379.061 797.193 405.941 797.193 422.581 780.553L874.848 328.713C891.488 312.073 891.488 285.62 874.848 268.98C858.208 252.34 831.755 252.34 815.115 268.98L392.715 691.38Z"></path></svg>
                      </div>
                      <p className="breadcrumb-timeline-item-text">Carrito</p>
                    </button>
                  </li>
                  <li className="flex-1 h-[1px] bg-neutral-400 relative -top-[10px]"></li>
                  <li>
                    <button className="w-[20px] text-center flex justify-center items-center flex-col bg-transparent cursor-pointer">
                      <div className="p-[6px] bg-white border border-neutral-500 rounded-full">
                        <svg className="svg" width="12px" height="12px" viewBox="0 0 1024 1024"><path d="M579.9,247.5H5v-78h613.9c21.5,0,39,17.5,39,39v105.4h177.7c11.8,0,23.1,5.4,30.5,14.6l144.4,180.6 c5.5,6.9,8.5,15.5,8.5,24.4v216.7c0,21.5-17.5,39-39,39h-76.4c-15.8,42.2-56.5,72.2-104.2,72.2c-61.4,0-111.2-49.8-111.2-111.2	S738,638.9,799.5,638.9c47.7,0,88.4,30,104.2,72.2H941v-164L816.8,391.9H657.9v358.2c0,21.5-17.5,39-39,39H402.2v-78h177.7V247.5z M402.2,391.9h-325v-78h325V391.9z M330,536.4H5v-78h325V536.4z M221.7,716.9c-18.3,0-33.2,14.9-33.2,33.2 c0,18.3,14.9,33.2,33.2,33.2c18.3,0,33.2-14.9,33.2-33.2C254.9,731.8,240,716.9,221.7,716.9z M110.5,750.1 c0-61.4,49.8-111.2,111.2-111.2c61.4,0,111.2,49.8,111.2,111.2s-49.8,111.2-111.2,111.2C160.3,861.3,110.5,811.6,110.5,750.1z M799.5,716.9c-18.3,0-33.2,14.9-33.2,33.2c0,18.3,14.9,33.2,33.2,33.2c18.3,0,33.2-14.9,33.2-33.2	C832.7,731.8,817.8,716.9,799.5,716.9z"></path></svg>
                      </div>
                      <p className="breadcrumb-timeline-item-text">Entrega</p>
                    </button>
                  </li>
                  <li className="flex-1 h-[1px] bg-neutral-400 relative -top-[10px]"></li>
                  <li>
                    <button className="w-[20px] text-center flex justify-center items-center flex-col bg-transparent cursor-pointer" aria-disabled="true">
                      <div className="p-[6px] border border-neutral-500 rounded-full">
                        <svg className="svg" width="9px" height="9px" viewBox="0 0 1024 1024"><path d="M944.5 140.5C910.9 106.9 865.3 88 817.8 88H182.3c-47.5 0-93.1 18.9-126.7 52.5C21.9 174.1 3 219.7 3 267.2v456.3c0 47.5 18.9 93.1 52.5 126.7 33.6 33.6 79.2 52.5 126.7 52.5h635.5c47.5 0 93.1-18.9 126.7-52.5C978.1 816.6 997 771 997 723.5V267.2c0-47.5-18.9-93.1-52.5-126.7zm-37.1 583c0 23.8-9.4 46.6-26.2 63.4-16.8 16.8-39.6 26.2-63.4 26.2H182.3c-23.8 0-46.6-9.4-63.4-26.2-16.8-16.8-26.2-39.6-26.2-63.4V450.6h814.7v272.9zm0-362.6H92.7v-93.7c0-23.8 9.4-46.6 26.2-63.4 16.8-16.8 39.6-26.2 63.4-26.2h635.5c23.8 0 46.6 9.4 63.4 26.2 16.8 16.8 26.2 39.6 26.2 63.4v93.7z"></path></svg>
                      </div>
                      <p className="breadcrumb-timeline-item-text">Pago</p>
                    </button>
                  </li>
                </ul>


                {state}
                {component}
                {/* <CheckoutCart/> */}

              </section>

              <section className="relative w-full lg:w-[30%] py-5 rounded-lg flex justify-center items-center gap-y-3 flex-col px-5 bg-neutral-100">
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

