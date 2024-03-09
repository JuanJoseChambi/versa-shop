import { Route, Routes } from "react-router-dom"
import Home from "./views/Home/Home"
import SignUp from "./views/SignUp/SignUp"
function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
  )
}

export default App
