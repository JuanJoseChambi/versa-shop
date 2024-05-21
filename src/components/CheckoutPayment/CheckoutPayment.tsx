import { useEffect, useState } from "react"
import credit from "../../assets/paymentMethod/Credito.png"
import debit from "../../assets/paymentMethod/Debito.png"
import mp from "../../assets/paymentMethod/mercadopago.png"
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react"
import { deliverySvg, letterSVG, messageSVG, ubicationSvg } from "../../assets/IconSvgs/IconSvgs"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
// import { MethodsOfDelivery } from "../../interfaces/components"
// import methodDelivery from "../../utils/methodDelivery.json"
// import { ValueMethods } from "../../interfaces/components"
const {VITE_MP_P_KEY} = import.meta.env

// type MethodOfDeliveryKey = keyof typeof methodDelivery;

function CheckoutPayment() {
    const { profilePurchase } = useSelector((state:RootState) => state.preferenceProfile)
    const CREDIT = "CREDITO"
    const DEBIT = "DEBITO"
    const MP = "MP"

    const [selectMethod, setSelectMethod] = useState<string>(CREDIT)

    useEffect(() => {
        initMercadoPago(VITE_MP_P_KEY, { locale: 'es-AR' })
    },[])


    const [preferenceId, setPreferenceId] = useState<string>("")
    const [oneClick, setOneClick] = useState<boolean>(false)

    async function payment () {
        const body = {
            title:"Buso Nike",
            quantity:5,
            price:10
        };

        const response = await fetch("http://localhost:3001/create_preference", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
    
        const preference = await response.json();
        
        setPreferenceId(preference.id)
        
    }
    const nameMethod = profilePurchase.methodOfDelivery.split("_")[0]
    const delivery = profilePurchase.methodOfDelivery.split("_")[1]
    console.log(nameMethod);
    console.log(delivery);
    
    }
    // const {subtitle} = methodDelivery[nameMethod][delivery] as ValueMethods
    
  return (
    <section className={`w-fulltransition-[height_min-height_max-height] duration-700 relative flex justify-start items-center flex-col gap-y-2 px-5 pt-0 pb-7 bg-transparent`} >
            <section className="w-full flex justify-between items-center gap-x-3 bg-redd-500">
                <h2 className="py-3 text-3xl tracking-widest">Detalles de Compra</h2>
                <i className='bx bx-info-circle scale-150'></i>
            </section>
            
            <section className="w-full h-auto border divide-y divide-neutral-400 border-neutral-400 bg-redd-500">
                <div className="w-full py-3 flex justify-center items-center">
                    <div className="px-5">
                        {letterSVG}
                    </div>
                    <div className="flex-1">
                        {profilePurchase.email}
                    </div>
                    <div className="px-5 cursor-pointer">
                        <i className="bx bx-edit"></i>
                    </div>
                </div>
                <div className="w-full py-3 flex justify-center items-center">
                    <div className="px-5">
                        {ubicationSvg}
                    </div>
                    <div className="flex-1">
                        {profilePurchase.street}
                    </div>
                    <div className="px-5 cursor-pointer">
                        <i className="bx bx-edit"></i>
                    </div>
                </div>
                <div className="w-full py-3 flex justify-center items-center">
                    <div className="px-5">
                        {deliverySvg["xl"]}
                    </div>
                    <div className="flex-1">
                        {profilePurchase.methodOfDelivery}
                        {subtitle}
                    </div>
                    <div className="px-5 cursor-pointer">
                        <i className="bx bx-edit"></i>
                    </div>
                </div>
                <div className="w-full py-3 flex justify-center items-center">
                    <div className="px-5">
                        {messageSVG}
                    </div>
                    <div className="flex-1">
                        Notas de pedido
                    </div>
                    <div className="px-5 cursor-pointer">
                        <i className="bx bx-plus"></i>
                    </div>
                </div>
            </section>
            
            <section className="w-full flex justify-between items-center gap-x-3 bg-redd-500">
                <h2 className="py-3 text-3xl tracking-widest">Metodo de Pago</h2>
                <i className="bx bx-credit-card scale-150"></i>
            </section>

            <section className="w-full flex justify-center items-start bg-redd-500 divide-x divide-neutral-400">

                <div className={`min-h-[80px] transition-colors duration-700 flex justify-center items-center flex-col flex-1 ${selectMethod === CREDIT && "bg-white "} bg-blued-500`} 
                onClick={() => setSelectMethod(CREDIT)}>
                    <picture className="flex w-[50px]">
                        <img src={credit} alt="" className="object-cover"/>
                    </picture>
                    <h3 className="text-xs tracking-widest font-semibold text-neutral-800">CRÉDITO</h3>
                </div>
                <div className={`min-h-[80px] transition-colors duration-700 flex justify-center items-center flex-col flex-1 ${selectMethod === DEBIT && "bg-white "} bg-blued-500`} 
                onClick={() => setSelectMethod(DEBIT)}>
                    <picture className="flex w-[50px]">
                        <img src={debit} alt="" className="object-cover"/>
                    </picture>
                    <h3 className="text-xs tracking-widest font-semibold text-neutral-800">DÉBITO</h3>
                </div>
                <div className={`min-h-[80px] transition-colors duration-700 flex justify-center items-center flex-col flex-1 ${selectMethod === MP && "bg-white "} bg-blued-500`} 
                onClick={() => {setSelectMethod(MP), payment(), setOneClick(true)}}>
                    <picture className="flex w-[50px] overflow-hidden">
                        <img src={mp} alt="" className=""/>
                    </picture>
                    <h3 className="text-xs tracking-widest font-semibold text-neutral-800">DÉBITO / CRÉDITO</h3>
                </div>


            </section>
                {preferenceId && oneClick && 
                    <Wallet 
                        initialization={{preferenceId: preferenceId, redirectMode:"modal"}}
                        customization={
                            {
                                texts:{ valueProp: 'smart_option'}, 
                                visual:{ buttonBackground: 'black'}
                            }
                        }
                    />}
        </section>
  )
}

export default CheckoutPayment