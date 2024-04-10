import Dashboard from "../../components/Dashboard/Dashboard"
import Nav from "../../components/Nav/Nav"
import TitleDashboard from "../../components/TitleDashboard/TitleDashboard"
import useApi from "../../hooks/useApi"
import { useDecode } from "../../hooks/useDecode"
import { UserPurchases } from "../Profile/Profile"
// import Dashboard from "../../components/Dashboard/Dashboard"
// import TitleDashboard from "../../components/TitleDashboard/TitleDashboard"
import Nubes from "../../assets/NubeTormenta.webp"
import { useParams } from "react-router-dom"
const { VITE_C_USER } = import.meta.env

function Purchases() {
  
  const { id } = useParams()

  const { token, name, lastname, nickname } = useDecode(VITE_C_USER)


  const { data } = useApi(`http://localhost:3001/user/${id}/purchases`, token) as {data:UserPurchases[] , loading:boolean}


  return (
    <main>
      <Nav style="text-white"/>
      <section className="w-full h-[350px] flex justify-center items-center bg-cover bg-fixed bg-center"
        style={{backgroundImage:`url(${Nubes})`}}>

        <section className="w-[90%] mx-auto pt-7 flex justify-center items-center flex-col gap-y-3 bg-redd-500 ">

          <picture className="w-[100px] flex justify-center items-center rounded-full overflow-hidden border border-neutral-300 shadow-lg shadow-neutral-500">
            <img src="https://www.timburnslaw.com/wp-content/uploads/2017/12/no-user.png" alt="" />
          </picture>

          <div className="flex justify-start items-center flex-col leading-4">
            <h3 className="tracking-widest text-3xl text-white">{name} {lastname}</h3>
            <h3 className="text-neutral-500 text-sm"># {nickname}</h3>
          </div>
        </section>
      </section>

      

      <section className="w-[90%] mx-auto min-h-[250px] bg-blued-500 flex justify-start items-start py-10 flex-col bg-greend-500">
        <TitleDashboard titles={[
            {text:"Imagen", width:"w-[230px] mr-2"},
            {text:"Nombre", width:"w-full"},
            {text:"Talle", width:"w-1/3"},
            {text:"Color", width:"w-1/2"},
            {text:"Cantidad", width:"w-1/3"},
            {text:"Estado", width:"w-2/3"},
            {text:"Precio", width:"w-1/2"},
            {text:"Total", width:"w-1/2"},
        ]}/>
        {Array.isArray(data) && data.length ? data?.map((purchase) => {
        
            const {priceTotal, PurchaseState} = purchase;

            return (
                <>
                    {
                        purchase.Products.map(({name, image, price, PurchaseProduct}) => (
                            <Dashboard values={[
                                {   value:image, type:"image", width:"w-[230px] mr-2", 
                                    value2:name, width2:"w-full",
                                    value3:PurchaseProduct.size, width3:"w-1/3",
                                    value4:PurchaseProduct.color, width4:"w-1/2",
                                    value5:PurchaseProduct.cantidad.toString(), width5:"w-1/3",
                                    value6:PurchaseState.state, width6:"w-2/3",
                                    value7:price.toString(), width7:"w-1/2",
                                    value8:priceTotal.toString(), width8:"w-1/2"
                                }
                            ]}/>
                        ))
                    }
                </>
            )
        }) : <div className="w-full pt-20 bg-redd-500 text-center text-xl text-neutral-700">Aun no tiene compras</div>}

    </section>

    </main>
  )
}

export default Purchases