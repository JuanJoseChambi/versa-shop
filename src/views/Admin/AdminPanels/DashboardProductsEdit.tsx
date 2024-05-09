import useApi from "../../../hooks/useApi"
import { DataProduct } from "../../../interfaces/interfaces"
import TitleDashboard from "../../../components/TitleDashboard/TitleDashboard"

function DashboardProductsEdit() {

    const { data } = useApi("http://localhost:3001/product/all") as { data: DataProduct[] }

    return (
    <section className="w-[95%] flex justify-center items-center flex-col bg-blued-500">
            <div className="w-full flex justify-center items-center">
                <TitleDashboard titles={[
                    {text:"Imagen", width:"w-1/6 flex justify-center items-center mr-3"},
                    {text:"Nombre", width:"w-full"},
                    {text:"Unidades", width:"w-1/3"},
                    {text:"Precio", width:"w-1/3"},
                    {text:"Categoria", width:"w-1/3"},
                    {text:"Tipo", width:"w-1/3"},
                    {text:"Stocks", width:"w-1/2"},
                    {text:"Opciones", width:"w-1/3"},

                ]}/>
            </div>
            {data?.map((product, index) => (
                <div key={index} className="w-full bg-redd-500 flex justify-center items-center divide-x bg-redd-500 border-b border-neutral-300 divide-neutral-400">
                    <picture className="w-1/6 flex justify-center items-center mr-3">
                        <img src={product.image} alt=""/>
                    </picture>
                    <h3 className="w-full pl-1">{product.name}</h3>
                    <h4 className="w-1/3 text-center">{product.unit}</h4>
                    <h3 className="w-1/3 text-center">$ {product.price}</h3>
                    <h4 className="w-1/3 text-center">{product.Category.category}</h4>
                    <h3 className="w-1/3 text-center">{product.Type.type}</h3>
                    <div className="w-1/2 text-sm flex justify-center items-center flex-col gap-x-3">{product.Stocks.map((stock, index) => (<h3 key={index}>{stock.Size.size} : {stock.Color.color}: {stock.unit}</h3>))}</div>
                    <div className="w-1/3 flex justify-center items-center gap-x-2">
                        <i className="cursor-pointer bx bx-edit"></i>
                        <i className="cursor-pointer bx bx-lock-alt"></i>
                        <i className="cursor-pointer bx bx-trash"></i>
                    </div>
                </div>
            ))}
        </section>
  )
}

export default DashboardProductsEdit