import { SalesData } from "../../interfaces/interfaces"
import LabelText from "../LabelText/LabelText"

interface ModalSalesProp {
    active: boolean;
    purchases: SalesData
    onClose: () => void
}

function ModalSales({active ,purchases, onClose}: ModalSalesProp) {
    if(!active) return;

    const date = purchases.createdAt.toString().slice(0, 10).split("-").reverse().join("-");

  return (
    <aside className="w-full h-screen z-[50] fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="w-[70%] h-[70vh] py-3 px-3 flex justify-start items-start flex-col gap-y-1 scroll relative z-10 bg-white">
            <button className="absolute top-2 right-5 text-2xl bg-white flex justify-center items-center border border-neutral-200 rounded-full" onClick={onClose}><i className="bx bx-x text-black"></i></button>
            <section className="w-full min-h-[50%] max-md:overflow-y-auto flex justify-start items-start gap-5 md:gap-0 md:justify-around md:items-start flex-col md:flex-row bg-redd-500">
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
                    <LabelText text={`${purchases.discount.toString()} % > ${purchases.priceTotal}`} label="Descuento"/>
                    <LabelText text={`${purchases.Products.map(prod => prod.price).reduce((acumulator, current) => acumulator + current)}`} label="Descuento"/>
                </section>
            </section>
            <section className="w-full max-h-[50%] bg-redd-500 flex justify-start items-center flex-col gap-y-1">
                <h3 className="w-full text-start text-xl font-semibold text-neutral-700">PRODUCTOS</h3>
                <div className="w-full py-2 max-h-full overflow-y-auto scroll flex justify-start items-center flex-col gap-y-1">
                    {purchases?.Products.map(product => (
                        <div key={product.product_id} className="w-full bg-redd-500 flex justify-start items-center gap-2 border border-neutral-500">
                            <picture className="max-w-[40px] max-h-[40px] md:w-[50px] md:h-[50px] overflow-hidden flex justify-center items-center">
                                <img src={product.image} alt="" className="w-full h-full object-cover"/>
                            </picture>
                            <div className="w-[75%] md:w-full flex justify-center items-center flex-col bg-blued-500 md:flex-row">
                                <p className="w-full text-sm text-neutral-700 font-bold mr-auto line-clamp-1">{product?.name}</p>
                                <div className="w-full flex justify-between md:justify-center items-center bg-redd-500 gap-x-1 md:px-5">
                                    <p className=" md:w-[80px] bg-redd-500 text-sm text-neutral-600 font-semibold">x{product?.PurchaseProduct.cantidad}</p>
                                    <p className=" md:w-[80px] bg-redd-500 text-sm text-neutral-600 font-semibold line-clamp-1">{product?.PurchaseProduct.color}</p>
                                    <p className=" md:w-[80px] bg-redd-500 text-sm text-neutral-600 font-semibold">{product?.PurchaseProduct.size}</p>
                                    <p className=" md:w-[80px] bg-redd-500 text-sm text-neutral-600 font-semibold text-nowrap">$ {product?.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    </aside>
  )
}

export default ModalSales