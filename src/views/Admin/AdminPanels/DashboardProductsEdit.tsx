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
import { DashboardProductPulse } from "../../../components/ComponentsAnimatePulse/ComponentsAnimatePulse"
import { Filters as FiltersInterface } from "../../../interfaces/components"
import hanlderDiscount from "../../../utils/handlerDiscount"
const {VITE_URL_BASE} = import.meta.env


function DashboardProductsEdit() {
    const [dataProduct, setDataProduct] = useState<DataProduct[]>([])
    
    const {data: filter} = useApi(`${VITE_URL_BASE}/product/filters`) as {data:FiltersInterface}
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
        // available:,
        type:"",
        discount:null
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
        await fetchPATCH(`${VITE_URL_BASE}/product/update/stock/${id}`, updateStock)
    }

    async function handlerCreateStock (id:string) {
        await fetchPOST(`${VITE_URL_BASE}/product/create/stock/${id}`, {unit:updateStock.unit, color:updateStock.color, hxaColor:updateStock.hxacolor, size:updateStock.size})
    }
 
    async function handlerUpdate (id:string) {
        await fetchPATCH(`${VITE_URL_BASE}/product/update/${id}`, updateProduct)
        {(updateProduct.discount || updateProduct?.discount === 0) && updateProduct?.discount >= 0 && await fetchPATCH(`${VITE_URL_BASE}/product/${id}/discount`, {discount: updateProduct?.discount})}
        setUpdateProduct({...updateProduct, id: id})
    }
    async function hanlderUpdateState (id:string, available:boolean) {
        await fetchPATCH(`${VITE_URL_BASE}/product/update/${id}`, {available: !available})
    }

    async function handlerDeleteStock(id:string) {
        await fetchDELETE(`${VITE_URL_BASE}/stock/delete/${id}`)
    }

    const {categories, types} = allFilters()

    useEffect(() => {
        setDataProduct(data)   
        // console.log(data);
    },[data])
    
    return (
    <section className="w-[95%] flex justify-center items-center flex-col bg-blued-500">
            <h3 className="w-full text-start text-2xl font-semibold text-neutral-800 tracking-widest">STOCK</h3>
            <div className="w-full flex justify-center items-center">
                <TitleDashboard titles={[
                    {text:"Imagen", width:"w-[175px] flex justify-center items-center mr-3"},
                    {text:"Nombre", width:"w-full"},
                    {text:"Unidades", width:"w-1/3"},
                    {text:"Precio", width:"w-1/3"},
                    {text:"Descuento", width:"w-1/3"},
                    {text:"Categoria", width:"w-1/3"},
                    {text:"Tipo", width:"w-1/3"},
                    {text:"Stocks", width:"w-1/2"},
                    {text:"Opciones", width:"w-1/3"},

                ]}/>
            </div>
            {dataProduct?.map((product, index) => (
                <React.Fragment key={index}>
                    <div className={`w-full h-[70px] bg-redd-500  ${edit === product.product_id && "text-neutral-500 border-none"} flex justify-center items-center bg-redd-500 border-b border-neutral-300 `}>

                        <picture className={`hidden md:flex w-[175px] h-[50px] overflow-hidden justify-center items-center mr-3 ${!product.image && "animate-pulse"} bg-redd-500`}>
                            <img src={product.image} alt="" className="w-full h-full object-cover"/>
                        </picture>
                        <h4 className="w-full max-md:hidden pl-1 text-clipping-2 text-neutral-700 text-sm font-semibold tracking-wider">{updateProduct.id === product.product_id && updateProduct.name ? updateProduct.name :product.name}</h4>
                        <h4 className="w-1/3 max-md:hidden text-center text-neutral-700 font-semibold">{product.unit}</h4>
                        <div className="w-1/3 max-md:hidden text-center text-neutral-700 font-semibold flex flex-col">
                            <h4 className={`${product.discount && "line-through text-red-400 text-sm order-2"}`}>$ {updateProduct.id === product.product_id && updateProduct.price ? updateProduct.price: product.price}</h4>
                            {product.discount !== 0 && <h4 className="order-1">$ {hanlderDiscount(product.price, product.discount)}</h4>  }
                        </div>
                        <h4 className="w-1/3 max-md:hidden text-center text-neutral-700 font-semibold">{updateProduct.id === product.product_id && updateProduct.discount ? updateProduct.discount: product.discount}%</h4>
                        <h4 className="w-1/3 max-md:hidden text-center text-neutral-700 font-semibold">{updateProduct.id === product.product_id && updateProduct.category ? updateProduct.category: product.Category.category}</h4>
                        <h4 className="w-1/3 max-md:hidden text-center text-neutral-700 font-semibold">{updateProduct.id === product.product_id && updateProduct.type ? updateProduct.type: product.Type.type}</h4>
                        <div className="w-1/2 h-full text-sm hidden md:flex justify-start items-center flex-col overflow-auto scroll gap-x-3">
                            {product.Stocks.map((stock, index) => (
                                // <h3 key={index}>{stock.Size.size} : {stock.Color.color}: {stock.unit}</h3>
                                <div key={index} onClick={() => setStockEdit(stock)} className="w-full mx-auto min-h-[20px] max-h-[20px] relative flex justify-start items-center text-sm py-4 px-1">
                                            
                                            <div className="w-[20px] min-h-[20px] max-h-[20px] flex justify-center items-center rounded-full mr-1" style={{backgroundColor:stock.Color.hxacolor}}></div>
                                            <div className="flex justify-start items-start flex-col">
                                                <div className="bg-redd-500 relative flex justify-center items-center">
                                                    <p className="line-clamp-1 text-sm text-nowrap leading-3 font-semibold text-neutral-700">{stock.Color.color}</p>
                                                    <p className="text-[11px] leading-3 font-semibold text-neutral-700 ml-2">{stock.Size.size}</p>
                                                </div>
                                                <p className="text-[11px] text-neutral-600">{stock.Color.hxacolor}</p>
                                            </div>
                                            <p className="text-center ml-auto bg-blued-500 text-sm">{stock.unit}</p>
                                        </div>
                            ))}
                        </div>
                        
                        {/* View Mobile --------------------------------------------------------------------------- */}
                        <picture className="hidden max-md:flex min-w-[70px] h-[70px] object-cover">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
                        </picture>

                        <section className="w-full md:hidden pl-1 ">
                            <div className="w-full flex justify-start items-center text-neutral-800 font-bold tracking-wider">
                                <h3 className="text-clipping-1">{updateProduct.id === product.product_id && updateProduct.name ? updateProduct.name :product.name}</h3>
                                <h3 className="text-center ml-auto mr-5">x{product.unit}</h3>
                            </div>
                            <div className="text-sm text-neutral-600 flex justify-start items-center gap-x-1">
                                <h4 className="text-center">{updateProduct.id === product.product_id && updateProduct.category ? updateProduct.category: product.Category.category}</h4>
                                <h4>|</h4>
                                <h4 className="text-center">{updateProduct.id === product.product_id && updateProduct.type ? updateProduct.type: product.Type.type}</h4>
                                <h4>|</h4>
                                <h4 className="text-center">{updateProduct.id === product.product_id && updateProduct.discount ? updateProduct.discount: product.discount} %</h4>
                            </div>
                            <div className="text-start text-neutral-600 font-semibold tracking-wider flex justify-start items-center gap-x-2">
                                <h4 className={`${product.discount && "line-through text-red-400 text-xs order-2"}`}>$ {updateProduct.id === product.product_id && updateProduct.price ? updateProduct.price: product.price}</h4>
                                {product.discount !== 0 && <h4 className="order-1">$ {hanlderDiscount(product.price, product.discount)}</h4>  }
                            </div>
                        </section>

                        {/* <section className="min-w-[110px] h-full bg-redd-500 overflow-y-auto flex md:hidden justify-start items-start flex-col">
                            {product.Stocks.map((stock, index) => (
                                <div key={index} onClick={() => setStockEdit(stock)} className="w-full mx-auto min-h-[20px] max-h-[20px] relative flex justify-start items-center text-sm py-4 px-1">
                                            
                                            <div className="min-w-[20px] min-h-[20px] max-h-[20px] flex justify-center items-center rounded-full mr-1" style={{backgroundColor:stock.Color.hxacolor}}></div>
                                            <div className="flex justify-start items-start flex-col">
                                                <div className="bg-redd-500 relative flex justify-center items-center">
                                                    <p className="text-xs leading-3 font-semibold text-neutral-700">{stock.Color.color}</p>
                                                    <p className="text-[11px] leading-3 font-semibold text-neutral-800 ml-1">{stock.Size.size}</p>
                                                </div>
                                                <p className="text-[11px] text-neutral-600">{stock.Color.hxacolor}</p>
                                            </div>
                                            <p className="text-center ml-auto bg-blued-500 text-sm">{stock.unit}</p>
                                        </div>
                            ))}
                        </section> */}
                        
                        {/* ------------------------------------------------------------------------------------------ */}

                        <div className="w-1/3 flex justify-center items-center gap-x-2">
                            {edit === product.product_id && <i className="bx bx-x cursor-pointer" onClick={() => {setEdit(null), setStockEdit(null)}}></i>}
                            {edit !== product.product_id && <i className="cursor-pointer bx bx-edit" onClick={() => {setEdit(product.product_id), setStockEdit(null)}}></i>}
                            {product.available && <i className="cursor-pointer bx bx-lock-open-alt scale-110" onClick={() => hanlderUpdateState(product.product_id, product.available)}></i>}
                            {!product.available && <i className="cursor-pointer bx bxs-lock-alt scale-110" onClick={() => hanlderUpdateState(product.product_id, product.available)}></i>}
                            <i className="cursor-pointer bx bx-trash" onClick={() => hanlderDelete(product.product_id)}></i>
                        </div>
                    </div>


                    {edit === product.product_id && 
                        <div className="w-full min-h-[160px] flex justify-around items-center flex-col md:flex-row gap-x-2 border-b border-neutral-300 bg-redd-500">
                            <section className="flex justify-center items-center flex-row gap-x-2 mt-5 md:pt0">

                                <picture className="w-[120px] h-[120px] flex justify-center bg-redd-500 items-center">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                </picture>
                                <div className="min-w-[200px] md:w-[300px] h-[120px] flex justify-center items-start flex-col gap-y-5 bg-blued-500">
                                    <Input defaultValue={product.name} name="Nombre" placeholder="Nombre" style="p-0" onChange={(e) => setUpdateProduct({...updateProduct, name:e.target.value})}/>
                                    <Textarea defaultValue={product.description} name="Descripcion" placeholder="Descripcion" style="text-sm scroll" onChange={(e) => setUpdateProduct({...updateProduct, description:e.target.value})}/>
                                </div>
                            </section>
                            <div className="w-[90%] md:w-[150px] min-h-[50px] my-6 md:mt-0 bg-redd-500 flex justify-center items-start flex-row md:flex-col gap-y-2">
                                    <Filters select={product.Category.category} filter={categories} title="Categorias" 
                                        onClick={(value) => setUpdateProduct({...updateProduct, category:value as string})}/>
                                    <Filters select={product.Type.type} filter={types} title="Tipos"  
                                        onClick={(value) => setUpdateProduct({...updateProduct, type: value as string})}/>
                            </div>


                            {(!stockEdit && !createStock && !addStock) && <div className="w-[250px] h-full flex justify-start items-center flex-col bg-redd-500">
                                <div className="w-full flex justify-between items-center bg-redd-500 ">
                                    <h3 className="flex justify-start items-center text-sm font-semibold tracking-wide text-neutral-600 cursor-pointer" onClick={() => setCreateStock(product.product_id)}><i className="bx bx-plus"></i> Crear Stock</h3>
                                    <h3 className="flex justify-start items-center text-sm font-semibold tracking-wide text-neutral-600 cursor-pointer" onClick={() => setAddStock(product.product_id)}><i className="bx bx-plus"></i> Agregar Stock</h3>
                                </div>
                                <ul className="w-full flex justify-center items-center border-b border-neutral-400 divide-x divide-neutral-400">
                                    <li className="text-xs mr-auto font-semibold text-neutral-700">Color</li>
                                    <li className="text-xs min-w-[60px] text-center font-semibold text-neutral-700 bg-redd-500">Tamaño</li>
                                    <li className="text-xs min-w-[60px] text-center mr-2  font-semibold text-neutral-700 bg-blued-500">Unidades</li>
                                </ul>
                                <div className="w-full min-h-[10px] flex justify-start items-start overflow-y-auto scroll divide-y divide-neutral-400 flex-col pt-2 bg-blued-500 ">
                                    {product.Stocks.map(stock => (
                                        <div key={`${stock.Size.size}-${stock.stock_id}`} onClick={() => setStockEdit(stock)} className="w-full mx-auto min-h-[20px] max-h-[20px] relative flex justify-between items-center text-sm py-4 px-1 cursor-pointer">
                                            
                                            <div className="w-[20px] min-h-[20px] max-h-[20px] flex justify-center items-center rounded-full mr-1" style={{backgroundColor:stock.Color.hxacolor}}></div>
                                            <div className="flex justify-start items-start flex-col">
                                                <p className="text-sm leading-3 font-semibold text-neutral-700">{stock.Color.color}</p>
                                                <p className="text-[11px] text-neutral-600">{stock.Color.hxacolor}</p>
                                            </div>
                                            <p className="min-w-[55px] text-center text-sm ml-auto bg-redd-500">{stock.Size.size}</p>
                                            <p className="min-w-[55px] text-center bg-blued-500 text-sm">{stock.unit}</p>
                                        </div>
                                    ))}
                                </div>
                                
                            </div>}
                            {(stockEdit || createStock || addStock) && <div className="w-[250px] h-full flex justify-start items-center flex-col  relative bg-blued-500">
                                {/* {stockEdit} */}
                                <ArrowBefore icon="bx bx-chevron-left" styleIcon="text-lg" style="w-auto h-[20px] flex justify-center items-center absolute top-0 left-0 z-10 bg-blued-500" 
                                    onClick={() => {setStockEdit(null), setCreateStock(null), setAddStock(null)}}/>
                                <h3 className="w-full text-center text-sm bg-redd-500 ">{stockEdit ? "Editar Stock" : createStock ? "Crear Stock" : addStock ? "Agregar Stock" : ""}</h3>
                                <div className="w-full flex justify-center items-center gap-x-1 my-4">
                                    {stockEdit && <div className="min-w-[25px] min-h-[25px] border border-rose-400 rounded-full" style={{backgroundColor:stockEdit?.Color.hxacolor}}></div>}
                                    
                                    {!addStock && <Input name="Color" placeholder="Color" defaultValue={stockEdit?.Color?.color} 
                                        onChange={(e) => setUpdateStock({...updateStock, color:e.target.value})} />}
                                    {!addStock && <Input name="HxaColor" placeholder="HxaColor" defaultValue={stockEdit?.Color?.hxacolor} 
                                        onChange={(e) => setUpdateStock({...updateStock, hxacolor:e.target.value})}/>}

                                    {addStock && <Filters title="Color" select={updateStock.color} filter={filter?.colors} onClick={(value) => typeof value === "object" && setUpdateStock({...updateStock, color:value.color, hxacolor:value.hxacolor})}/>}
                                
                                </div>
                                <div className="w-full flex justify-center items-center gap-x-4 my-2">
                                    <Input name="Talle" placeholder="Talle" defaultValue={createStock ? "" : stockEdit?.Size.size} 
                                        onChange={(e) => setUpdateStock({...updateStock, size:e.target.value})}/>
                                    <Input name="Unidades" placeholder="Unidades" type="number" defaultValue={createStock ? "" : stockEdit?.unit.toString()}
                                        onChange={(e) => setUpdateStock({...updateStock, unit:Number(e.target.value)})}/>
                                </div>
                                <div className="w-full flex justify-around items-center">
                                    {stockEdit && <button onClick={() => handlerDeleteStock(stockEdit.stock_id)}><i className="bx bx-trash"></i></button>}
                                    <button className="text-sm font-semibold tracking-wide px-2 py-1 text-white rounded-sm bg-neutral-800" 
                                        onClick={() => {
                                            stockEdit ? handlerUpdateStock(stockEdit?.stock_id) : createStock || addStock ? handlerCreateStock(product.product_id) : null;
                                        }}>{stockEdit ? "Editar Stock" : createStock ? "Crear Stock" : addStock ? "Agregar Stock" : ""}</button>
                                    <button className="text-sm font-semibold tracking-wide px-2 py-1" onClick={() => {setStockEdit(null), setCreateStock(null), setAddStock(null)}}>Cancelar</button>
                                </div>
                            </div>}


                            <div className="w-[200px] h-full mt-3 md:mt-0 flex justify-center items-center flex-col bg-redd-500">
                                <div className="my-4 flex justify-center items-center flex-col gap-y-5 bg-blued-500">
                                    <Input type="number" defaultValue={product.discount.toString()} styleDimensions="w-[80%]" name="Crear Descuento" onChange={(e) => setUpdateProduct({...updateProduct, discount:Number(e.target.value)})}/>
                                    <Input type="number" defaultValue={product.price.toString()} styleDimensions="w-[80%]" name="Precio" onChange={(e) => setUpdateProduct({...updateProduct, price:Number(e.target.value)})}/>
                                </div>
                                <div className="w-full flex justify-center items-center">
                                    <button className="px-3 py-1 font-semibold tracking-wide bg-neutral-800 text-white" onClick={() => {handlerUpdate(product.product_id); setEdit(null)}}>Editar Producto</button>
                                </div>
                            </div>
                        </div>
                    }
                </React.Fragment>
            ))}
            
            <DashboardProductPulse active={!dataProduct}/>
            <DashboardProductPulse active={!dataProduct}/>
            {dataProduct?.length === 0 && (
                <div className="w-area h-[90vh] md:h-[80vh] relative py-10 flex justify-center items-center flex-col bg-redd-500">
                    <h3 className=" font-bold text-2xl tracking-widest text-neutral-800">NO HAY STOCKS</h3>
                    <p className="text-sm text-neutral-600 font-semibold">Añada productos al Stock</p>
                    <div className="w-[30%] h-[1px] absolute bottom-3 flex justify-center items-center bg-neutral-500">
                        <h3 className="text-xl px-1 font-semibold font-noto bg-white">Versa</h3>
                    </div>
                </div>
            )}
        </section>
  )
}

export default DashboardProductsEdit