import { useParams } from "react-router-dom"
import useApi from "../../hooks/useApi"
import Nav from "../../components/Nav/Nav"
import { useDecode } from "../../hooks/useDecode"
import Loader from "../../components/Loader/Loader"
import Button from "../../components/Button/Button"
import Nubes from "../../assets/NubeTormenta.webp"
const { VITE_C_USER } = import.meta.env

export interface UserPurchases {
    purchase_id:    string;
    direction:      string;
    priceTotal:     number;
    createdAt:      Date;
    updatedAt:      Date;
    userPurchase:   string;
    Purchase_state: number;
    PurchaseState:  PurchaseState;
    Products:       Product[];
}

export interface Product {
    name:            string;
    image:           string;
    description:     string;
    price:           number;
    unit:            number;
    PurchaseProduct: PurchaseProduct;
}

export interface PurchaseProduct {
    PurchaseProduct_id: string;
    cantidad:           number;
    size:               string;
    color:              string;
    PurchasePurchaseId: string;
    ProductProductId:   string;
}

export interface PurchaseState {
    state: string;
}

function Profile() {
    const { id } = useParams()
    const { name, lastname, nickname, token } = useDecode(VITE_C_USER)
    
    const { data, loading } = useApi(`http://localhost:3001/user/${id}/purchases`, token) as {data:UserPurchases[] , loading:boolean}

    const totalPurchases = data?.length
    
  return (
    <header className="">
        <Loader active={loading}/>
        <Nav style="text-white"/>
        <section className="w-full h-[350px] flex justify-center items-end bg-cover bg-fixed bg-center"
        style={{backgroundImage:`url(${Nubes})`}}>
            <h2 className="bg-redd-500 w-[45%] text-5xl text-white tracking-widest">MI PERFIL</h2>
        </section>

        <section className="w-[95%] mx-auto flex justify-start items-start gap-5 bg-redd-500">
            
            <section className="w-[350px] min-h-[500px] sticky -top-10 -translate-y-40 bg-white shadow-xl shadow-neutral-600 flex justify-start items-center flex-col rounded-xl gap-y-4 py-6 px-6">
                    <picture className="w-[200px] h-[200px] flex justify-center items-center bg-neutral-200 rounded-full overflow-hidden ">
                        <img src="https://www.timburnslaw.com/wp-content/uploads/2017/12/no-user.png" alt="Profile Image" />
                    </picture>
                    <div>
                        <h2 className="text-3xl font-semibold">{name} {lastname}</h2>
                        <h3 className="text-sm text-neutral-500"># {nickname}</h3>
                    </div>
                    <div className="w-full flex justify-center items-start flex-col gap-y-4">
                        <h4 className="text-sm tracking-wider text-neutral-800">Compras Realizadas: {totalPurchases}</h4>
                        <h4 className="text-sm tracking-wider text-neutral-800">Compras Pendientes: 2</h4>
                    </div>
                    <div className="w-full flex justify-center items-start flex-col gap-y-2 bg-redd-500">
                        <Button text="Gmail" iconLeft="bx bxl-gmail" style="text-sm text-neutral-700 hover:text-rose-400 transition-color duration-500"/>
                        <Button text="Facebook" iconLeft="bx bxl-facebook" style="text-sm text-neutral-700 hover:text-rose-400 transition-color duration-500"/>
                        <Button text="Twiter" iconLeft="bx bxl-twitter" style="text-sm text-neutral-700 hover:text-rose-400 transition-color duration-500"/>
                        <Button text="Instagram" iconLeft="bx bxl-instagram" style="text-sm text-neutral-700 hover:text-rose-400 transition-color duration-500"/>
                    </div>
            </section>


            <section className="w-[70%] mx-auto min-h-[250px] bg-blued-500 flex justify-start items-start py-10 flex-col bg-greend-500">


               

            </section>

        </section>



    </header>
  )
}

export default Profile



// {Array.isArray(data) ? data?.map(purchase => (
//     <div key={purchase.purchase_id} className="min-w-[150px] max-h-[200px] min-h-[200px] relative px-4 gap-y-2 flex justify-center items-center flex-col border border-neutral-400 ">
//         <div className="bg-blued-500 flex justify-start items-center flex-col gap-y-2 overflow-y-auto pt-3">

//             {purchase.Products?.map(product => (
//             <div key={product.PurchaseProduct.ProductProductId} className="w-full relative flex justify-start items-center ">
//                 <picture className="flex justify-center items-center w-[50px] h-[50px] overflow-hidden bg-redd-500">
//                     <img src={product.image} alt="" className=""/>
//                 </picture>
//                 <div>
//                     <p className="text-sm">{product.name}</p>
//                     <p className="text-sm">$ {product.price}</p>
//                 </div>
//                 <p className="absolute -top-2 left-10 text-xs text-neutral-500 ">{product.PurchaseProduct.cantidad}</p>
            
//             </div>
//             ))}

//         </div>
//         <div className="w-full">
//             <p>Direction: {purchase.direction}</p>
//             <div className="w-full h-[1px] bg-neutral-400"></div>
//             <p className="text-sm">Price Total: ${purchase.priceTotal}</p>
//             {/* <p>{purchase.}</p> */}
//             <p className="text-xs text-neutral-500 absolute bottom-3 right-3">{purchase.PurchaseState.state}</p>
//         </div>
//     </div>
// )): ""}




// <section className="w-full h-[30px] text-sm text-neutral-500 text-center flex justify-center items-center bg-redd-500 border-b border-neutral-500 divide-x divide-neutral-400">
// <div className="w-[500px]">Imagen</div>
// <div className="w-full">Nombre</div>
// <div className="w-full">Categoria</div>
// <div className="w-full">Tipo</div>
// <div className="w-full">Color</div>
// <div className="w-[50%]">Talle</div>
// <div className="w-[50%]">Unidades</div>
// <div className="w-[50%]">Precio</div>
// </section>
// <section className="w-full min-h-[60px] max-h-[60px] flex justify-between items-center text-center divide-x divide-neutral-400 bg-blued-500">

// <picture className="w-[500px] rounded-lg overflow-hidden flex justify-center items-center">
//     <img src={Nubes} alt="" className="w-full" />
// </picture>
// <div className="w-[100%] text-sm">
//     <h3 className="break-words">Campera Nike</h3>
// </div>
// <div className="w-[100%] text-sm">
//     <h3>Ropa</h3>
// </div>
// <div className="w-[100%] text-sm">
//     <h3>Camperas</h3>
// </div>
// <div className="w-[100%] text-sm">
//     <h3>Verde</h3>
// </div>
// <div className="w-[50%] text-sm">
//     <h3>XL</h3>
// </div>
// <div className="w-[50%] text-sm">
//     <h3>3</h3>
// </div>
// <div className="w-[50%] text-sm">
//     <h3>$ 80</h3>
// </div>
// </section>