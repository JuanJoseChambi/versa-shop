import { useState } from "react";
import DashboardProductsEdit from "./AdminPanels/DashboardProductsEdit";
import Categories from "./AdminPanels/ProductData";
import CreateProduct from "./AdminPanels/CreateProduct";
import ArrowBefore from "../../components/ArrowBefore/ArrowBefore";
import Sales from "./AdminPanels/Sales";
import CreateDiscountCode from "./AdminPanels/CreateDiscountCode";
import CreateJsonProducts from "./AdminPanels/CreateJsonProducts";

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
                {[
                    {name:"Stock", ref:"stocks"}, 
                    {name:"Ventas", ref:"sales"},
                    {name:"Categorias", ref:"productData"}, 
                    {name:"Crear Productos", ref:"createProduct"}, 
                    {name:"Crear Productos JSON", ref:"createJsonProducts"},
                    {name:"Crear Codigo de Descuento", ref:"createDiscountCode"},
                    {name:"Crear Admins", ref:"createAdmin"},
                ].map((item, index) => (
                    <li key={`${index}_${item.ref}`} className={`cursor-pointer w-full py-1 px-3 ${adminPanel === item.ref && "text-black bg-white w-full"}`} onClick={() => {setOpenOptions(false), setAdminPanel(item.ref)}}>{item.name}</li>
                ))}
            </ul>

        </aside>

        <section className="w-full min-h-auto flex justify-center items-center flex-col pt-5">
            
            {adminPanel === "stocks" && <DashboardProductsEdit/>}
            {adminPanel === "productData" && <Categories/>}
            {adminPanel === "createProduct" && <CreateProduct/>}
            {adminPanel === "sales" && <Sales/>}
            {adminPanel == "createDiscountCode" && <CreateDiscountCode/>}
            {adminPanel == "createJsonProducts" && <CreateJsonProducts/>}
        </section>

    </main>
  )
}

export default Admin