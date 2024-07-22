import { useEffect, useState } from "react";
// import useApi from "../../../hooks/useApi"
import { useDecode } from "../../../hooks/useDecode";
import { SalesData } from "../../../interfaces/interfaces";
// import LabelText from "../../../components/LabelText/LabelText";
import { SalesPulse } from "../../../components/ComponentsAnimatePulse/ComponentsAnimatePulse";
import ModalSales from "../../../components/ModalSales/ModalSales";
import { fetchPATCH } from "../../../utils/fetchPATCH";
import SelectOptions from "../../../components/SelectOptions/SelectOptions";
import Input from "../../../components/Input/Input";
// import { fetchPOST } from "../../../utils/fetchPOST";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../redux/store";

const {VITE_URL_BASE} = import.meta.env



function Sales() {
    const { token } = useDecode()
    
    const [data, setData] = useState<SalesData[] | null>(null)
    const [sale, setSale] = useState<string | null>(null)
    const [filters, setFilters] = useState(false)
    const [state, setState] = useState("Pendiente")
    const [findByPaymentId, setFindByPaymentId] = useState<string | null>(null)
    // const { profilePurchase } = useSelector((state:RootState) => state.preferenceProfile)

    async function handlerData () {
        const response = await fetch(`${VITE_URL_BASE}/purchase/all${state ? `?state=${state}` : null}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` || ""
            },
        });
        const data = await response.json();
        setData(data)
        // setData(data)
    }

    async function hanlderFindPurchase () {
        const response = await fetch(`${VITE_URL_BASE}/purchase/find?payment_id=${findByPaymentId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` || ""
            },
        });
        const data = await response.json();
        console.log(data);
        
        setData(data?.data)
    }

    async function handlerApprovedPurchase(id:string) {
        await fetchPATCH(`${VITE_URL_BASE}/states/approved/${id}`)
    }

    useEffect(() => {

        token && handlerData()
        if(findByPaymentId) {
            hanlderFindPurchase()
        }

    },[token, state, findByPaymentId])


    // async function handlerEmail () {
    //     await fetchPOST(`${VITE_URL_BASE}/resend/send`)
    //     // console.log(response);
    // }


  return (
    <section className="w-area bg-redd-500"> 
        <section className="w-full">
        <h3 className="w-full text-start text-2xl font-semibold text-neutral-800 tracking-widest">VENTAS</h3>

        <ul className="flex justify-start items-center gap-x-7 text-neutral-800 text-sm font-semibold tracking-widest bg-redd-500 pt-4">
            <li className="cursor-pointer" onClick={() => setFilters(!filters)}> <i className={`scale-125  bx ${filters ? "bx-x" : "bx-filter"}`}/> FILTROS</li>
            <li className="cursor-pointer"><i className="bx bx-stats"/> ESTADISTICAS</li>
            {/* <li className="cursor-pointer"><i className="bx bx-send" onClick={handlerEmail}/> ENVIAR EMAIL</li> */}
        </ul>

        <aside className={`w-full ${filters ? "max-h-[500px] py-2 md:py-7" : "max-h-0 opacity-0 py-0 overflow-hidden"}  transition-[max-height_opacity_padding-top_padding-bottom] duration-700 flex justify-between items-start gap-y-5 md:gap-x-5 flex-col md:flex-row bg-redd-500`}>
        
            <Input styleIcon="cursor-pointer scale-125" styleDimensions="w-full h-[35px] mr-auto" onChange={(e) => setFindByPaymentId(e.target.value)} iconRight={true}  icon="bx bx-search" placeholder="Buscra compra"/>
            <div className="w-full flex justify-center items-center gap-x-5 bg-d-500">
                <SelectOptions label="Estado" onChange={(e) => setState(e.target.value)} options={["Pendiente", "En Camino", "Entregado"]}/>
                <SelectOptions label="Problemas" options={["Con Productos", "Explicaciones"]}/>
            </div>

        </aside>

        <section className="w-full flex justify-center items-center flex-col pt-2 md:pt-3 pb-10 divide-y divide-neutral-300 bg-redd-500">
            <ul className="w-full py-1 text-sm text-neutral-600 flex justify-between items-center">
                <li className="w-[25%] bg-redd-500 line-clamp-1 text-center">Payment ID</li> 
                <li className="w-[25%] bg-redd-500 line-clamp-1 text-center">Estado</li> 
                <li className="w-[25%] bg-redd-500 line-clamp-1 text-center">Productos</li> 
                <li className="w-[25%] bg-redd-500 line-clamp-1 text-center">Opciones</li> 
            </ul>

            {data && data?.map(purchases => {
                // const date = purchases.createdAt.toString().slice(0, 10).split("-").reverse().join("-");
                const { payment_id, PurchaseState, Products } = purchases;
                
                return (
                <div key={purchases.purchase_id} className="w-full py-2 text-sm font-semibold text-neutral-800 flex justify-between items-center bg-redd-500 ">
                    <h4 className="w-[25%] text-center">{payment_id}</h4>
                    <h4 className={`w-[25%] text-center 
                        ${PurchaseState.state === "Pendiente" ? "text-yellow-500" 
                            : (PurchaseState.state === "En Camino" ? "text-blue-500" : 
                                (PurchaseState.state === "Entregado" ? "text-green-500" : "text-red-500"))}`}>{PurchaseState.state}</h4>
                    <h4 className="w-[25%] text-center">{Products.length ? Products.length : (<i className="scale-125 text-rose-500  bx bx-error-alt"/>)}</h4>
                    <div className="w-[25%] text-center flex justify-center items-center gap-x-3 bg-redd-500">
                        <i className={`scale-125 cursor-pointer flex justify-center items-center rounded-full p-0.5  bx 
                            ${PurchaseState.state === "Pendiente" ? "bx-package bg-blue-500" 
                                : (PurchaseState.state === "En Camino" ? "bx-check bg-green-500" : 
                                    (PurchaseState.state === "Entregado" ? "bx-user-check text-black" : "text-red-500"))}`} onClick={() => handlerApprovedPurchase(purchases.purchase_id)}/>
                        <i className="scale-150 cursor-pointer flex justify-center items-center text-neutral-600  bx bx-info-circle" onClick={() => setSale(purchases.purchase_id)}/>
                    </div>

                    {sale === purchases.purchase_id && <ModalSales active={sale === purchases.purchase_id} purchases={purchases} onClose={() => setSale(null)}/>}
                </div>
            )})}

            <SalesPulse active={!data}/>
            {data?.length === 0 && (
                <div className="w-area h-[90vh] md:h-[70vh] relative py-10 flex justify-center items-center flex-col bg-redd-500">
                    <h3 className=" font-bold text-2xl tracking-widest text-neutral-800">NO HAY VENTAS</h3>
                    <p className="text-sm text-neutral-600 font-semibold">No se realizo ninguna Venta</p>
                    <div className="w-[30%] h-[1px] absolute bottom-3 flex justify-center items-center bg-neutral-500">
                        <h3 className="text-xl px-1 font-semibold font-noto bg-white">Versa</h3>
                    </div>
                </div>
            )}

        </section>
        
        </section>
    </section>
  )
}

export default Sales


// <div key={purchases.purchase_id} className="w-full flex justify-between items-center flex-col bg-redd-500 border border-neutral-400">
//                     <div className="hidden sm:flex sm:w-full justify-between items-center pb-2 pt-5 px-3 gap-x-3 cursor-pointer" onClick={() => setSale(purchases.purchase_id)}>
//                         <LabelText text={purchases.payment_id} label="Payment ID"/>
//                         <LabelText text={purchases.PurchaseState.state} label="Estado"/>
//                         <LabelText text={date} label="Fecha de Compra"/>
//                         <LabelText text={purchases.Products.length.toString()} label="Productos"/>
//                         <LabelText text={purchases.priceTotal.toString()} label="Precio"/>
//                         {/* <LabelText text={purchases.city} label="Precio"/> */}
//                         {/* <button onClick={() => {console.log(profilePurchase)}}>Profile</button> */}
//                     </div>

//                     <div className="flex sm:hidden w-full justify-between items-center bg-blued-500 pb-2 pt-5 px-3 gap-x-3 cursor-pointer" onClick={() => setSale(purchases.purchase_id)}>
//                         <div className="bg-greend-500 flex flex-col gap-3">
//                             <LabelText text={purchases.payment_id} label="Payment ID"/>
//                             <LabelText text={date} label="Fecha de Compra"/>
//                         </div>
//                         <div className="bg-greend-300 flex flex-col gap-3">
//                             <LabelText text={purchases.Products.length.toString()} label="Productos"/>
//                             <LabelText text={`$${purchases.priceTotal}`} label="Precio"/>
//                         </div>
//                         <div className="bg-greend-800 relative flex justify-center items-center flex-col">
//                             <LabelText text={purchases.PurchaseState.state} label="Estado"/>
//                         </div>
//                     </div>

//                     <ModalSales active={sale === purchases.purchase_id} purchases={purchases} onClose={() => setSale(null)}/>

//                 </div>



// {sale === purchases.purchase_id && 
//     <aside className="w-full h-screen fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-50">

//         <div className="w-[70%] h-[70vh] py-3 px-3 flex justify-start items-start flex-col gap-y-1 scroll relative z-10 bg-white">
//             <button className="absolute top-2 right-5 text-2xl bg-white flex justify-center items-center border border-neutral-200 rounded-full" onClick={() => setSale(null)}><i className="bx bx-x text-black"></i></button>
//             <section className="w-full h-auto max-md:overflow-y-auto flex justify-start items-start gap-5 md:gap-0 md:justify-around md:items-start flex-col md:flex-row bg-redd-500">
//                 <section className="flex-1 flex flex-col gap-3">
//                     <h3 className="text-xl font-semibold text-neutral-700">DATOS PERSONALES</h3>
//                     <LabelText text={purchases.name} label="Nombre"/>
//                     <LabelText text={purchases.lastname} label="Apellido"/>
//                     <LabelText text={purchases.phone} label="Telefono"/>
//                     <LabelText text={purchases.email} label="Email"/>
//                     <LabelText text={purchases.id} label="DNI"/>
//                 </section>
//                 <section className="flex-1 flex flex-col gap-3">
//                     <h3 className="text-xl font-semibold text-neutral-700">DATOS DE ENVIO</h3>
//                     <LabelText text={purchases.methodOfDelivery} label="Metodo de Entrega"/>
//                     <LabelText text={purchases.neighborhood} label="Barrio"/>
//                     <LabelText text={`${purchases.street}${purchases.number && `, ${purchases.number}`}`} label="Calle"/>
//                     <LabelText text={purchases.postalCode} label="Codigo Postal"/>
//                     <LabelText text={purchases.houseApartament} label="Casa/Apartamento"/>
//                     </section>
//                 <section className="flex-1 flex flex-col gap-3">
//                     <h3 className="text-xl font-semibold text-neutral-700">DATOS DE COMPRA</h3>
//                     <LabelText text={purchases.userPurchase} label="Usuario ID"/>
//                     <LabelText text={date} label="Fecha"/>
//                     <LabelText text={purchases.country} label="Pais"/>
//                     <LabelText text={purchases.city} label="Ciudad"/>
//                 </section>
//             </section>
//             <section className="w-full h-auto overflow-y-auto scroll flex justify-start items-center flex-col gap-y-1">
//                 <h3 className="w-full text-start text-xl font-semibold text-neutral-700">PRODUCTOS</h3>
//                 {purchases?.Products.map(product => (
//                     <div key={product.product_id} className="w-full bg-redd-500 flex justify-start items-center gap-2 border border-neutral-500">
//                         <picture className="max-w-[40px] max-h-[40px] md:w-[50px] md:h-[50px] overflow-hidden flex justify-center items-center">
//                             <img src={product.image} alt="" className="w-full h-full object-cover"/>
//                         </picture>
//                         <div className="w-[75%] md:w-full flex justify-center items-center flex-col bg-blued-500 md:flex-row">
//                             <p className="w-full text-sm text-neutral-700 font-bold mr-auto text-clipping-1">{product.name}</p>
//                             <div className="w-full flex justify-between md:justify-center items-center bg-redd-500 gap-x-1 md:px-5">
//                                 <p className=" md:w-[80px] flex justify-center items-center bg-redd-500 text-sm text-neutral-600 font-semibold">x{product.PurchaseProduct.cantidad}</p>
//                                 <p className=" md:w-[80px] flex justify-center items-center bg-redd-500 text-sm text-neutral-600 font-semibold">{product.PurchaseProduct.color}</p>
//                                 <p className=" md:w-[80px] flex justify-center items-center bg-redd-500 text-sm text-neutral-600 font-semibold">{product.PurchaseProduct.size}</p>
//                                 <p className=" md:w-[80px] flex justify-center items-center bg-redd-500 text-sm text-neutral-600 font-semibold text-nowrap">$ {product.price}</p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </section>
//         </div>

//     </aside>
// }




// <LabelText text={purchases.name} label="Nombre"/>
// <LabelText text={purchases.lastname} label="Apellido"/>
// <LabelText text={purchases.phone} label="Telefono"/>
// <LabelText text={purchases.email} label="Email"/>
// <LabelText text={purchases.id} label="DNI"/>
                                        
// <LabelText text={purchases.methodOfDelivery} label="Metodo de Entrega"/>
// <LabelText text={purchases.neighborhood} label="Barrio"/>
// <LabelText text={purchases.street} label="Calle"/>
// <LabelText text={purchases.number} label="Numero"/>
// <LabelText text={purchases.houseApartament} label="Numero"/>
// <LabelText text={purchases.postalCode} label="Codigo Postal"/>

// <LabelText text={purchases.country} label="Pais"/>
// <LabelText text={purchases.city} label="Ciudad"/>
// <LabelText text={purchases.userPurchase} label="Usuario ID"/>
// <LabelText text={date} label="Fecha"/>