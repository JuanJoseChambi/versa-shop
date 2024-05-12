import useApi from "../../../hooks/useApi"
import { DataProduct } from "../../../interfaces/interfaces"
import TitleDashboard from "../../../components/TitleDashboard/TitleDashboard"
import { fetchDELETE } from "../../../utils/fetchDELETE"
import { useEffect, useState } from "react"

function DashboardProductsEdit() {
    const [dataProduct, setDataProduct] = useState<DataProduct[]>([])
    
    const { data } = useApi("http://localhost:3001/product/all") as { data: DataProduct[] }
    // useEffect 

    async function hanlderDelete (id:string) {
        const { error } = await fetchDELETE(`http://localhost:3001/product/delete/${id}`) as {error: boolean}
        if(!error) {
            // setDataProduct(dataProduct.filter(product => product.product_id !== id))
            setDataProduct(prevDataProduct => prevDataProduct.filter(product => product.product_id !== id))
        } 
    }
    useEffect(() => {
        setDataProduct(data)   
    },[data])

    return (
    <section className="w-[95%] flex justify-center items-center flex-col bg-blued-500">
            <div className="w-full flex justify-center items-center">
                <TitleDashboard titles={[
                    {text:"Imagen", width:"w-[175px] flex justify-center items-center mr-3"},
                    {text:"Nombre", width:"w-full"},
                    {text:"Unidades", width:"w-1/3"},
                    {text:"Precio", width:"w-1/3"},
                    {text:"Categoria", width:"w-1/3"},
                    {text:"Tipo", width:"w-1/3"},
                    {text:"Stocks", width:"w-1/2"},
                    {text:"Opciones", width:"w-1/3"},

                ]}/>
            </div>
            {dataProduct?.map((product, index) => (
                <div key={index} className="w-full bg-redd-500 flex justify-center items-center divide-x bg-redd-500 border-b border-neutral-300 divide-neutral-400">
                    <picture className="w-[175px] h-[50px] overflow-hidden flex justify-center items-center mr-3 bg-redd-500">
                        <img src={product.image} alt="" className="w-full h-full object-cover"/>
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
                        <i className="cursor-pointer bx bx-trash" onClick={() => hanlderDelete(product.product_id)}></i>
                    </div>
                </div>
            ))}
        </section>
  )
}

export default DashboardProductsEdit