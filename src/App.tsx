import { Route, Routes } from "react-router-dom"
import Shop from "./views/Shop/Shop"
import Admin from "./views/Admin/Admin"
import DetailProduct from "./views/DetailProduct/DetailProduct"
import Access from "./views/Access/Access"
import RouterProtection from "./middleware/RouterProtection/RouterProtection"
import { useSelector } from "react-redux"
import { RootState } from "./redux/store"
import Checkout from "./views/Checkout/Checkout"
import ScrollToTop from "./middleware/ScrollToTop/ScrollToTop"
// import CheckoutCart from "./components/CheckoutCart/CheckoutCart"
// import CheckoutPayment from "./components/CheckoutPayment/CheckoutPa}yment"
// import CheckoutDelivery from "./components/CheckoutDelivery/CheckoutDelivery"
const { VITE_R_SA } = import.meta.env


function App() {
  const { role } = useSelector((state:RootState) => state.auth.user)

  return (
    <>
    <ScrollToTop/>
    <Routes>
      <Route path="/" element={<Shop/>}/>
      <Route path="/shop" element={<Shop/>}/>

      <Route path="/checkout/*" element={<Checkout/>}/>

      <Route element={<RouterProtection isAllowed={role === VITE_R_SA} redirectTo="/shop"/>}>
            <Route path="/admin" element={<Admin/>}/> 
      </Route>

      <Route element={<RouterProtection isAllowed={role === null || role === undefined} redirectTo="/shop"/>}>
            <Route path="/access" element={<Access/>}/>
      </Route>

      <Route path="/detail/:id" element={<DetailProduct/>}/>
    </Routes>
    </>
  )
}

export default App
