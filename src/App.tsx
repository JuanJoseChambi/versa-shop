import { Route, Routes } from "react-router-dom"
import Home from "./views/Home/Home"
// import SignUp from "./views/SignUp/SignUp"
import Shop from "./views/Shop/Shop"
import Admin from "./views/Admin/Admin"
import DetailProduct from "./views/DetailProduct/DetailProduct"
import Access from "./views/Access/Access"
import Profile from "./views/Profile/Profile"
function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/access" element={<Access/>}/>
      <Route path="/shop" element={<Shop/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/detail/:id" element={<DetailProduct/>}/>
      <Route path="/profile/:id" element={<Profile/>}/>
    </Routes>
  )
}

export default App


