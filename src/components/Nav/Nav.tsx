import { useState } from "react"
import Button from "../Button/Button"
import Cart from "../Cart/Cart"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { Link } from "react-router-dom"
import { useDecode } from "../../hooks/useDecode"
import flower from "../../assets/asHome/FlowerWhite.png"
const { VITE_R_SA, VITE_R_U } = import.meta.env

interface styleProp {
    style?:string
}

function Nav({style}:styleProp) {
    const [cartVisible, setCartVisible] = useState<boolean>(false)
    const [hover, setHover] = useState<string | null>()

    const { cart } = useSelector((state:RootState) => state.cart)

    const { role } = useDecode("User")

  return (
    <nav className={`w-[95%] mx-auto flex justify-between items-center py-4 fixed left-0 right-0 z-[100] ${style}`}>
        <Link to={"/"}>
            <h2 className="font-bold text-2xl font-noto">Versa</h2>
        </Link>

        <section className="space-x-5">
            <Button style="text-xs font-semibold tracking-widest" text="TIENDA" dir="/shop"/>
            <Button style="text-xs font-semibold tracking-widest" text="NOSOTROS"/>
            <Button style="text-xs font-semibold tracking-widest" text="CATEGORIAS"/>
        </section>

        <div className="flex justify-center items-center space-x-5">

            <div className={`${hover === "searchNav" ? "border" : null} border-neutral-500  flex justify-center items-center px-3 rounded-lg`} onMouseDown={() => setHover("searchNav")} onMouseLeave={() => setHover(null)}>
                <input type="text" className={`${hover === "searchNav" ? "w-[120px]" : "w-0" } transition-[width] duration-500  outline-none text-xs bg-transparent`}/>
                <Button icon="bx bx-search" style="pl-2 py-1"/>
            </div>

            <div className="relative flex justify-center items-center">
                <Button icon="bx bx-cart" style="text-lg z-10" onClick={() => setCartVisible(!cartVisible)}/>
                <div className="absolute -top-2 -right-2 text-[10px] px-1 bg-neutral-500 text-white rounded-full">{cart.length}</div>
            </div>

            {role === null && <Button icon="bx bx-user" style="text-lg" dir="/access"/>}
            {role === VITE_R_U && <Button img={flower}/>}
            {role === VITE_R_SA && <Button img={flower}/>}
            
        </div>
        <Cart visible={cartVisible} onClose={() => setCartVisible(!cartVisible)}/>
    </nav>
  )
}

export default Nav