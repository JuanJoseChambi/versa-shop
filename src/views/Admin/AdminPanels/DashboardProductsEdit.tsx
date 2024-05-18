import useApi from "../../../hooks/useApi"
import { DataProduct } from "../../../interfaces/interfaces"
import TitleDashboard from "../../../components/TitleDashboard/TitleDashboard"
import { fetchDELETE } from "../../../utils/fetchDELETE"
import { useEffect, useState } from "react"
import React from "react"
import Input from "../../../components/Input/Input"
import Textarea from "../../../components/Textarea/Textarea"
import { allFilters } from "../../../utils/allFilters"
import Filters from "../../../components/Filters/Filters"

function DashboardProductsEdit() {
    const [dataProduct, setDataProduct] = useState<DataProduct[]>([])
    
    const { data } = useApi("http://localhost:3001/product/all") as { data: DataProduct[] }
    const [edit, setEdit] = useState<string | null>(null)

    async function hanlderDelete (id:string) {
        const { error } = await fetchDELETE(`http://localhost:3001/product/delete/${id}`) as {error: boolean}
        if(!error) {
            setDataProduct(prevDataProduct => prevDataProduct.filter(product => product.product_id !== id))
        } 
    }

    const {categories, types} = allFilters()

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
                <React.Fragment key={index}>
                    <div className={`w-full bg-redd-500  ${edit === product.product_id && "text-neutral-500 border-none"} flex justify-center items-center divide-x bg-redd-500 border-b border-neutral-300 divide-neutral-400`}>
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
                            {edit === product.product_id && <i className="bx bx-x cursor-pointer" onClick={() => setEdit(null)}></i>}
                            {edit !== product.product_id && <i className="cursor-pointer bx bx-edit" onClick={() => setEdit(product.product_id)}></i>}
                            <i className="cursor-pointer bx bx-lock-alt"></i>
                            <i className="cursor-pointer bx bx-trash" onClick={() => hanlderDelete(product.product_id)}></i>
                        </div>
                    </div>
                    {edit === product.product_id && 
                        <div className="w-full h-[160px] flex justify-start items-center gap-x-2 border-b border-neutral-300 bg-redd-500">
                            <picture className="w-[120px] h-[120px] flex justify-center bg-redd-500 items-center">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </picture>
                            <div className="w-[300px] h-[120px] flex justify-center items-start flex-col gap-y-5 bg-blued-500">
                                <Input defaultValue={product.name} name="Nombre" placeholder="Nombre" style="p-0"/>
                                <Textarea defaultValue={product.description} name="Descripcion" placeholder="Descripcion" style="text-sm scroll" />
                            </div>
                            <div className="w-[150px] h-[100px] bg-redd-500 flex justify-center items-center flex-col gap-y-2">
                                {/* <div className="w-full flex justify-center items-center"> */}
                                    <Filters filter={categories} title="Categorias"/>
                                    <Filters filter={types} title="Tipos"/>
                                {/* </div> */}
                                {/* <div className="w-full flex justify-center items-center">
                                    <Filters filter={sizes} title="Talles"/>
                                    <Filters filter={colors} title="Colores"/>
                                </div> */}
                            </div>
                            <div className="w-[100px] flex justify-center items-center flex-col gap-y-3 bg-redd-500">
                                {product.Stocks.map(stock => (
                                    <div className="w-full h-[20px] flex justify-between items-center text-sm py-3 px-1 cursor-pointer border border-neutral-400">
                                        <div className="w-[20px] h-[20px] flex justify-center items-center rounded-full" style={{backgroundColor:stock.Color.hxacolor}}></div>
                                        <p className="">{stock.Size.size}</p>
                                        {/* <p>{stock.Color.color}</p> */}
                                        <p>x{stock.unit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </React.Fragment>
            ))}
        </section>
  )
}

export default DashboardProductsEdit