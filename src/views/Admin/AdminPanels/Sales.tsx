import { useEffect, useState } from "react";
// import useApi from "../../../hooks/useApi"
import { useDecode } from "../../../hooks/useDecode";
import { SalesData } from "../../../interfaces/interfaces";
import LabelText from "../../../components/LabelText/LabelText";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../redux/store";

const {VITE_URL_BASE} = import.meta.env



function Sales() {
    const { token } = useDecode()
    
    const [data, setData] = useState<SalesData[] | null>(null)
    const [sale, setSale] = useState<string | null>(null)
    // const { profilePurchase } = useSelector((state:RootState) => state.preferenceProfile)

    async function handlerData () {
        const response = await fetch(`${VITE_URL_BASE}/purchase/all`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` || ""
            },
        });
        const data = await response.json();
        setData(data)
    }

    useEffect(() => {

        token && handlerData()

    },[token])

  return (
    <section className="w-area bg-redd-500"> 
        <section className="w-full">
        <h3 className="w-full text-start text-2xl font-semibold text-neutral-800 tracking-widest">VENTAS</h3>
        <section className="w-full flex justify-center items-center flex-col gap-2 pt-5 pb-10">

            {data && data?.map(purchases => {
                const date = purchases.createdAt.toString().slice(0, 10).split("-").reverse().join("-");
                
                return (
                <div key={purchases.purchase_id} className="w-full flex justify-between items-center flex-col bg-redd-500 border border-neutral-400">
                    <div className="hidden sm:flex sm:w-full justify-between items-center pb-2 pt-5 px-3 gap-x-3 cursor-pointer" onClick={() => setSale(purchases.purchase_id)}>
                        <LabelText text={purchases.payment_id} label="Payment ID"/>
                        <LabelText text={purchases.PurchaseState.state} label="Estado"/>
                        <LabelText text={date} label="Fecha de Compra"/>
                        <LabelText text={purchases.Products.length.toString()} label="Productos"/>
                        <LabelText text={purchases.priceTotal.toString()} label="Precio"/>
                        {/* <LabelText text={purchases.city} label="Precio"/> */}
                        {/* <button onClick={() => {console.log(profilePurchase)}}>Profile</button> */}
                    </div>

                    <div className="flex sm:hidden w-full justify-between items-center bg-blued-500 pb-2 pt-5 px-3 gap-x-3 cursor-pointer" onClick={() => setSale(purchases.purchase_id)}>
                        <div className="bg-greend-500 flex flex-col gap-3">
                            <LabelText text={purchases.payment_id} label="Payment ID"/>
                            <LabelText text={date} label="Fecha de Compra"/>
                        </div>
                        <div className="bg-greend-300 flex flex-col gap-3">
                            <LabelText text={purchases.Products.length.toString()} label="Productos"/>
                            <LabelText text={`$${purchases.priceTotal}`} label="Precio"/>
                        </div>
                        <div className="bg-greend-800 relative flex justify-center items-center flex-col">
                            <div className="w-[20px] h-[20px] -z-10 absolute -top-8 -right-1 border border-neutral-600  rounded-full bg-red-400"></div>
                            <LabelText text={purchases.PurchaseState.state} label="Estado"/>
                        </div>
                    </div>

                    {sale === purchases.purchase_id && 
                        <aside className="w-full h-screen fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-50">

                            <div className="w-[70%] h-[70vh] py-3 px-3 flex justify-start items-start flex-col gap-y-1 scroll relative z-10 bg-white">
                                <button className="absolute top-2 right-5 text-2xl bg-white flex justify-center items-center border border-neutral-200 rounded-full" onClick={() => setSale(null)}><i className="bx bx-x text-black"></i></button>
                                <section className="w-full h-auto max-md:overflow-y-auto flex justify-start items-start gap-5 md:gap-0 md:justify-around md:items-start flex-col md:flex-row bg-redd-500">
                                    <section className="flex-1 flex flex-col gap-3">
                                        <h3 className="text-xl font-semibold text-neutral-700">DATOS PERSONALES</h3>
                                        <LabelText text={purchases.name} label="Nombre"/>
                                        <LabelText text={purchases.lastname} label="Apellido"/>
                                        <LabelText text={purchases.phone} label="Telefono"/>
                                        <LabelText text={purchases.email} label="Email"/>
                                        <LabelText text={purchases.id} label="DNI"/>
                                    </section>
                                    <section className="flex-1 flex flex-col gap-3">
                                        <h3 className="text-xl font-semibold text-neutral-700">DATOS DE ENVIO</h3>
                                        <LabelText text={purchases.methodOfDelivery} label="Metodo de Entrega"/>
                                        <LabelText text={purchases.neighborhood} label="Barrio"/>
                                        <LabelText text={`${purchases.street}${purchases.number && `, ${purchases.number}`}`} label="Calle"/>
                                        <LabelText text={purchases.postalCode} label="Codigo Postal"/>
                                        <LabelText text={purchases.houseApartament} label="Casa/Apartamento"/>
                                        </section>
                                    <section className="flex-1 flex flex-col gap-3">
                                        <h3 className="text-xl font-semibold text-neutral-700">DATOS DE COMPRA</h3>
                                        <LabelText text={purchases.userPurchase} label="Usuario ID"/>
                                        <LabelText text={date} label="Fecha"/>
                                        <LabelText text={purchases.country} label="Pais"/>
                                        <LabelText text={purchases.city} label="Ciudad"/>
                                    </section>
                                </section>
                                <section className="w-full h-auto overflow-y-auto scroll flex justify-start items-center flex-col gap-y-1">
                                    <h3 className="w-full text-start text-xl font-semibold text-neutral-700">PRODUCTOS</h3>
                                    {purchases.Products.map(product => (
                                        <div key={product.product_id} className="w-full bg-redd-500 flex justify-start items-center gap-2 border border-neutral-500">
                                            <picture className="max-w-[40px] max-h-[40px] md:w-[50px] md:h-[50px] overflow-hidden flex justify-center items-center">
                                                <img src={product.image} alt="" className="w-full h-full object-cover"/>
                                            </picture>
                                            <div className="w-[75%] md:w-full flex justify-center items-center flex-col bg-blued-500 md:flex-row">
                                                <p className="w-full text-sm text-neutral-700 font-bold mr-auto text-clipping-1">{product.name}</p>
                                                <div className="w-full flex justify-between md:justify-center items-center bg-redd-500 gap-x-1 md:px-5">
                                                    <p className=" md:w-[80px] flex justify-center items-center bg-redd-500 text-sm text-neutral-600 font-semibold">x{product.PurchaseProduct.cantidad}</p>
                                                    <p className=" md:w-[80px] flex justify-center items-center bg-redd-500 text-sm text-neutral-600 font-semibold">{product.PurchaseProduct.color}</p>
                                                    <p className=" md:w-[80px] flex justify-center items-center bg-redd-500 text-sm text-neutral-600 font-semibold">{product.PurchaseProduct.size}</p>
                                                    <p className=" md:w-[80px] flex justify-center items-center bg-redd-500 text-sm text-neutral-600 font-semibold text-nowrap">$ {product.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </section>
                            </div>

                        </aside>
                    }
                </div>
            )})}

        </section>
        
        </section>
    </section>
  )
}

export default Sales


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