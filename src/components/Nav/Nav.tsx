import { useState } from "react"
import Button from "../Button/Button"

function Nav() {

    const [hover, setHover] = useState<string | null>()

  return (
    <nav className="w-[95%] mx-auto flex justify-between items-center py-4 fixed left-0 right-0 z-[100]">
        <h2 className="font-bold text-2xl font-noto">Versa</h2>

        <section className="space-x-5">
            <Button 
                style="text-xs font-semibold tracking-widest" 
                text="PRODUCTOS"/>
            <Button 
                    style="text-xs font-semibold tracking-widest" 
                    text="NOSOTROS"/>
            <Button 
                    style="text-xs font-semibold tracking-widest" 
                    text="CATEGORIAS"/>
        </section>

        <div className="flex justify-center items-center space-x-5">

            <div className={`${hover === "searchNav" ? "border" : null} border-neutral-500  flex justify-center items-center px-3 rounded-lg`} onMouseDown={() => setHover("searchNav")} onMouseLeave={() => setHover(null)}>
                <input type="text" className={`${hover === "searchNav" ? "w-[120px]" : "w-0" } transition-[width] duration-500  outline-none text-xs bg-transparent`}/>
                <Button icon="bx bx-search" style="pl-2 py-1"/>
            </div>

            <Button icon="bx bx-cart" style="text-lg"/>
            <Button icon="bx bx-user" style="text-lg"/>                
            
        </div>
    </nav>
  )
}

export default Nav