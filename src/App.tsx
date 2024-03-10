import { Route, Routes } from "react-router-dom"
import Home from "./views/Home/Home"
import SignUp from "./views/SignUp/SignUp"
import Shop from "./views/Shop/Shop"
import Admin from "./views/Admin/Admin"
function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/shop" element={<Shop/>}/>
      <Route path="/admin" element={<Admin/>}/>
    </Routes>
  )
}

export default App
