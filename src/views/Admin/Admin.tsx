import { useState } from "react";
import DashboardProductsEdit from "./AdminPanels/DashboardProductsEdit";
import Categories from "./AdminPanels/ProductData";
import CreateProduct from "./AdminPanels/CreateProduct";
import ArrowBefore from "../../components/ArrowBefore/ArrowBefore";
import Sales from "./AdminPanels/Sales";

function Admin() {

    const [adminPanel, setAdminPanel] = useState("stocks")
    const [openOptions, setOpenOptions] = useState<boolean>(false)

  return (
    <main className="min-h-screen bg-redd-500 flex justify-start items-start">
        <button className={` fixed top-5 right-2 p-1 rounded-full text-xl flex justify-center items-center bg-white md:hidden`} onClick={() => setOpenOptions(true)}><i className="bx bx-menu"></i></button>

        <aside className={` ${openOptions ? "w-full h-screen fixed top-0 left-0 z-10": "max-md:hidden" } md:w-[300px] h-screen md:sticky top-0 bg-neutral-800 text-white`}>
            <ArrowBefore redirect="/shop" styleIcon="text-lg" style="text-white absolute left-2 top-4"/>
            <h3 className="text-center text-sm font-semibold tracking-widest py-5 ">ADMINISTRADOR</h3>
            <button className={`absolute top-6 right-5 text-3xl md:hidden`}><i className="bx bx-x block lg:hidden" onClick={() => setOpenOptions(false)}></i></button>

            <ul className="text-sm font-extralight tracking-widest flex justify-center items-start flex-col gap-y-3">
                <li className={`cursor-pointer px-3 ${adminPanel === "stocks" && "text-black bg-white rounded-sm"}`} onClick={() => {setOpenOptions(false), setAdminPanel("stocks")}}>Stocks</li>
                <li className={`cursor-pointer px-3 ${adminPanel === "productData" && "text-black bg-white rounded-sm"}`} onClick={() => {setOpenOptions(false), setAdminPanel("productData")}}>Categorias</li>
                <li className={`cursor-pointer px-3 ${adminPanel === "createProduct" && "text-black bg-white rounded-sm"}`} onClick={() => {setOpenOptions(false), setAdminPanel("createProduct")}}>Crear Productos</li>
                <li className={`cursor-pointer px-3 ${adminPanel === "sales" && "text-black bg-white rounded-sm"}`} onClick={() => {setOpenOptions(false), setAdminPanel("sales")}}>Ventas</li>
                <li className={`cursor-pointer px-3`} onClick={() => setAdminPanel("createAdmin")}>Crear Admins</li>
                <li className={`cursor-pointer px-3`} onClick={() => setAdminPanel("createOffer")}>Crear Ofertas</li>
                <li className={`cursor-pointer px-3`} onClick={() => setAdminPanel("createDiscount")}>Crear Descuentos</li>
                <li className={`cursor-pointer px-3`} onClick={() => setAdminPanel("labels")}>Etiquetas</li>
            </ul>

        </aside>

        <section className="w-full min-h-auto flex justify-center items-center flex-col pt-5">
            
            {adminPanel === "stocks" && <DashboardProductsEdit/>}
            {adminPanel === "productData" && <Categories/>}
            {adminPanel === "createProduct" && <CreateProduct/>}
            {adminPanel === "sales" && <Sales/>}
        </section>

    </main>
  )
}

export default Admin