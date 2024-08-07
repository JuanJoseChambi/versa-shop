import { useSelector } from "react-redux";
// import Button from "../Button/Button"
import { RootState } from "../../redux/store";
import hanlderDiscount from "../../utils/handlerDiscount";
import { Link } from "react-router-dom";

interface SummaryCartProp {
    subtotal: number;
    checkout?: string;
    setCheckout?: () => void;
    btnStartPayment?:boolean
}

// setCheckoutProfile
function SummaryCart({subtotal, checkout, btnStartPayment = true}:SummaryCartProp) {

    const { profilePurchase } = useSelector((state:RootState) => state.preferenceProfile)

    const subTotal = profilePurchase.discount ? hanlderDiscount(subtotal, Number(profilePurchase?.discount)) : subtotal;


  return (
    <section className="w-full flex justify-between items-center gap-y-3 flex-col text-sm py-3">
        <div className="w-full flex justify-between items-center">
            <h3>Subtotal</h3>
            <h3>$ {subtotal}</h3>
        </div>
        {profilePurchase.discountCode && 
        <div className="w-full font-semibold flex justify-between items-center">
            <h3>Descuento</h3>
            <h3>{profilePurchase.discount} %</h3>
        </div>
        }
        <div className="w-full flex justify-between items-center">
            <h3>Envio</h3>
            <h3>Gratis</h3>
        </div>
        <div className="w-full h-[1px] bg-neutral-400"></div>
        <div className="w-full flex justify-between items-center">
            <h3 className="text-xl font-semibold tracking-widest">Total</h3>
            <h3 className="text-xl font-semibold">$ {subTotal}</h3>
        </div>
        {btnStartPayment && 
        <section className="w-full flex justify-center items-center flex-col gap-y-3">
            <Link to={`/checkout${checkout}`} className="w-[80%] flex justify-center items-center py-2 rounded-sm bg-neutral-800 text-white text-sm">
                Iniciar pago
            </Link>
        </section>
        }
        

    </section>
  )
}

export default SummaryCart