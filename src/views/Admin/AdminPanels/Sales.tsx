import { useEffect, useState } from "react";
// import useApi from "../../../hooks/useApi"
import { useDecode } from "../../../hooks/useDecode";
import { SalesData } from "../../../interfaces/interfaces";
import LabelText from "../../../components/LabelText/LabelText";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const {VITE_URL_BASE} = import.meta.env



function Sales() {
    const { token } = useDecode()
    
    const [data, setData] = useState<SalesData[] | null>(null)
    const [sale, setSale] = useState<string | null>(null)
    const { profilePurchase } = useSelector((state:RootState) => state.preferenceProfile)

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
                        <button onClick={() => {console.log(profilePurchase)}}>Profile</button>
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

                            <div className="w-[70%] h-[60vh] relative z-10 bg-white">
                                <button className="absolute top-2 right-5 text-2xl" onClick={() => setSale(null)}><i className="bx bx-x text-black"></i></button>
                                {purchases.Products.map(product => (
                                    <p key={product.product_id}>{product.name}</p>
                                ))}
                                {/* <p>{purchases.city}</p> */}
                                <div className="w-full flex justify-center items-center">
                                    <LabelText text={`${purchases.country}`} label="Pais"/>
                                    <LabelText text={`${purchases.city}`} label="Ciudad"/>

                                </div>
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