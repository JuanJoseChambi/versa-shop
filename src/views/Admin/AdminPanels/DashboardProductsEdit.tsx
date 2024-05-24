import useApi from "../../../hooks/useApi"
import { DataProduct, Stock, UpdateProduct } from "../../../interfaces/interfaces"
import TitleDashboard from "../../../components/TitleDashboard/TitleDashboard"
import { fetchDELETE } from "../../../utils/fetchDELETE"
import { useEffect, useState } from "react"
import React from "react"
import Input from "../../../components/Input/Input"
import Textarea from "../../../components/Textarea/Textarea"
import { allFilters } from "../../../utils/allFilters"
import Filters from "../../../components/Filters/Filters"
import ArrowBefore from "../../../components/ArrowBefore/ArrowBefore"
import { fetchPATCH } from "../../../utils/fetchPATCH"
import { fetchPOST } from "../../../utils/fetchPOST"
const {VITE_URL_BASE} = import.meta.env

function DashboardProductsEdit() {
    const [dataProduct, setDataProduct] = useState<DataProduct[]>([])
    
    const { data } = useApi(`${VITE_URL_BASE}/product/all`) as { data: DataProduct[] }
    const [edit, setEdit] = useState<string | null>(null)
    const [stockEdit, setStockEdit] = useState<Stock | null>(null)

    async function hanlderDelete (id:string) {
        const { error } = await fetchDELETE(`${VITE_URL_BASE}/product/delete/${id}`) as {error: boolean}
        if(!error) {
            setDataProduct(prevDataProduct => prevDataProduct.filter(product => product.product_id !== id))
        } 
    }

    const [updateProduct, setUpdateProduct] = useState<UpdateProduct>({
        id:"",
        name:"", 
        description:"", 
        price:0, 
        category:"", 
        type:""
    })
    const [addStock, setAddStock] = useState<string | null>(null);
    const [createStock, setCreateStock] = useState<string | null>(null);
    const [updateStock, setUpdateStock] = useState({
        unit:0,
        color:"",
        hxacolor:"",
        size:"",
    })

    async function handlerUpdateStock(id:string) {
        const {error} = await fetchPATCH(`${VITE_URL_BASE}/product/update/stock/${id}`, updateStock)
        console.log(error);
    }

    async function handlerCreateStock (id:string) {
        await fetchPOST(`${VITE_URL_BASE}/product/create/stock/${id}`, {unit:updateStock.unit, color:updateStock.color, hxaColor:updateStock.hxacolor, size:updateStock.size})
    }
 
    async function handlerUpdate (id:string) {
        
        await fetchPATCH(`${VITE_URL_BASE}/product/update/${id}`, updateProduct)
        setUpdateProduct({...updateProduct, id: id})
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
                        <h3 className="w-full pl-1">{updateProduct.id === product.product_id && updateProduct.name ? updateProduct.name :product.name}</h3>
                        <h4 className="w-1/3 text-center">{product.unit}</h4>
                        <h3 className="w-1/3 text-center">$ {updateProduct.id === product.product_id && updateProduct.price ? updateProduct.price: product.price}</h3>
                        <h4 className="w-1/3 text-center">{updateProduct.id === product.product_id && updateProduct.category ? updateProduct.category: product.Category.category}</h4>
                        <h3 className="w-1/3 text-center">{updateProduct.id === product.product_id && updateProduct.type ? updateProduct.type: product.Type.type}</h3>
                        <div className="w-1/2 text-sm flex justify-center items-center flex-col gap-x-3">{product.Stocks.map((stock, index) => (<h3 key={index}>{stock.Size.size} : {stock.Color.color}: {stock.unit}</h3>))}</div>
                        <div className="w-1/3 flex justify-center items-center gap-x-2">
                            {edit === product.product_id && <i className="bx bx-x cursor-pointer" onClick={() => {setEdit(null), setStockEdit(null)}}></i>}
                            {edit !== product.product_id && <i className="cursor-pointer bx bx-edit" onClick={() => {setEdit(product.product_id), setStockEdit(null)}}></i>}
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
                                <Input defaultValue={product.name} name="Nombre" placeholder="Nombre" style="p-0" onChange={(e) => setUpdateProduct({...updateProduct, name:e.target.value})}/>
                                <Textarea defaultValue={product.description} name="Descripcion" placeholder="Descripcion" style="text-sm scroll" onChange={(e) => setUpdateProduct({...updateProduct, description:e.target.value})}/>
                            </div>
                            <div className="w-[150px] h-[100px] bg-redd-500 flex justify-center items-center flex-col gap-y-2">
                                    <Filters select={product.Category.category} filter={categories} title="Categorias" 
                                        onClick={(value) => setUpdateProduct({...updateProduct, category:value as string})}/>
                                    <Filters select={product.Type.type} filter={types} title="Tipos"  
                                        onClick={(value) => setUpdateProduct({...updateProduct, type: value as string})}/>
                            </div>


                            {(!stockEdit && !createStock) && <div className="w-[250px] h-full flex justify-center items-center flex-col bg-redd-500">
                                <div className="w-full flex justify-between items-center bg-redd-500 ">
                                    <h3 className="flex justify-start items-center text-sm font-semibold tracking-wide text-neutral-600 cursor-pointer" onClick={() => setCreateStock(product.product_id)}><i className="bx bx-plus"></i> Crear Stock</h3>
                                    <h3 className="flex justify-start items-center text-sm font-semibold tracking-wide text-neutral-600 cursor-pointer"><i className="bx bx-plus"></i> Agregar Stock</h3>
                                </div>
                                <div className="w-full h-full flex justify-start items-start flex-wrap overflow-y-auto bg-blue-500 ">
                                    {product.Stocks.map(stock => (
                                        <div key={stock.Size.size} onClick={() => setStockEdit(stock)} className="min-w-[60px] h-[20px] relative flex justify-between items-center text-sm py-3 px-1 cursor-pointer border border-neutral-400">
                                            <div className="w-[20px] h-[20px] flex justify-center items-center rounded-full" style={{backgroundColor:stock.Color.hxacolor}}></div>
                                            <p className="text-sm">{stock.Size.size}</p>
                                            <p className="min-w-[15px] h-[15px] p-1 flex justify-center items-center rounded-full absolute -top-2 -left-2 text-xs bg-white border border-neutral-800">{stock.unit}</p>
                                        </div>
                                    ))}
                                </div>
                                
                            </div>}
                            {(stockEdit || createStock) && <div className="w-[250px] h-full flex justify-start items-center flex-col  relative bg-blued-500">
                                {/* {stockEdit} */}
                                <ArrowBefore icon="bx bx-chevron-left" styleIcon="text-lg" style="w-auto h-[20px] flex justify-center items-center absolute top-0 left-0 z-10 bg-blued-500" 
                                    onClick={() => {setStockEdit(null), setCreateStock(null), setAddStock(null)}}/>
                                <h3 className="w-full text-center text-sm bg-redd-500 ">{stockEdit ? "Editar Stock" : "Crear Stock"}</h3>
                                <div className="w-full flex justify-center items-center gap-x-1 my-4">
                                    {stockEdit && <div className="min-w-[25px] min-h-[25px] border border-rose-400 rounded-full" style={{backgroundColor:stockEdit?.Color.hxacolor}}></div>}
                                    <Input name="Color" placeholder="Color" defaultValue={stockEdit?.Color?.color} 
                                        onChange={(e) => setUpdateStock({...updateStock, color:e.target.value})} />
                                    <Input name="HxaColor" placeholder="HxaColor" defaultValue={stockEdit?.Color?.hxacolor} 
                                        onChange={(e) => setUpdateStock({...updateStock, hxacolor:e.target.value})}/>
                                </div>
                                <div className="w-full flex justify-center items-center gap-x-4 my-2">
                                    <Input name="Talle" placeholder="Talle" defaultValue={createStock ? "" : stockEdit?.Size.size} 
                                        onChange={(e) => setUpdateStock({...updateStock, size:e.target.value})}/>
                                    <Input name="Unidades" placeholder="Unidades" type="number" defaultValue={createStock ? "" : stockEdit?.unit.toString()}
                                        onChange={(e) => setUpdateStock({...updateStock, unit:Number(e.target.value)})}/>
                                </div>
                                <div className="w-full flex justify-around items-center">
                                    <button className="text-sm font-semibold tracking-wide px-2 py-1 text-white rounded-sm bg-neutral-800" 
                                        onClick={() => {
                                            stockEdit ? handlerUpdateStock(stockEdit?.stock_id) : handlerCreateStock(product.product_id)
                                        }}>{stockEdit ? "Editar Stock" : "Crear Stock"}</button>
                                    <button className="text-sm font-semibold tracking-wide px-2 py-1" onClick={() => {setStockEdit(null), setCreateStock(null), setAddStock(null)}}>Cancelar</button>
                                </div>
                            </div>}


                            <div className="w-[200px] h-full flex justify-center items-center flex-col bg-redd-500">
                                <div className="my-4 flex justify-center items-center bg-blued-500">
                                    <Input type="number" defaultValue={product.price.toString()} styleDimensions="w-[80%]" name="Precio" onChange={(e) => setUpdateProduct({...updateProduct, price:Number(e.target.value)})}/>
                                </div>
                                <div className="w-full flex justify-center items-center">
                                    <button className="px-3 py-1 font-semibold tracking-wide bg-neutral-800 text-white" onClick={() => {handlerUpdate(product.product_id), setEdit(null)}}>Editar Producto</button>
                                </div>
                            </div>
                        </div>
                    }
                </React.Fragment>
            ))}
        </section>
  )
}

export default DashboardProductsEdit