import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import SummaryCart from "../SummaryCart/SummaryCart"
import { useState } from "react"
import { fetchPOST } from "../../utils/fetchPOST"
import { deleteOnePreferenceProfile, updateProfileProperty } from "../../redux/slice/preferenceProfileSlice"
const {VITE_URL_BASE} = import.meta.env

function SummaryProfile() {
    const { profilePurchase } = useSelector((state:RootState) => state.preferenceProfile)
    const { cart } = useSelector((state:RootState) => state.cart)
    const subtotal = cart.map(product => product.price * product.cantidad).reduce((accumulator, current) => accumulator + current, 0);

    const [offer, setOffer] = useState<{active?:boolean, code?:string, applied?:boolean} | null>(null)
    const dispatch = useDispatch()
    async function consultDiscountCode () {
        const {error, data} = await fetchPOST(`${VITE_URL_BASE}/discount-code/consult`, {code: offer?.code}) as {error:boolean, data:{data:number}}
        !error && setOffer({applied:true})
        !error && dispatch(updateProfileProperty({property:"discountCode", value:offer?.code as string}))
        !error && dispatch(updateProfileProperty({property:"discount", value:data?.data.toString() as string}))
    }   

    function handlerDeleteDiscount () {
        dispatch(deleteOnePreferenceProfile({property:"discount", value:""}))
        dispatch(deleteOnePreferenceProfile({property:"discountCode", value:""}))
    }

  return (
    <section className="bg-redd-500 w-full">
        <section className="w-full max-h-[200px] py-2 bg-blued-500 flex flex-col justify-start items-center overflow-auto scroll">
            {cart.map((product) => (
                <div key={product.id} className="w-full flex justify-start items-start gap-x-2 bg-greend-500">
                    <picture className=" w-[60px] h-[60px] flex justify-center items-center overflow-hidden bg-redd-500">
                        <img src={product.image} alt="" className="object-cover"/>
                    </picture>
                    <section className="w-full flex flex-col justify-center items-start bg-redd-500">
                        <article>
                            <h2 className="leading-5 text-sm text-clipping">{product.name}</h2>
                            <h3 className="text-sm">Talle: {product.size} | Color: {product.color}</h3>
                        
                        </article>
                        <article className="w-full flex justify-between items-center">
                            <h3 className="text-sm">x{product.cantidad}</h3>
                            <h3 className="">$ {product.price}</h3>
                        </article>
                    </section>
                    
                </div>
            ))}
        </section>
        <div className="w-full h-[1px] bg-neutral-400"></div>
        <section className={`relative flex justify-self-center items-center gap-x-2 bg-redd-500 ${offer ? "py-5" : "py-4"}`} >
            {(offer || profilePurchase.discountCode ) && <i className="bx bx-x cursor-pointer scale-110 absolute top-1 right-1" onClick={() => {profilePurchase.discountCode ? handlerDeleteDiscount() : setOffer(null)}}/>}
            {(!offer && !profilePurchase.discountCode) && <i className="bx bxs-offer scale-150"></i>}
            {(!offer && !profilePurchase.discountCode) && <h3 className="text-sm cursor-pointer" onClick={() => setOffer({active:true})}>Ingrese un codigo de descuento <b>Aqui</b></h3>}
            {(offer && !profilePurchase.discountCode) && 
            <div className="w-full flex justify-center items-center bg-redd-500">
                <div className={`${offer?.applied && "select-none pointer-events-none"} relative max-w-[300px] text-sm rounded-md flex justify-center items-center gap-x-1 py-1 px-2 border border-neutral-400 bg-blued-500`}>
                    <h3 className="font-semibold text-xs text-neutral-400 absolute -top-4 left-0">Codigo de Descuento</h3>
                    <i className="bx bxs-offer scale-150 px-1"/>
                    <input type="text" className="bg-transparent outline-none bg-redd-500" placeholder="Código de descuento" onChange={(e) => setOffer({...offer, code:e.target.value})}/>
                    <i className={`${offer?.code ? "opacity-100" : "opacity-0"} bx bx-check cursor-pointer scale-150`} onClick={consultDiscountCode}/>
                </div>
            </div>}
            {profilePurchase.discountCode && <div className="w-full text-sm flex justify-center items-center flex-col gap-y-2">
                <h3 className="text-neutral-800 font-semibold flex justify-center items-center gap-x-2"><i className="bx bxs-offer scale-125"/> Descuento Aplicado</h3>
                <div className="flex justify-center items-center gap-x-2">
                    <b className="text-neutral-800 ">  {profilePurchase.discountCode}</b>
                    {/* <i className="bx bx-right-arrow-alt"/> */}
                    <i className="bx bx-chevron-right"/>
                    <b>{profilePurchase.discount}%</b>
                </div>
            </div>}

            {/* {offer && <Input name="Descuento" placeholder="" icon="bx bxs-offer"/>} */}
        </section>
        <div className="w-full h-[1px] bg-neutral-400"></div>
        <SummaryCart subtotal={subtotal} btnStartPayment={false}/>
    </section>
  )
}

export default SummaryProfile