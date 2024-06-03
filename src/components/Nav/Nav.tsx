import { useEffect, useState } from "react"
import Button from "../Button/Button"
import Cart from "../Cart/Cart"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { Link, useLocation } from "react-router-dom"
import OptionsAcordeon from "../OptionsAcordeon/OptionsAcordeon"
import Cookies from "js-cookie" 
import { search } from "../../redux/slice/navBarSlice"
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
    
    useEffect(() => {
        searchActive ? window.document.body.style.overflowY = "hidden" : window.document.body.style.overflowY = "auto";
    },[searchActive])

  return (
    <nav className={`w-area mx-auto flex justify-between items-center py-4 fixed left-0 right-0 z-[100] ${style}`}>

            <Link to={"/"}>
                <h2 className="font-bold text-2xl font-noto">Versa</h2>
            </Link>

            <section className="hidden sm:flex space-x-5 justify-center items-center">
                {!searchActive && <Button style="text-xs font-semibold tracking-widest" text="TIENDA" dir="/shop"/>}
                {!searchActive && <Button style="text-xs font-semibold tracking-widest" text="NOSOTROS"/>}
                {!searchActive && <Button style="text-xs font-semibold tracking-widest" text="CATEGORIAS"/>}
                {searchActive && <input type="text" className="w-[300px] text-sm text-black font-semibold px-2 py-0.5 outline-none rounded-sm bg-[#ffffffe7] border border-neutral-300" placeholder="Que estas buscando?"/>}
            </section>

            <aside className={`${searchActive ? "w-full h-screen flex justify-center items-center flex-col gap-10 fixed top-0 left-0 right-0 bg-[#000000b6]" : "hidden"}`}>
                <h3 className="font-bold text-5xl tracking-widest">BUSCADOR</h3>
                <div className="w-[80%] flex justify-between items-center text-sm text-black font-semibold px-2 py-2 outline-none rounded-sm bg-[#ffffffe7] border border-neutral-300">
                    <input 
                        type="text" 
                        className="w-full bg-transparent outline-none" 
                        value={sought}
                        onChange={(e) => setSought(e.target.value)}
                        placeholder="Que estas buscando?"/>
                    <i className={`${!sought && "hidden"} bx bx-x scale-150`} onClick={() => {setSought(""), dispatch(search(""))}}></i>
                </div>
                <div className="w-full flex justify-center items-center gap-5">
                    <button className="px-5 py-1 text-white border border-neutral-200" onClick={() => setSearchActive(false)}>Cancelar</button>
                    <button className="px-5 py-1 bg-neutral-800 text-white" onClick={() => dispatch(search(sought))}>Buscar</button>
                </div>
                <h3 className="font-noto text-3xl absolute bottom-6 tracking-widest font-semibold">Versa</h3>
            </aside>

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
