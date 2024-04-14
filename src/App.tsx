import { Route, Routes } from "react-router-dom"
import Shop from "./views/Shop/Shop"
import Admin from "./views/Admin/Admin"
import DetailProduct from "./views/DetailProduct/DetailProduct"
import Access from "./views/Access/Access"
import RouterProtection from "./utils/RouterProtection/RouterProtection"
import { useSelector } from "react-redux"
import { RootState } from "./redux/store"
import Checkout from "./views/Checkout/Checkout"
const { VITE_R_SA } = import.meta.env

function App() {
  const { role } = useSelector((state:RootState) => state.auth.user)

  return (
    <Routes>
      <Route path="/" element={<Shop/>}/>
      <Route path="/shop" element={<Shop/>}/>
      <Route path="/checkout" element={<Checkout/>}/>

      <Route element={<RouterProtection isAllowed={role === VITE_R_SA} redirectTo="/shop"/>}>
            <Route path="/admin" element={<Admin/>}/> 
      </Route>

      <Route element={<RouterProtection isAllowed={role === null || role === undefined} redirectTo="/shop"/>}>
            <Route path="/access" element={<Access/>}/>
      </Route>

      <Route path="/detail/:id" element={<DetailProduct/>}/>
    </Routes>
  )
}

export default App


// VERSA | V1 ----------------------------------------------------------------------------------------------
// import { Route, Routes } from "react-router-dom"
// import Home from "./views/Home/Home"
// // import SignUp from "./views/SignUp/SignUp"
// import Shop from "./views/Shop/Shop"
// import Admin from "./views/Admin/Admin"
// import DetailProduct from "./views/DetailProduct/DetailProduct"
// import Access from "./views/Access/Access"
// import Profile from "./views/Profile/Profile"
// import Purchases from "./views/MyPurchase/MyPurchase"
// import Checkout from "./views/Checkout/Checkout"
// import RouterProtection from "./utils/RouterProtection/RouterProtection"
// // import { useDecode } from "./hooks/useDecode"
// // import { useEffect } from "react"
// import { useSelector } from "react-redux"
// import { RootState } from "./redux/store"
// const { VITE_R_SA, VITE_R_U} = import.meta.env
// function App() {
//   const { role } = useSelector((state:RootState) => state.auth.user)

//   return (
//     <Routes>
//       <Route path="/" element={<Home/>}/>

//       <Route element={<RouterProtection isAllowed={role === VITE_R_U || role === VITE_R_SA} redirectTo="/access"/>}>
//             <Route path="/profile/:id" element={<Profile/>}/>
//             <Route path="/mypurchase/:id" element={<Purchases/>}/>
//             <Route path="/checkout" element={<Checkout/>}/>
//       </Route>

//       <Route element={<RouterProtection isAllowed={role === VITE_R_SA} redirectTo="/shop"/>}>
//             <Route path="/admin" element={<Admin/>}/> 
//       </Route>

//       <Route element={<RouterProtection isAllowed={role === null || role === undefined} redirectTo="/shop"/>}>
//             <Route path="/access" element={<Access/>}/>
//       </Route>

//       <Route path="/shop" element={<Shop/>}/>
//       <Route path="/detail/:id" element={<DetailProduct/>}/>
//     </Routes>
//   )
// }

// export default App

