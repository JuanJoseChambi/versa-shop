import { useState } from "react";
import DashboardProductsEdit from "../../withoutUse/components/DashboardProductsEdit/DashboardProductsEdit";
import Categories from "./AdminPanels/Categories";

function Admin() {

    const [adminPanel, setAdminPanel] = useState("")

  return (
    <main className="h-screen bg-redd-500 flex justify-start items-start">

        <aside className="w-[300px] h-screen bg-neutral-800 text-white">

            <h3 className="text-center text-sm font-semibold tracking-widest py-5 ">ADMINISTRADOR</h3>

            <ul className="text-sm font-extralight tracking-widest flex justify-center items-start flex-col gap-y-3">
                <li className={`cursor-pointer px-3 ${adminPanel === "categories" && "text-black bg-white rounded-sm"}`} onClick={() => setAdminPanel("categories")}>Categorias</li>
                <li className={`cursor-pointer px-3 ${adminPanel === "stocks" && "text-black bg-white rounded-sm"}`} onClick={() => setAdminPanel("stocks")}>Stocks</li>
                <li className={`cursor-pointer px-3`} onClick={() => setAdminPanel("createProduct")}>Crear Productos</li>
                <li className={`cursor-pointer px-3`} onClick={() => setAdminPanel("createOffer")}>Crear Ofertas</li>
                <li className={`cursor-pointer px-3`} onClick={() => setAdminPanel("createDiscount")}>Crear Descuentos</li>
                <li className={`cursor-pointer px-3`} onClick={() => setAdminPanel("sales")}>Ventas</li>
                <li className={`cursor-pointer px-3`} onClick={() => setAdminPanel("labels")}>Etiquetas</li>
            </ul>

        </aside>

        <section className="w-full flex justify-center items-center flex-col">
            
            {adminPanel === "categories" && <Categories/>}
            {adminPanel === "stocks" && <DashboardProductsEdit/>}
        </section>

    </main>
  )
}

export default Admin