import { useState } from "react"
import Input from "../Input/Input"
import Button from "../Button/Button"
import { ProfilePurchase } from "../../interfaces/components"
import { useDispatch, useSelector } from "react-redux"
import { updateProfileProperty } from "../../redux/slice/preferenceProfileSlice"
import { RootState } from "../../redux/store"

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
    
  return (
    <section className="w-full relative flex justify-center items-start flex-col gap-y-5 bg-blued-500">
        <section className={`w-full transition-[height] duration-700
            ${personalInformation? "h-auto" : "min-h-[45px] max-h-[45px] overflow-hidden"} 
            relative flex justify-start items-center flex-col gap-y-8 px-5 pb-7 bg-transparent `} 
            >
            <div className="w-full flex justify-between items-center gap-x-3 bg-redd-500">
                <h2 className="w-full py-3 text-3xl tracking-wider bg-redd-500"> Datos de contacto</h2>
                <i className="bx bx-user-circle scale-150"></i>
            </div>
            {!personalInformation && <i className="cursor-pointer absolute right-12 top-6 bx bx-edit scale-115" onClick={() => {setPersonalInformation(true), setDelivery(false)}}></i>}

            <div className="w-full">
                <Input defaultValue={profilePurchase.email} name="Correo Electronico" placeholder="tu@correo.com" onChange={(e) => changePreferenceProfile("email", e.target.value)}/>
            </div>
            <div className="w-full flex justify-center items-center flex-col sm:flex-row gap-y-7 sm:gap-y-0 sm:gap-x-5">
                <Input defaultValue={profilePurchase.name} name="Nombre *" placeholder="Jose" onChange={(e) => changePreferenceProfile("name", e.target.value)}/>
                <Input defaultValue={profilePurchase.lastname} name="Apellido *" placeholder="Luque" onChange={(e) => changePreferenceProfile("lastname", e.target.value)}/>
            </div>
            <div className="w-full flex justify-center items-center flex-col sm:flex-row gap-y-5 sm:gap-y-0 sm:gap-x-5">
                <Input defaultValue={profilePurchase.phone} name="Telefono *" onChange={(e) => changePreferenceProfile("phone", e.target.value)}/>
                <div className="w-full relative flex justify-center items-center pt-3 sm:pt-0 gap-x-5">
                    <h2 className="absolute left-0 -top-4 text-sm text-neutral-600">Genero *</h2>
                    <div className="flex justify-center items-center flex-col text-sm">
                        <input type="radio" name="option" id="option1" value="Masculino" defaultChecked={profilePurchase.gender === "Masculino"} onChange={(e) => changePreferenceProfile("gender", e.target.value)}/>
                        <label htmlFor="option1">Masculino</label>
                    </div>

                    <div className="flex justify-center items-center flex-col text-sm">
                        <input type="radio" name="option" id="option2" value="Femenino" defaultChecked={profilePurchase.gender === "Femenino"} onChange={(e) => changePreferenceProfile("gender", e.target.value)}/>
                        <label htmlFor="option1">Femenino</label>
                    </div>

                    <div className="flex justify-center items-center flex-col text-sm">
                        <input type="radio" name="option" id="option3" value="Otro" defaultChecked={profilePurchase.gender === "Otro"} onChange={(e) => changePreferenceProfile("gender", e.target.value)}/>
                        <label htmlFor="option1">Otro</label>
                    </div>
                </div>              
            </div>
            <div className="w-full flex justify-center items-center">
                <Button 
                    text="Validar" 
                    style="w-[80%] py-2 bg-neutral-800 text-white rounded-sm tracking-widest font-extralight" 
                    onClick={() => {setPersonalInformation(false), setDelivery(true)}}
                    disable={!profilePurchase.email || !profilePurchase.name || !profilePurchase.lastname || !profilePurchase.phone}
                    />
            </div>

        </section>

        <section className={`w-full ${delivery ? "h-auto" : "min-h-[48px] max-h-[48px] overflow-hidden"} relative flex justify-start items-center flex-col gap-y-7 sm:gap-y-8 px-5 pb-7 bg-transparent`}>
            
            <div className="w-full flex justify-between items-center gap-x-3 bg-redd-500">
                <h2 className="py-3 text-3xl tracking-widest">Entrega</h2>
                <i className="bx bx-package scale-150"></i>
            </div>
                
                <div className="w-[100%] flex justify-start items-start flex-col sm:flex-row gap-y-7 sm:gap-y-0 sm:gap-x-5">
                    <Input defaultValue={profilePurchase.postalCode} type="number" styleDimensions="max-w-[30%]" name="Codigo Postal *" onChange={(e) => changePreferenceProfile("postalCode", e.target.value)}/>
                </div>
                <div className="w-full flex justify-center items-center flex-col sm:flex-row gap-y-7 sm:gap-y-0 sm:gap-x-5">
                    <Input defaultValue={profilePurchase.street} name="Calle *" onChange={(e) => changePreferenceProfile("street", e.target.value)}/>
                    <Input defaultValue={profilePurchase.number} name="Numero *" onChange={(e) => changePreferenceProfile("number", e.target.value)}/>
                </div>
                <div className="w-full flex justify-center items-center flex-col sm:flex-row gap-y-7 sm:gap-y-0 sm:gap-x-5">
                    <Input defaultValue={profilePurchase.houseApartament} name="Casa / Piso / Departamento *" onChange={(e) => changePreferenceProfile("houseApartament", e.target.value)}/>
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