import Button from "../Button/Button"

function Nav() {
  return (
    <nav className="area flex justify-between items-center py-4 fixed left-0 right-0 z-[100]">
        <h2 className="font-bold text-xl">VersaShop</h2>
        <div className="flex justify-center items-center space-x-10">

            <div className="border border-neutral-500 flex justify-center items-center px-3 rounded-lg">
                <input type="text" className="outline-none text-xs bg-transparent"/>
                <Button icon="bx bx-search" style="pl-2 py-1"/>
            </div>

            <ul className="flex justify-center items-center space-x-4">
                <Button 
                    style="text-xs font-semibold tracking-widest" 
                    text="PRODUCTOS"/>
                <Button 
                    style="text-xs font-semibold tracking-widest" 
                    text="NOSOTROS"/>

                <Button icon="bx bx-user" style="text-lg"/>
                <Button icon="bx bx-cart" style="text-lg"/>
            </ul>
            
        </div>
    </nav>
  )
}

export default Nav