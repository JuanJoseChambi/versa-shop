import { useState } from "react"
import Input from "../Input/Input"
import Button from "../Button/Button"
import { ProfilePurchase } from "../../interfaces/components"
import { useDispatch, useSelector } from "react-redux"
import { updateProfileProperty } from "../../redux/slice/preferenceProfileSlice"
import { RootState } from "../../redux/store"
import DeliveryMethodOption from "../DeliveryMethodOption/DeliveryMethodOption"
import { ubicationSvg, deliverySvg } from "../../assets/IconSvgs/IconSvgs"

interface PropCheckoutDelivery {
    setCheckout: () => void
}

function CheckoutDelivery({setCheckout}:PropCheckoutDelivery) {
    
    
    const [personalInformation, setPersonalInformation] = useState<boolean>(true)
    const [delivery, setDelivery] = useState<boolean>(false)

    const { profilePurchase } = useSelector((state:RootState) => state.preferenceProfile)
    
    const dispatch = useDispatch()

    // Para guardar en LocalStorage InfoCheckout
    function changePreferenceProfile (property: keyof ProfilePurchase, value:string) {
        dispatch(updateProfileProperty({property, value}))
        // console.log(property, value);
    }
    // console.log(profilePurchase);
    
    
  return (
    <section className="w-full relative flex justify-center items-start flex-col gap-y-5 bg-blued-500">
        <section className={`w-full transition-[height] duration-700
            ${personalInformation? "h-auto" : "min-h-[45px] max-h-[45px] overflow-hidden"} 
            relative flex justify-start items-center flex-col gap-y-8 px-5 pb-7 bg-transparent `} 
            >
            <div className="w-full flex justify-between items-center gap-x-3 bg-redd-500">
                <h2 className="w-full py-3 text-2xl sm:text-3xl tracking-widest bg-redd-500 "> Datos de contacto</h2>
                <i className="bx bx-user-circle scale-150"></i>
            </div>
            {!personalInformation && <i className="cursor-pointer absolute right-12 top-6 bx bx-edit scale-115" onClick={() => {setPersonalInformation(true), setDelivery(false)}}></i>}

            <div className="w-full">
                <Input defaultValue={profilePurchase.email} name="Correo Electronico *" placeholder="tu@correo.com" onChange={(e) => changePreferenceProfile("email", e.target.value)}/>
            </div>
            <div className="w-full flex justify-center items-center flex-col sm:flex-row gap-y-7 sm:gap-y-0 sm:gap-x-5">
                <Input defaultValue={profilePurchase.name} name="Nombre *" placeholder="Juan" onChange={(e) => changePreferenceProfile("name", e.target.value)}/>
                <Input defaultValue={profilePurchase.lastname} name="Apellido *" placeholder="Perez" onChange={(e) => changePreferenceProfile("lastname", e.target.value)}/>
            </div>
            <div className="w-full flex justify-center items-center flex-col sm:flex-row gap-y-5 sm:gap-y-0 sm:gap-x-5">
                <Input defaultValue={profilePurchase.phone} name="Telefono *" placeholder="11 2222-3333" onChange={(e) => changePreferenceProfile("phone", e.target.value)}/>
                <Input defaultValue={profilePurchase.id} type="number" name="DNI o CUIL *" placeholder="12345678" onChange={(e) => changePreferenceProfile("id", e.target.value)}/>       
            </div>
            <div className="w-full flex justify-center items-center">
                <Button 
                    text="Validar" 
                    style={`w-[80%] py-2 bg-neutral-800 text-white rounded-sm tracking-widest font-extralight`} 
                    onClick={() => {setPersonalInformation(false), setDelivery(true)}}
                    disable={!profilePurchase.email || !profilePurchase.name || !profilePurchase.lastname || !profilePurchase.phone || !profilePurchase.id}
                    />
            </div>

        </section>

        <section className={`w-full ${delivery ? "h-auto" : "min-h-[48px] max-h-[48px] overflow-hidden"} relative flex justify-start items-center flex-col gap-y-7 sm:gap-y-8 px-5 pb-7 bg-transparent`}>
            
                <div className="w-full flex justify-between items-center gap-x-3 bg-redd-500">
                    <h2 className="w-full py-3 text-2xl sm:text-3xl tracking-widest bg-redd-500 ">Entrega</h2>
                    <i className="bx bx-package scale-150"></i>
                </div>

                <div className="w-full">
                    <h3 className="text-sm tracking-widest font-semibold mb-2 flex justify-start items-center gap-x-3">{deliverySvg["xl"]}Envio a domicilio</h3>
                    <DeliveryMethodOption 
                        title="Correo Argentino Clasico | Envio a domicilio"
                        subtitle="Llega entre miércoles 22/05 y lunes 27/05" 
                        price="$1.600" 
                        nameRadio="delivery"/>

                </div>
                <div className="w-full flex justify-center items-start flex-col gap-y-4">
                    <h3 className="text-sm tracking-widest font-semibold mb-2 flex justify-start items-center gap-x-3">{ubicationSvg}Retira por</h3>
                    <DeliveryMethodOption 
                        title="Retira en Local Versa" 
                        subtitle="Av. Saenz, Pompeya, Local 21" 
                        price="Gratis" 
                        nameRadio="delivery"/>
                    <DeliveryMethodOption 
                        title="Correo Argentino Clasico | Retiro"
                        subtitle="Llega entre miércoles 22/05 y lunes 27/05" 
                        price="$1.000" 
                        nameRadio="delivery"/>
                </div>
                
                
                <div className="w-full flex justify-center items-center flex-row gap-y-7 sm:gap-y-0 gap-x-5">
                    <Input defaultValue={profilePurchase.postalCode} type="number" name="Codigo Postal *" onChange={(e) => changePreferenceProfile("postalCode", e.target.value)}/>
                    <a href="https://www.correoargentino.com.ar/formularios/cpa" target="_blank" className="min-w-[100px] text-xs text-neutral-700 text-center border-b border-neutral-400 bg-redd-500">Encontra tu CP</a>
                </div>
                <div className="w-full flex justify-center items-center flex-col sm:flex-row gap-y-7 sm:gap-y-0 sm:gap-x-5">
                    <Input defaultValue={profilePurchase.street} name="Calle *" onChange={(e) => changePreferenceProfile("street", e.target.value)}/>
                    <Input defaultValue={profilePurchase.number} name="Numero (Opcional)" onChange={(e) => changePreferenceProfile("number", e.target.value)}/>
                </div>
                <div className="w-full flex justify-center items-center flex-col sm:flex-row gap-y-7 sm:gap-y-0 sm:gap-x-5">
                    <Input defaultValue={profilePurchase.houseApartament} name="Casa / Piso / Departamento (Opcional)" onChange={(e) => changePreferenceProfile("houseApartament", e.target.value)}/>
                    <Input defaultValue={profilePurchase.city} name="Ciudad *" onChange={(e) => changePreferenceProfile("city", e.target.value)}/>
                </div>
                <div className="w-full flex justify-center items-center flex-col sm:flex-row gap-y-7 sm:gap-y-0 sm:gap-x-5">
                    <Input defaultValue={profilePurchase.neighborhood} name="Barrio *" onChange={(e) => changePreferenceProfile("neighborhood", e.target.value)}/>
                    <Input defaultValue={profilePurchase.receives} name="Quien recibe el pedido? *" onChange={(e) => changePreferenceProfile("receives", e.target.value)}/>
                </div>

                <div className="w-full flex justify-center items-center">
                <Button 
                    text="Validar" 
                    style="w-[80%] py-2 bg-neutral-800 text-white rounded-sm tracking-widest font-extralight" 
                    onClick={setCheckout}
                    disable={!profilePurchase.street || !profilePurchase.number || !profilePurchase.houseApartament || !profilePurchase.neighborhood || !profilePurchase.city || !profilePurchase.receives}
                    
                    />
                </div>

        </section>

        
    </section>
  )
}

export default CheckoutDelivery