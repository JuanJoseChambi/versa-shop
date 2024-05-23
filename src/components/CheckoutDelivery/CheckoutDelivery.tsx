import { useState } from "react"
import Input from "../Input/Input"
import Button from "../Button/Button"
import { ProfilePurchase } from "../../interfaces/components"
import { useDispatch, useSelector } from "react-redux"
import { updateProfileProperty } from "../../redux/slice/preferenceProfileSlice"
import { RootState } from "../../redux/store"
import DeliveryMethodOption from "../DeliveryMethodOption/DeliveryMethodOption"
import { ubicationSvg, deliverySvg } from "../../assets/IconSvgs/IconSvgs"
import methodDelivery from "../../utils/methodDelivery"
import postalCodes from "../../utils/postalCodes.json"
import React from "react"

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
    
    // if (!methodDelivery) return null
    
  return (
    <section className="w-full relative flex justify-center items-start flex-col gap-y-5 bg-blued-500">
        <section className={`w-full transition-[height] duration-700
            ${personalInformation? "h-auto" : "min-h-[45px] max-h-[45px] overflow-hidden"} 
            relative flex justify-start items-center flex-col gap-y-8 px-5 pb-7 bg-transparent `} 
            >
            <div className="w-full flex justify-between items-center gap-x-3 bg-redd-500">
                <h3 className="w-full py-3 text-2xl sm:text-3xl tracking-widest bg-redd-500 flex justify-start items-center gap-x-4"> Datos de contacto</h3>
                <i className="bx bx-user-circle scale-150"></i>
            </div>
            {!personalInformation && <i className="cursor-pointer absolute right-12 top-6 bx bx-edit scale-115" onClick={() => {setPersonalInformation(true), setDelivery(false)}}></i>}
            {/* <p className="text-xs font-light bg-redd-500 p-2 text-center">Por favor, proporciona un correo de Gmail y un teléfono correctos para contactarte en caso de cualquier inconveniente. ¡Gracias!</p> */}

            <div className="w-full flex justify-center items-center flex-col sm:flex-row gap-y-5 sm:gap-y-0 sm:gap-x-5">
                <Input defaultValue={profilePurchase.email} name="Correo Electronico *" placeholder="tu@correo.com" onChange={(e) => changePreferenceProfile("email", e.target.value)}/>
                <Input defaultValue={profilePurchase.phone} type="number" name="Telefono *" placeholder="11 2222-3333" onChange={(e) => changePreferenceProfile("phone", e.target.value)}/>
            </div>
            <h3 className="w-full py-3 text-2xl sm:text-3xl tracking-widest bg-redd-500 flex justify-start items-center gap-x-4"> Entrega</h3>
            <div className="w-full flex justify-center items-center flex-col sm:flex-row gap-y-5 sm:gap-y-0 sm:gap-x-5">
                <select defaultValue={profilePurchase.country} className="w-full outline-none border border-neutral-500 p-1 text-sm" onChange={(e) => changePreferenceProfile("country", e.target.value)}>
                    <option key={""} value={""}>Seleccione un pais</option>

                    {postalCodes.map(postal => (
                        <option key={postal.code} value={postal.name}>{postal.name}</option>
                    ))}
                </select>
                <select className="w-full outline-none border border-neutral-500 p-1 text-sm" onChange={(e) => changePreferenceProfile("city", e.target.value)}>
                    
                    {postalCodes.filter(postalCode => postalCode.name === profilePurchase.country).map(postal => (
                        <React.Fragment key={postal.name}>
                            {postal.provinces.map(province => (
                                <option key={province.code} value={province.name}>{province.name}</option>
                            ))}
                        </React.Fragment>
                    ))}
                </select>
            </div> 
            <div className="w-full flex justify-center items-center flex-row gap-y-7 sm:gap-y-0 gap-x-5">
                <Input defaultValue={profilePurchase.postalCode} type="number" name="Codigo Postal *" placeholder="1234" 
                    onChange={(e) => {
                        changePreferenceProfile("postalCode", e.target.value), 
                        changePreferenceProfile("city", (!profilePurchase.city ? "Capital Federal" : profilePurchase.city)),
                        changePreferenceProfile("country", (!profilePurchase.country ? "Argentina" : profilePurchase.country))
                        }}/>
                <a href="https://www.correoargentino.com.ar/formularios/cpa" target="_blank" className="min-w-[100px] text-xs text-neutral-700 text-center border-b border-neutral-400 bg-redd-500">Encontra tu CP</a>
            </div>
            <div className="w-full flex justify-center items-center">
                <Button 
                    text="Validar" 
                    style={`w-[80%] py-2 bg-neutral-800 text-white rounded-sm tracking-widest font-extralight`} 
                    onClick={() => {setPersonalInformation(false), setDelivery(true)}}
                    disable={!profilePurchase.email || !profilePurchase.phone}
                    />
            </div>

        </section>

        <section className={`w-full ${delivery ? "h-auto" : "hidden"} relative flex justify-start items-center flex-col gap-y-7 sm:gap-y-8 px-5 pb-7 bg-transparent`}>
            
                <div className="w-full flex justify-between items-center gap-x-3 bg-redd-500">
                    <h2 className="w-full py-3 text-2xl sm:text-3xl tracking-widest bg-redd-500 ">Entrega</h2>
                    <i className="bx bx-package scale-150"></i>
                </div>

                <div className="w-full">
                    <h3 className="text-sm tracking-widest font-semibold mb-2 flex justify-start items-center gap-x-3">{deliverySvg["xl"]}Envio a domicilio</h3>
                    <DeliveryMethodOption 
                        title={methodDelivery?.homeDelivery?.correoArg?.title}
                        subtitle={methodDelivery?.homeDelivery?.correoArg?.subtitle} 
                        price={methodDelivery?.homeDelivery?.correoArg?.price}
                        disable={false} 
                        nameRadio="delivery"
                        valueRadio={methodDelivery?.homeDelivery?.correoArg?.value}
                        defaultChecked={profilePurchase?.methodOfDelivery === methodDelivery?.homeDelivery?.correoArg?.value}
                        onChange={(e) => changePreferenceProfile("methodOfDelivery", e.target.value)}
                        />

                </div>
                <div className="w-full flex justify-center items-start flex-col gap-y-4">
                    <h3 className="text-sm tracking-widest font-semibold mb-2 flex justify-start items-center gap-x-3">{ubicationSvg}Retira por</h3>
                    <DeliveryMethodOption 
                        title={methodDelivery?.withdrawal?.localVersa?.title} 
                        subtitle={methodDelivery?.withdrawal?.localVersa?.subtitle}
                        price={methodDelivery?.withdrawal?.localVersa?.price} 
                        nameRadio="delivery"
                        valueRadio={methodDelivery?.withdrawal?.localVersa?.value} 
                        defaultChecked={profilePurchase.methodOfDelivery === methodDelivery?.withdrawal?.localVersa?.value}
                        onChange={(e) => changePreferenceProfile("methodOfDelivery", e.target.value)}
                        />
                    <DeliveryMethodOption 
                        title={methodDelivery?.withdrawal?.correoArg?.title}
                        subtitle={methodDelivery?.withdrawal?.correoArg?.subtitle}
                        price={methodDelivery?.withdrawal?.correoArg?.price}
                        disable={true} 
                        nameRadio="delivery"
                        valueRadio={methodDelivery?.withdrawal?.correoArg?.value}
                        defaultChecked={profilePurchase.methodOfDelivery === methodDelivery?.withdrawal?.correoArg?.value}
                        onChange={(e) => changePreferenceProfile("methodOfDelivery", e.target.value)}
                        />
                </div>
                
                { profilePurchase.methodOfDelivery === methodDelivery?.homeDelivery?.correoArg?.value && 
                    <div className="w-full min-h-[300px] flex justify-start items-start flex-col gap-y-8 bg-redd-500">
                        <h3 className="text-2xl font-light tracking-wider">Datos del destinatario</h3>
                        <div className="w-full flex justify-start items-center py-3 border border-neutral-400 flex-row">
                            
                            <div className="px-3">{ubicationSvg}</div>
                            <div className="flex-1">
                                <h3 className="text-sm font-bold text-neutral-700 leading-3">Codigo postal {profilePurchase.postalCode}</h3>
                                <p className="text-sm text-neutral-600">{profilePurchase.country}, {profilePurchase.city}</p>
                            </div>
                            <i className="bx bx-edit px-3 cursor-pointer" onClick={() => {setPersonalInformation(true), setDelivery(false)}}></i>
                        </div>
                        <div className="w-full flex justify-center items-center flex-col sm:flex-row gap-y-7 sm:gap-y-0 sm:gap-x-5">
                            <Input defaultValue={profilePurchase.name} name="Nombre *" placeholder="Juan" onChange={(e) => changePreferenceProfile("name", e.target.value)}/>
                            <Input defaultValue={profilePurchase.lastname} name="Apellido *" placeholder="Perez" onChange={(e) => changePreferenceProfile("lastname", e.target.value)}/>
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
                            <Input defaultValue={profilePurchase.neighborhood} name="Barrio (Opcional)" onChange={(e) => changePreferenceProfile("neighborhood", e.target.value)}/>
                            {/* <Input defaultValue={profilePurchase.receives} name="Quien recibe el pedido? *" onChange={(e) => changePreferenceProfile("receives", e.target.value)}/> */}
                        </div>
                        <h3 className="text-2xl font-light tracking-wider">Datos de Facturacion</h3>
                        <div className="w-full flex justify-center items-center flex-col sm:flex-row gap-y-7 sm:gap-y-0 sm:gap-x-5">
                            <Input defaultValue={profilePurchase.id} type="number" name="DNI o CUIL *" placeholder="12345678" onChange={(e) => changePreferenceProfile("id", e.target.value)}/>       
                            
                        </div>
                    </div>
                }
                {profilePurchase.methodOfDelivery === methodDelivery?.withdrawal?.localVersa?.value && 
                    
                    <div className="w-full min-h-[300px] flex justify-start items-start flex-col gap-y-8 bg-redd-500">

                        <h3 className="text-2xl font-light tracking-wider">Datos de Facturacion</h3>
                        
                        <div className="w-full flex justify-center items-center flex-col sm:flex-row gap-y-7 sm:gap-y-0 sm:gap-x-5">
                            <Input defaultValue={profilePurchase.id} type="number" name="DNI o CUIL *" placeholder="12345678" onChange={(e) => changePreferenceProfile("id", e.target.value)}/>       
                            
                        </div>
                        <h3 className="text-lg font-light tracking-widest ">Persona que recibira el pedido</h3>
                        
                        <div className="w-full flex justify-center items-center flex-row gap-y-7 sm:gap-y-0 gap-x-5">
                            <Input defaultValue={profilePurchase.name} name="Nombre *" placeholder="Juan" onChange={(e) => changePreferenceProfile("name", e.target.value)}/>
                            <Input defaultValue={profilePurchase.lastname} name="Apellido *" placeholder="Perez" onChange={(e) => changePreferenceProfile("lastname", e.target.value)}/>
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
                            <Input defaultValue={profilePurchase.neighborhood} name="Barrio (Opcional)" onChange={(e) => changePreferenceProfile("neighborhood", e.target.value)}/>
                        </div>
                        <div className="w-full flex justify-start items-center py-3 border border-neutral-400 flex-row">
                            
                            <div className="px-3">{ubicationSvg}</div>
                            <div className="flex-1">
                                <h3 className="text-sm font-bold text-neutral-700 leading-3">Codigo postal {profilePurchase.postalCode}</h3>
                                <p className="text-sm text-neutral-600">{profilePurchase.country}, {profilePurchase.city}</p>
                            </div>
                            <i className="bx bx-edit px-3 cursor-pointer" onClick={() => {setPersonalInformation(true), setDelivery(false)}}></i>
                        </div>
                        
                    </div>
                }

                <div className="w-full flex justify-center items-center">
                <Button 
                    text="Validar" 
                    style="w-[80%] py-2 bg-neutral-800 text-white rounded-sm tracking-widest font-extralight" 
                    onClick={setCheckout} // !profilePurchase.receives
                    disable={!profilePurchase.id || !profilePurchase.name || !profilePurchase.lastname || !profilePurchase.postalCode || !profilePurchase.street || !profilePurchase.number || !profilePurchase.neighborhood || !profilePurchase.city }
                    />
                </div>

        </section>

        
    </section>
  )
}

export default CheckoutDelivery