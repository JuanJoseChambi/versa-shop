import { useParams } from "react-router-dom"
import useApi from "../../hooks/useApi"
// import { ProfileUser, ResponseData } from "../../interfaces/interfaces"
import Nav from "../../components/Nav/Nav"
import { useDecode } from "../../hooks/useDecode"
// import { error } from "../../utils/alert"
import Loader from "../../components/Loader/Loader"
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
    
    // const { data, error:InfoUser, loading } = useApi(`http://localhost:3001/user/info/${id}`, token) as { data: ProfileUser, error: string, loading: boolean }
    // if (InfoUser) return error(InfoUser)
    // console.log(token);
    
    const { data, loading } = useApi(`http://localhost:3001/user/${id}/purchases`, token) as {data:UserPurchases[] , loading:boolean}
    // console.log(data);
    
  return (
    <header>
        <Loader active={loading}/>
        <Nav style="text-white"/>
        <section className="w-full h-[250px] flex justify-evenly items-center bg-gradient-to-r from-neutral-950 to-neutral-800">
            <article className="pt-10 bg-redd-500">
                <h3 className="text-white text-6xl font-semibold">{name} {lastname}</h3>
                <p className="text-sm text-neutral-400"># {nickname}</p>
            </article>
            <picture className="w-[250px] h-[250px] flex justify-center items-center bg-neutral-200 rounded-full overflow-hidden translate-y-24">
                <img src="https://www.timburnslaw.com/wp-content/uploads/2017/12/no-user.png" alt="Profile Image" />
            </picture>
        </section>
        <section className="area flex justify-center items-center flex-wrap gap-5 py-10">
            
            {Array.isArray(data) ? data?.map(purchase => (
                <div key={purchase.purchase_id} className="min-w-[150px] h-[200px] relative px-4 gap-y-2 flex justify-center items-center flex-col border border-neutral-400">
                    <div className="bg-blued-500 flex justify-center items-center flex-col gap-y-2">

                        {purchase.Products?.map(product => (
                        <div key={product.PurchaseProduct.ProductProductId} className="w-full relative flex justify-start items-center ">
                            <picture className="flex justify-center items-center w-[50px] h-[50px] overflow-hidden bg-redd-500">
                                <img src={product.image} alt="" className=""/>
                            </picture>
                            <div>
                                <p className="text-sm">{product.name}</p>
                                <p className="text-sm">{product.price}</p>
                            </div>
                            <p className="absolute -top-2 left-10 text-xs text-neutral-500 ">{product.unit}</p>

                            {/* <p className="text-xs">{product.description}</p> */}
                        </div>
                        ))}

                    </div>
                    <div className="w-full">
                        <p>Direction: {purchase.direction}</p>
                        <div className="w-full h-[1px] bg-neutral-400"></div>
                        <p className="text-sm">Price Total: ${purchase.priceTotal}</p>
                        {/* <p>{purchase.}</p> */}
                        <p className="text-xs text-neutral-500 absolute bottom-3 right-3">{purchase.PurchaseState.state}</p>
                    </div>
                </div>
            )): ""}
        </section>



    </header>
  )
}

export default Profile