import { useState } from "react"
import Button from "../Button/Button"
import Cart from "../Cart/Cart"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { Link, useLocation, useNavigate } from "react-router-dom"
import OptionsAcordeon from "../OptionsAcordeon/OptionsAcordeon"
import Cookies from "js-cookie" 
import { search } from "../../redux/slice/navBarSlice"
// import Input from "../Input/Input"
const { VITE_R_SA, VITE_C_USER } = import.meta.env

interface styleProp {
    style?:string
}

function Nav({style}:styleProp) {
    const [cartVisible, setCartVisible] = useState<boolean>(false)
    const [acorden, serAcordeon] = useState<boolean>(false) 

    const { cart } = useSelector((state:RootState) => state.cart)
    const { user } = useSelector((state:RootState) => state.auth)

    const dispatch: AppDispatch = useDispatch()

    const [sought, setSought] = useState<string>("")
    const [searchActive, setSearchActive] = useState(false)

    const { pathname } = useLocation();

    const cartButton = pathname === "/checkout";
    const homeButtons = pathname === "/" || pathname === "/shop";

    const navigate = useNavigate()

    function handlerKey (e:React.KeyboardEvent<HTMLInputElement>) {
        if(e.key === "Enter"){
            dispatch(search(sought))
            navigate("/")
        }
    }

  return (
    <nav className={`w-area mx-auto flex justify-between items-center py-4 fixed left-0 right-0 z-[100] ${style}`}>

            <Link to={"/"}>
                <h2 className="font-bold text-2xl font-noto">Versa</h2>
            </Link>

            <section className="hidden sm:flex space-x-5 justify-center items-center">
                {!searchActive && <Button style="text-xs font-semibold tracking-widest" text="TIENDA" dir="/shop"/>}
                {!searchActive && <Button style="text-xs font-semibold tracking-widest" text="NOSOTROS"/>}
                {!searchActive && <Button style="text-xs font-semibold tracking-widest" text="CATEGORIAS"/>}
                {searchActive && 
                <div className="w-[300px] text-sm flex justify-center items-center gap-x-1 text-black font-semibold px-3 py-0.5 rounded-full outline-none bg-[#ffffff] border border-neutral-300 shadow-md shadow-neutral-700">
                    <input 
                        type="text" 
                        value={sought}
                        onChange={(e) => setSought(e.target.value)}
                        onKeyDown={handlerKey}
                        className="w-full bg-transparent outline-none" 
                        placeholder="Que estas buscando?"/>
                    <i className={`${!sought && "hidden"} cursor-pointer bx bx-x scale-150 text-neutral-600`} onClick={() => {setSought(""), dispatch(search(""))}}></i>
                </div>
                }
            </section>

            <div className="w-full h-auto fixed top-16 bg-redd-500 flex justify-center items-center bg-transparent sm:hidden">
                <div className={`
                    ${searchActive 
                        ? "w-[80%] mx-auto flex sm:hidden justify-between items-center text-sm text-black font-semibold px-3 py-1.5 outline-none rounded-xl bg-white border border-neutral-400 shadow-md shadow-neutral-700"
                        : "hidden"}`}>
                    <input 
                        type="text" 
                        className="w-full bg-transparent outline-none" 
                        value={sought}
                        onKeyDown={handlerKey}
                        onChange={(e) => setSought(e.target.value)}
                        placeholder="Que estas buscando?"/>
                    <i className={`${!sought && "hidden"} bx bx-x scale-150`} onClick={() => {setSought(""), dispatch(search(""))}}></i>
                </div>
            </div>

            <div className={`flex justify-center items-center space-x-5 ${homeButtons && "px-3 py-2 rounded-full bg-[#0000002f]"}`}>

                <Button iconLeft="bx bx-search" style="bg-redd-500" onClick={() => setSearchActive(!searchActive)}/>

                {!cartButton && <div className="relative flex justify-center items-center">
                    <Button iconLeft="bx bx-cart" style="text-lg z-10" onClick={() => setCartVisible(!cartVisible)}/>
                    <div className="absolute -top-2 -right-2 text-[10px] px-1 bg-neutral-500 text-white rounded-full">{cart.length}</div>
                </div>}
                { user.role === VITE_R_SA && <div>
                <Button iconLeft="bx bx-shield-alt-2" style="text-lg" onClick={() => serAcordeon(!acorden)}/>
                </div>}

            </div>
            
            <OptionsAcordeon visible={acorden} options={
                [
                    {text:"Panel Admin", iconLeft:"bx bx-user", dir:"/admin", onClick:() => setCartVisible(!cartVisible)},
                    {text:"Cerrar sesion", iconLeft:"bx bx-log-out", dir:"/shop", onClick:() => {Cookies.remove(VITE_C_USER), window.location.reload()}},
                ]}/>
            <Cart visible={cartVisible} onClose={() => setCartVisible(!cartVisible)}/>
        
    </nav>
  )
}

export default Nav
