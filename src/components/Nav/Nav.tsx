import { useState } from "react"
import Button from "../Button/Button"
import Cart from "../Cart/Cart"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { Link } from "react-router-dom"
import { useDecode } from "../../hooks/useDecode"
import Cookies from "js-cookie"
import flower from "../../assets/asHome/FlowerWhite.png"
import OptionsAcordeon from "../OptionsAcordeon/OptionsAcordeon"
const { VITE_C_USER } = import.meta.env

interface styleProp {
    style?:string
}

function Nav({style}:styleProp) {
    const [cartVisible, setCartVisible] = useState<boolean>(false)
    const [hover, setHover] = useState<string | null>();
    const [acorden,setAcordeon] = useState(false)

    const { cart } = useSelector((state:RootState) => state.cart)

    const { role, id, name, nickname } = useDecode(VITE_C_USER)




  return (
    <nav className={`w-[95%] mx-auto flex justify-between items-center py-4 fixed left-0 right-0 z-[100] ${style}`}>
        <Link to={"/"}>
            <h2 className="font-bold text-2xl font-noto">Versa</h2>
        </Link>

        <section className="space-x-5 flex justify-center items-center">
            <Button style="text-xs font-semibold tracking-widest" text="TIENDA" dir="/shop"/>
            <Button style="text-xs font-semibold tracking-widest" text="NOSOTROS"/>
            <Button style="text-xs font-semibold tracking-widest" text="CATEGORIAS"/>
        </section>

        <div className="flex justify-center items-center space-x-5">

            <div className={`${hover === "searchNav" ? "border" : null} border-neutral-500  flex justify-center items-center px-3 rounded-lg`} onMouseDown={() => setHover("searchNav")} onMouseLeave={() => setHover(null)}>
                <input type="text" className={`${hover === "searchNav" ? "w-[120px]" : "w-0" } transition-[width] duration-500  outline-none text-xs bg-transparent`}/>
                <Button iconLeft="bx bx-search" style="pl-2 py-1"/>
            </div>

            <div className="relative flex justify-center items-center">
                <Button iconLeft="bx bx-cart" style="text-lg z-10" onClick={() => setCartVisible(!cartVisible)}/>
                <div className="absolute -top-2 -right-2 text-[10px] px-1 bg-neutral-500 text-white rounded-full">{cart.length}</div>
            </div>

            {role === null && <Button iconLeft="bx bx-user" style="text-lg" dir="/access"/>}
            {role !== null && <Button img={flower} onClick={() => setAcordeon(!acorden)}/>}
            <OptionsAcordeon 
                visible={acorden} 
                options={[
                    {node:
                    <div className="w-full flex justify-evenly items-start pb-1 pt-1">
                        <section className="relative">
                            <picture className="relative flex w-[50px] h-[50px] overflow-hidden bg-neutral-500 rounded-full">
                                <img src={flower} alt="" className="object-cover "/>
                            </picture>
                            <div className="absolute bottom-1 right-0 w-[13px] h-[13px] bg-green-500 rounded-full"></div>
                        </section>
                        <section className="py-2 mx-auto">
                            <h2 className="break-words leading-3 font-semibold">{name}</h2>
                            <h3 className="text-xs text-neutral-500"># {nickname}</h3>
                        </section>
                    </div>},
                    {text:"Mi Perfil", iconLeft:"bx bx-user-circle", dir:`/profile/${id}`},
                    {text:"Mis Compras", iconLeft:"bx bx-shopping-bag"},
                    {text:"Ayuda", iconLeft:"bx bx-help-circle"},
                    {text:"Cerrar Sesion", iconLeft:"bx bx-log-out", onClick: () => { Cookies.remove(VITE_C_USER) }, dir:"/access"},
                    ]}/>

        </div>
        <Cart visible={cartVisible} onClose={() => setCartVisible(!cartVisible)}/>
    </nav>
  )
}

export default Nav