import { useState } from "react"
import Input from "../Input/Input"
import Button from "../Button/Button"
import credit from "../../assets/paymentMethod/Credito.png"
import debit from "../../assets/paymentMethod/Debito.png"
import mp from "../../assets/paymentMethod/mercadopago.png"
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react"
const {VITE_MP_P_KEY} = import.meta.env

function CheckoutProfile() {
    const CREDIT = "CREDITO"
    const DEBIT = "DEBITO"
    const MP = "MP"
    const [personalInformation, setPersonalInformation] = useState<boolean>(true)
    const [delivery, setDelivery] = useState<boolean>(false)
    const [paymentMethod, setPaymentMethod] = useState<boolean>(false)
    const [selectMethod, setSelectMethod] = useState<string>(CREDIT)

    const [purchaseInfo, setPurchaseInfo] = useState({
        email: "",
        name: "",
        lastname:"",
        phone: "",
        gender: "",
        street: "",
        number:"",
        houseApartament: "",
        neighborhood:"",
        city:"",
        receives:""

    })
    initMercadoPago(VITE_MP_P_KEY, { locale: 'es-AR' })

    const [preferenceId, setPreferenceId] = useState<string>("")
    const [oneClick, setOneClick] = useState<boolean>(false)
    

    async function payment () {                             //Usar Redux para pasar la preferencia al SummaryProfile al precionar mercado pago
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
        console.log(preference);
        
        setPreferenceId(preference.id)
    }

  return (
    <section className="w-full relative flex justify-center items-start flex-col gap-y-5 bg-blued-500">
        <section className={`w-full transition-[height] duration-700
            ${personalInformation? "h-auto" : "min-h-[45px] max-h-[45px] overflow-hidden"} 
            relative flex justify-start items-center flex-col gap-y-8 px-5 pb-7 bg-neutral-200 `} 
            >
        
            <h2 className="py-3 text-sm tracking-widest cursor-pointer"> Datos Personales</h2>
            <i className="absolute left-[14px] top-[14px] bx bx-user-circle scale-150"></i>
            {!personalInformation && delivery && !paymentMethod && <i className="absolute right-4 top-4 bx bx-edit scale-115" onClick={() => {setPersonalInformation(true), setDelivery(false), setPaymentMethod(false)}}></i>}
            {!personalInformation && !delivery && paymentMethod && <i className="absolute right-4 top-4 bx bx-edit scale-115" onClick={() => {setPersonalInformation(true), setDelivery(false), setPaymentMethod(false)}}></i>}


            <div className="w-full">
                <Input name="Correo Electronico" placeholder="tu@correo.com" onChange={(e) => setPurchaseInfo({...purchaseInfo, email:e.target.value})}/>
            </div>
            <div className="w-full flex justify-center items-center gap-x-5">
                <Input name="Nombre *" placeholder="Jose" onChange={(e) => setPurchaseInfo({...purchaseInfo, name:e.target.value})}/>
                <Input name="Apellido *" placeholder="Luque" onChange={(e) => setPurchaseInfo({...purchaseInfo, lastname:e.target.value})}/>
            </div>
            <div className="w-full flex justify-center items-center gap-x-5">
                <Input name="Telefono *" onChange={(e) => setPurchaseInfo({...purchaseInfo, phone:e.target.value})}/>
                <div className="w-full relative flex justify-center items-center gap-x-5">
                    <h2 className="absolute left-0 -top-4 text-sm text-neutral-600">Genero *</h2>
                    <div className="flex justify-center items-center flex-col text-sm">
                        <input type="radio" name="option" id="option1" value="option1" />
                        <label htmlFor="option1">Masculino</label>
                    </div>

                    <div className="flex justify-center items-center flex-col text-sm">
                        <input type="radio" name="option" id="option2" value="option2" />
                        <label htmlFor="option1">Femenino</label>
                    </div>

                    <div className="flex justify-center items-center flex-col text-sm">
                        <input type="radio" name="option" id="option3" value="option3" />
                        <label htmlFor="option1">Otro</label>
                    </div>
                </div>              
            </div>
            <div className="w-full flex justify-center items-center">
                <Button 
                    text="Validar" 
                    style="w-[80%] py-2 bg-black text-white rounded-full" 
                    onClick={() => {setPersonalInformation(false), setDelivery(true)}}
                    disable={!purchaseInfo.email || !purchaseInfo.name || !purchaseInfo.lastname || !purchaseInfo.phone}
                    />
            </div>

        </section>

        <section className={`w-full ${delivery ? "h-auto" : "min-h-[45px] max-h-[45px] overflow-hidden"} relative flex justify-start items-center flex-col gap-y-8 px-5 pb-7 bg-neutral-200`}>

            <h2 className="py-3 text-sm tracking-widest cursor-pointer">Entrega</h2>
            <i className="absolute left-[14px] top-[14px] bx bx-package scale-150"></i>
            {!delivery && !personalInformation && <i className="absolute right-4 top-4 bx bx-edit scale-115" onClick={() => {setPersonalInformation(false), setDelivery(true), setPaymentMethod(false)}}></i>}

            <div className="w-full flex justify-center items-center gap-x-5">
                    <Input name="Calle *" onChange={(e) => setPurchaseInfo({...purchaseInfo, street:e.target.value})}/>
                    <Input name="Numero *" onChange={(e) => setPurchaseInfo({...purchaseInfo, number:e.target.value})}/>
                </div>
                <div className="w-full flex justify-center items-center gap-x-5">
                    <Input name="Casa / Piso / Departamento *" onChange={(e) => setPurchaseInfo({...purchaseInfo, houseApartament:e.target.value})}/>
                    <Input name="Ciudad *" onChange={(e) => setPurchaseInfo({...purchaseInfo, city:e.target.value})}/>
                </div>
                <div className="w-full flex justify-center items-center gap-x-5">
                    <Input name="Barrio *" onChange={(e) => setPurchaseInfo({...purchaseInfo, neighborhood:e.target.value})}/>
                    <Input name="Quien recibe el pedido? *" onChange={(e) => setPurchaseInfo({...purchaseInfo, receives:e.target.value})}/>
                </div>

                <div className="w-full flex justify-center items-center">
                <Button 
                    text="Validar" 
                    style="w-[80%] py-2 bg-black text-white rounded-full" 
                    onClick={() => {setDelivery(false), setPaymentMethod(true)}}
                    disable={!purchaseInfo.street || !purchaseInfo.number || !purchaseInfo.houseApartament || !purchaseInfo.neighborhood || !purchaseInfo.city || !purchaseInfo.receives}
                    
                    />
                </div>

        </section>

        <section className={`w-full
            ${paymentMethod? `h-auto` : `min-h-[45px] max-h-[45px] overflow-hidden`} 
            transition-[height_min-height_max-height] duration-700 relative flex justify-start items-center flex-col gap-y-2 px-5 pt-0 pb-7 bg-neutral-200`} >
        
            <h2 className="py-3 text-sm tracking-widest cursor-pointer">Metodo de Pago</h2>
            <i className="absolute left-[14px] top-[14px] bx bx-credit-card scale-150"></i>

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
                {preferenceId && <Wallet 
                    initialization={{ preferenceId: preferenceId, redirectMode:"modal"}} 
                    customization={
                        { 
                            texts:{ valueProp: 'smart_option'}, 
                            visual:{ buttonBackground: 'black'},

                            
                        }
                    } 
                    
                    />}
        </section>
        
    </section>
  )
}

export default CheckoutProfile