import { Route, Routes } from "react-router-dom"
import Home from "./views/Home/Home"
import SignUp from "./views/SignUp/SignUp"
import Shop from "./views/Shop/Shop"
import Admin from "./views/Admin/Admin"
import DetailProduct from "./views/DetailProduct/DetailProduct"
function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/shop" element={<Shop/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/detail/:id" element={<DetailProduct/>}/>
    </Routes>
  )
}

export default App
