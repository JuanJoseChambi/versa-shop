import { useState } from "react"
import Button from "../Button/Button"
import Cart from "../Cart/Cart"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { Link, useLocation } from "react-router-dom"
import OptionsAcordeon from "../OptionsAcordeon/OptionsAcordeon"
import Cookies from "js-cookie" 
const { VITE_R_SA, VITE_C_USER } = import.meta.env

interface styleProp {
    style?:string
}

function Nav({style}:styleProp) {
    const [cartVisible, setCartVisible] = useState<boolean>(false)
    const [hover, setHover] = useState<string | null>();
    const [acorden, serAcordeon] = useState<boolean>(false) 

    const { cart } = useSelector((state:RootState) => state.cart)
    const { user } = useSelector((state:RootState) => state.auth)

    const { pathname } = useLocation();

    const cartButton = pathname === "/checkout";
    // console.log((user));
    

  return (
    <nav className={`w-[95%] mx-auto flex justify-between items-center py-4 fixed left-0 right-0 z-[100] ${style}`}>
        <Link to={"/"}>
            <h2 className="font-bold text-2xl font-noto">Versa</h2>
        </Link>

        <section className="hidden sm:flex space-x-5 justify-center items-center">
            <Button style="text-xs font-semibold tracking-widest" text="TIENDA" dir="/shop"/>
            <Button style="text-xs font-semibold tracking-widest" text="NOSOTROS"/>
            <Button style="text-xs font-semibold tracking-widest" text="CATEGORIAS"/>
        </section>

        <div className="flex justify-center items-center space-x-5">

            <div className={`${hover === "searchNav" ? "border backdrop-blur-sm" : null} border-neutral-500 flex justify-center items-center px-3 rounded-lg`} onMouseDown={() => setHover("searchNav")} onMouseLeave={() => setHover(null)}>
                <input type="text" className={`${hover === "searchNav" ? "w-[120px]" : "w-0" } transition-[width] duration-500  outline-none text-xs bg-transparent`}/>
                <Button iconLeft="bx bx-search" style="pl-2 py-1"/>
            </div>

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
