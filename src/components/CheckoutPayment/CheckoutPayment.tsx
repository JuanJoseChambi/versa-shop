import { useEffect, useState } from "react"
// import credit from "../../assets/paymentMethod/Credito.png"
// import debit from "../../assets/paymentMethod/Debito.png"
// import mp from "../../assets/paymentMethod/mercadopago.png"
import { card, card2, money, mp } from "../../assets/paymentMethod/Methods"
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react"
import { deliverySvg, letterSVG, ubicationSvg } from "../../assets/IconSvgs/IconSvgs"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { HomeDelivery, ValueMethods, Withdrawal } from "../../interfaces/components"
import methodDelivery from "../../utils/methodDelivery"
import postalCodes from "../../utils/postalCodes.json"
import ArrowBefore from "../ArrowBefore/ArrowBefore"
import PaymentDebitCredit from "../PaymentDebitCredit/PaymentDebitCredit"
import PaymentAtm from "../PaymentAtm/PaymentAtm"
const {VITE_MP_P_KEY, VITE_URL_BASE} = import.meta.env

interface MethodsPaymentProp {
    onClick?: () => void;
    image?:string | React.ReactNode;
    method?:string;
    typeImage?:string
}

function MethodsPayment ({onClick, image, method, typeImage}:MethodsPaymentProp) {
    return (
        <div className={`w-full min-h-[80px] relative hover:bg-neutral-200 cursor-pointer transition-colors duration-700 flex justify-center items-center flex-col flex-1 bg-blued-500`} 
                onClick={onClick}>
                <picture className="flex gap-x-2">
                    {typeImage === "img" && typeof image === "string" ? <img src={image}/> : image}
                </picture>
                <h3 className="text-xs tracking-widest font-semibold text-neutral-800">{method}</h3>
                <i className="absolute right-8 scale-150 text-[#393939]  bx bx-chevron-right"/>
        </div>
    )
}


function CheckoutPayment() {
    const { profilePurchase } = useSelector((state:RootState) => state.preferenceProfile)
    const products = useSelector((state:RootState) => state.cart.cart)
    const CASH = "EFECTIVO"
    const DEBIT_CREDIT = "DEBITO Y CREDITO"
    const MP = "MP"

    const [selectMethod, setSelectMethod] = useState<string | null>(null)
    const [preferenceId, setPreferenceId] = useState<string>("")

    useEffect(() => {

        initMercadoPago(VITE_MP_P_KEY, { locale: 'es-AR' })
    },[preferenceId])


    // const [oneClick, setOneClick] = useState<boolean>(false)

    // async function hanlderForm () {
    //     await loadMercadoPago();
    //     const mp = new window.MercadoPago("YOUR_PUBLIC_KEY");
    // }

    async function createPreference () {

        const response = await fetch(`${VITE_URL_BASE}/create_preference`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({products, code:profilePurchase.discountCode}),
        });
    
        const preference = await response.json();
        
        setPreferenceId(preference.id);
    }

    const [nameMethod, delivery] = profilePurchase?.methodOfDelivery.split("_") || "";

    const {title, subtitle, price} = methodDelivery[nameMethod as keyof typeof methodDelivery]?.[delivery as keyof (HomeDelivery | Withdrawal)] as ValueMethods;

    const code = postalCodes.find(country => country.name === profilePurchase.country)?.provinces?.find(province => province.name === profilePurchase.city)
    
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
                    <div className="flex-1 bg-redd-500">
                        <h3 className="text-sm tracking-wide text-neutral-700 font-bold">{profilePurchase.email}</h3>
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
                        <h3 className="font-bold tracking-wide text-sm text-neutral-700">{`${profilePurchase.street} ${profilePurchase.number} ${profilePurchase.houseApartament && `, ${profilePurchase.houseApartament}`}`}</h3>
                        <p className="font-semibold text-sm text-neutral-600">CP {code?.code}{profilePurchase.postalCode}</p>
                        <p className="font-semibold text-sm text-neutral-600">{profilePurchase.country}, {profilePurchase.city}</p>
                    </div>
                    <div className="px-5 cursor-pointer">
                        <i className="bx bx-edit"></i>
                    </div>
                </div>
                <div className="w-full py-3 flex justify-center items-center">
                    <div className="px-5">
                        {deliverySvg["xl"]}
                    </div>
                    <div className="flex-1 flex justify-start items-start flex-col">
                        <h3 className="font-bold tracking-wide text-sm text-neutral-700">{title}</h3>
                        <p className="font-semibold text-sm text-neutral-600">{subtitle} | {price}</p> 
                    </div>
                    <div className="px-5 cursor-pointer">
                        <i className="bx bx-edit"></i>
                    </div>
                </div>
                
            </section>
            
            <section className="w-full flex justify-between items-center gap-x-3 bg-redd-500">
                <h2 className="py-3 text-3xl tracking-widest">Metodo de Pago</h2>
                <i className="bx bx-credit-card scale-150"></i>
            </section>

            {!selectMethod && <section className="w-full flex justify-start items-start flex-col bg-redd-500">

                <MethodsPayment method="MERCADO PAGO" image={mp} onClick={() => {setSelectMethod(MP); createPreference()}}/>
                <MethodsPayment method="DÉBITO | CRÉDITO" image={<>{card}{card2}</>} onClick={() => {setSelectMethod(DEBIT_CREDIT); createPreference()}}/>
                <MethodsPayment method="EFECTIVO" image={money} onClick={() => {setSelectMethod(CASH); createPreference()}}/>

            </section>}

            {selectMethod && 
            <section className="w-full bg-redd-500 relative">
                <div className="w-full relative flex justify-between items-center bg-blued-500">
                    <ArrowBefore onClick={() => (setSelectMethod(null), setPreferenceId("") )} text="Metodos de Pago" stylePosition="" /> 
                    <h4>{selectMethod}</h4>
                </div>
                <section className="w-full relative flex justify-center items-center py-5">
                    {selectMethod === CASH && <PaymentAtm preferenceId={preferenceId}/>}
                    {selectMethod === DEBIT_CREDIT && <PaymentDebitCredit preferenceId={preferenceId}/>}
                    {selectMethod === MP && <Wallet 
                            initialization={{preferenceId: preferenceId, redirectMode:"modal"}}
                            customization={
                                {
                                    texts:{ valueProp: 'smart_option'}, 
                                    visual:{ buttonBackground: 'black'}
                                }
                            } />}
                    {!preferenceId && <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 z-10 py-10 bg-[#ffffff96]"> 
                        <div className="w-[40px] h-[40px] rounded-full animate-spin border-t border-l border-black"></div> 
                    </div>}
                </section>
            </section>}

        </section>
  )
}

export default CheckoutPayment