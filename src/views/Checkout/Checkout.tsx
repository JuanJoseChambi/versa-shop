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
import { Link, Route, Routes, useNavigate } from "react-router-dom"
import logo from "../../assets/Icon/V3.1.1.png"
// import shop from "../../assets/checkout/shop.svg"
// import { deletePreferenceProfile } from "../../redux/slice/preferenceProfileSlice"
import ArrowBefore from "../../components/ArrowBefore/ArrowBefore"
import CheckoutPayment from "../../components/CheckoutPayment/CheckoutPayment"
import CheckoutDelivery from "../../components/CheckoutDelivery/CheckoutDelivery"
import CheckoutProgress from "../../components/CheckoutProgress/CheckoutProgress"
import ViewNotFound from "../../components/ViewNotFound/ViewNotFound"
const { VITE_C_CART, VITE_URL_BASE} = import.meta.env



// interface ConfigStateCheckout {
//   [key: string]: {
//     component: React.ReactNode;
//     state: string
//   }
// }

function Checkout() {
  
  const { cart } = useSelector((state:RootState) => state.cart)
  const { profilePurchase } = useSelector((state:RootState) => state.preferenceProfile)
  const subtotal = cart.map(product => product.price * product.cantidad).reduce((accumulator, current) => accumulator + current, 0)

  const [saleCreated, setSaleCreated] = useState<boolean>(false)
  const [approvedSale, setApprovedSale] = useState<{payment?:string, purchase?:string}>({payment:"", purchase:""})

  // const [purchaseHandled, setPurchaseHandled] = useState(false);
  // const configStateCheckout:ConfigStateCheckout = {
  //   cart: {
  //     component: <CheckoutCart/>,
  //     state: "cart"
  //   },
  //   delivery: {
  //     component: <CheckoutDelivery/>,
  //     state: "delivery"
  //   },
  //   payment: {
  //     component: <CheckoutPayment/>,
  //     state: "payment"
  //   }
  // }


  // const [checkout, setCheckout] = useState<string>("cart");
  const dispatch: AppDispatch = useDispatch();
  const { decode } = useEncode()
  const navigate = useNavigate()

  const cartProducts = decode(VITE_C_CART)
    
  async function handlerPurchase (payment_id:string) {
    console.log('handlerPurchase called');
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
      
      discountCode:profilePurchase.discountCode,
      userEmail: profilePurchase.email, 
      payment_id: payment_id, 
      products:cartProducts 
    }) as {data:ResponseData}
    // dispatch(deletePreferenceProfile())
    if (data.error) return error(data.message);
    if (!data.error) {
      // dispatch(deletePreferenceProfile())
      dispatch(deleteAllCart())
      setApprovedSale({payment:payment_id, purchase:"Aprobado"})
      approvedSale.payment && approvedSale.purchase && success(data.message)
      // return
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const params: any = {};
    for (const [key, value] of urlParams) {
      params[key] = value;
    }
    if (params["status"] === "approved" && cartProducts.length > 0) {
      setSaleCreated(true)
      handlerPurchase(params["payment_id"])
    } 
    console.log(params);
    console.log(approvedSale);
  },[])
  
  // const { component, state } = configStateCheckout[checkout] || {component: null, state: ""};
  // console.log(component);
  
  return (
    <main className="min-h-screen bg-greend-500">
        <Nav style="sticky"/>
        {cartProducts?.length > 0
          ? 
            <section className="w-area mx-auto min-h-96 relative flex justify-start lg:justify-evenly items-start flex-col gap-y-8 lg:gap-0 lg:flex-row pt-10 bg-blued-500"> 
              <section className="w-full lg:w-[65%] h-auto lg:min-h-[500px] px-3 bg-redd-500">

                {(window.location.pathname === "/checkout/delivery" || window.location.pathname === "/checkout/paymenyt") && <CheckoutProgress currentCheckout={window.location.pathname.split("/").reverse()[0]}/>}

                {/* {component} */}
                

              <Routes>
                <Route path="" element={<CheckoutCart/>}/>
                <Route path="delivery" element={<CheckoutDelivery/>}/>
                <Route path="payment" element={<CheckoutPayment/>}/>
              </Routes>

              </section>

              {(window.location.pathname === "/checkout" || window.location.pathname === "/checkout/delivery" || window.location.pathname === "/checkout/payment") ? <section className="sticky w-full lg:w-[30%] top-10 py-5 rounded-lg flex justify-center items-center gap-y-3 flex-col px-5 bg-neutral-100">
                <h3 className="tracking-wider font-semibold">Resumen de Compra</h3>
                
                {window.location.pathname !== "/checkout" && <ArrowBefore onClick={() => navigate('/checkout')} styleIcon="text-lg" />}
                {window.location.pathname === "/checkout" ? <SummaryCart subtotal={subtotal} checkout="/delivery"/> : <SummaryProfile/>}

                <Button style="text-sm" text="Seguir comprando" dir="/shop"/>

              </section> : <ViewNotFound/>}
              
            </section>
          :
            <section className="w-[95%] h-[85vh] mx-auto flex justify-center items-center flex-col py-10 bg-redd-500 rounded-md">
              {/* <img src={shop} alt="" className="w-[200px] bg-redd-500"/> */}
              <i className="bx bx-cart text-[130px] relative flex justify-center items-center bg-redd-500">
                <i className="bx bx-error-circle text-[40px] absolute -top-5 right-9 text-rose-600"/>
                </i>
              <h2 className="text-sm font-semibold text-neutral-800 tracking-widest">No existen productos en en carrito</h2>
              <Link to={"/shop"}>
                <h3 className="text-xs pt-5">Seguir comprando</h3>
              </Link>
            </section>
        }

        {saleCreated && 
          <section className="w-full h-screen flex justify-center items-center flex-col gap-y-5 fixed top-0 left-0 bg-[#f9f9f9]">
            { approvedSale?.payment && approvedSale?.purchase 
            ? 
              <section className="w-full h-screen flex justify-center items-center flex-col gap-y-5 fixed top-0 left-0 bg-[#f9f9f9]">
                <section className="max-w-[400px] mx-5 h-auto relative px-6 py-6 flex flex-col bg-white text-gray-800 rounded-lg shadow-lg shadow-neutral-400">
                  <div className="flex justify-between items-center w-full mb-4">
                    <ArrowBefore onClick={() => { navigate('/') }} text="Inicio" styleText="text-xs font-extralight flex juscify-start items-center" style="text-gray-800" styleIcon="text-sm"/>
                    <picture className="w-[40px] mx-auto">
                      <img src={logo} alt="Versa Shop" className="drop-shadow-[0px_3px_3px_#262626] bg-neutrald-800"/>
                    </picture>
                  </div>
                  <div className="w-full mb-2">
                    <p className="text-xs text-gray-600">Pago ID: # {approvedSale?.payment}</p>
                    <p className="text-xs text-green-600 font-bold">{approvedSale?.purchase}</p>
                  </div>
                  <p className="text-lg font-semibold mb-2">¡Gracias por tu compra!</p>
                  <p className="text-sm mb-3">En breve recibirás en tu correo Gmail toda la información sobre tu pedido. ¡Esperamos que disfrutes tu producto!</p>
                  <p className="text-sm">Saludos cordiales,</p>
                  <p className="text-sm font-noto font-bold">Versa</p>
                </section>
              </section>

            // <section className="max-w-[400px] mx-5 h-60 relative px-4 py-3 flex justify-evenly items-center flex-col bg-neutral-800 text-gray-200 rounded-sm">
            //     <ArrowBefore onClick={() => { navigate('/') }} text="Inicio" styleText="text-xs font-extralight" style="text-white flex jusctify-center items-center" styleIcon="text-sm"/>
            //     <picture className="w-[40px] flex justify-center items-center">
            //       <img src={logo} alt="Versa Shop" />
            //     </picture>
            //     {/* <h3 className="w-full font-noto">Versa</h3> */}
            //     <div className="w-full flex justify-between items-center">
            //       <p className="w-full text-xs font-extralight">Pago ID: # {approvedSale?.payment}</p>
            //       <p className="text-xs text-green-500 font-extralight">{approvedSale?.purchase}</p>
            //     </div>
            //     <p className="text-sm font-extralight">¡Gracias por tu compra! En breve recibirás en tu correo Gmail toda la información sobre tu pedido. ¡Esperamos que disfrutes tu producto!</p>
            //     <p className="w-full text-sm font-extralight">Saludos cordiales,</p>
            //     <p className="w-full text-sm font-noto font-semibold">Versa</p>
            // </section>
          
            : 
              <>
                <div className="w-[40px] h-[40px] rounded-full border-t-2 border-r-2  border-black animate-spin"></div>
                <h3 className="text-neutral-800 text-sm font-semibold">Cargando...</h3>
              </>
            }
          </section>}
    </main>
  )
}

export default Checkout

