import { useState } from "react";
import Filters from "../Filters/Filters";
import { Filters as FiltersInterface } from "../../interfaces/components"
import { DataProduct, Stock, UpdateProduct } from "../../interfaces/interfaces";
import Textarea from "../Textarea/Textarea";
import Input from "../Input/Input";
import ArrowBefore from "../ArrowBefore/ArrowBefore";
import { fetchDELETE } from "../../utils/fetchDELETE";
import { fetchPATCH } from "../../utils/fetchPATCH";
import { fetchPOST } from "../../utils/fetchPOST";
import useApi from "../../hooks/useApi";
const {VITE_URL_BASE} = import.meta.env

interface PropModalDashboardProduct {
    active:     boolean;
    onClose?:    () => void;
    product:    DataProduct;
}
function ModalDashboardProduct({active, product, onClose}: PropModalDashboardProduct) {

    
    if (!active) return;
    
    const {data: filter} = useApi(`${VITE_URL_BASE}/product/filters`) as {data:FiltersInterface}

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
    
    const [stockEdit, setStockEdit] = useState<Stock | null>(null)
    const [addStock, setAddStock] = useState<string | null>(null);
    const [createStock, setCreateStock] = useState<string | null>(null);
    const [updateStock, setUpdateStock] = useState({
        unit:0,
        color:"",
        hxacolor:"",
        size:"",
    })

    async function handlerUpdate (id:string) {
        await fetchPATCH(`${VITE_URL_BASE}/product/update/${id}`, updateProduct)
        {(updateProduct.discount || updateProduct?.discount === 0) && updateProduct?.discount >= 0 && await fetchPATCH(`${VITE_URL_BASE}/product/${id}/discount`, {discount: updateProduct?.discount})}
        setUpdateProduct({...updateProduct, id: id})
    }

    async function handlerCreateStock (id:string) {
        await fetchPOST(`${VITE_URL_BASE}/product/create/stock/${id}`, {unit:updateStock.unit, color:updateStock.color, hxaColor:updateStock.hxacolor, size:updateStock.size})
    }

    async function handlerDeleteStock(id:string) {
        await fetchDELETE(`${VITE_URL_BASE}/stock/delete/${id}`)
    }

    async function handlerUpdateStock(id:string) {
        await fetchPATCH(`${VITE_URL_BASE}/product/update/stock/${id}`, updateStock)
    }

  return (
    <div className={`w-full h-screen fixed top-0 left-0 flex justify-center items-center z-20 bg-[#000000ae]`}>
        <div className="w-[90%] md:w-[1210px] h-[90vh] md:h-[570px] rounded-xl overflow-y-auto relative mx-auto flex justify-start items-center flex-col md:flex-row border-b border-neutral-300 bg-white">
        {/* <div className="w-full min-h-[160px] flex justify-around items-center flex-col md:flex-row gap-x-2 border-b border-neutral-300 bg-red-500"> */}
            <button className="absolute top-3 right-6 text-xl" onClick={onClose}><i className="bx bx-x scale-150"/></button>
            
            <section className="py-10 w-[90%] md:w-[30%] md:py-0 md:min-h-[90%] flex justify-start items-center flex-col gap-x-2 gap-y-2 md:pt-0 bg-blued-500">
                <picture className="max-w-[300px] max-h-[300px] flex justify-center bg-redd-500 items-center">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </picture>
                <div className="w-full min-w-[90%] md:max-w-[200px] md:w-[300px] h-[200px] flex justify-center items-start flex-col gap-y-5 bg-blued-500">
                    <Input defaultValue={product.name} name="Nombre" placeholder="Nombre" style="p-1" onChange={(e) => setUpdateProduct({...updateProduct, name:e.target.value})}/>
                    <Textarea defaultValue={product.description} name="Descripcion" placeholder="Descripcion" styleDimensions="w-full h-full" style="text-sm scroll" onChange={(e) => setUpdateProduct({...updateProduct, description:e.target.value})}/>
                </div>
            </section>
            <div className="w-[90%] h-auto pb-5 md:pb-0 md:w-[65%] md:min-h-[90%] flex justify-between items-center gap-y-5 md:gap-y-0 flex-col bg-greend-500">
                <div className="w-full md:w-full flex justify-center items-center flex-col gap-y-5 bg-redd-500">
                    <h4 className="w-full text-xl font-semibold">DATA DE PRODUCTO</h4>
                        {/* <Filters select={product.Category.category} filter={categories} title="Categorias" 
                            onClick={(value) => setUpdateProduct({...updateProduct, category:value as string})}/>
                        <Filters select={product.Type.type} filter={types} title="Tipos"  
                            onClick={(value) => setUpdateProduct({...updateProduct, type: value as string})}/> */}
                </div>
                {(!stockEdit && !createStock && !addStock) && <div className="w-full h-auto md:h-full flex justify-start items-center flex-col bg-blued-500">
                    <h4 className="w-full text-xl font-semibold">DATA DE PRODUCTO</h4>
                    <div className="w-full py-3 flex justify-between items-center bg-redd-500 ">
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
                {(stockEdit || createStock || addStock) && <div className="w-full h-auto md:h-full flex justify-start items-center flex-col  relative bg-blued-500">
                    <h4 className="w-full text-xl font-semibold">DATA DE PRODUCTO</h4>
                    {/* {stockEdit} */}
                    <div className="w-full relative">
                        <ArrowBefore icon="bx bx-chevron-left" styleIcon="text-lg" style="w-auto h-[20px] flex justify-center items-center absolute top-0 left-0 z-10 bg-blued-500" 
                            onClick={() => {setStockEdit(null), setCreateStock(null), setAddStock(null)}}/>
                        <h3 className="w-full text-center text-sm bg-redd-500 ">{stockEdit ? "Editar Stock" : createStock ? "Crear Stock" : addStock ? "Agregar Stock" : ""}</h3>
                    </div>
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
            <div className="w-full h-auto md:h-full flex justify-center items-center flex-col gap-y-5 bg-purpled-500">
                <h4 className="w-full text-xl font-semibold">DESCUENTOS Y PRECIO</h4>
                <div className="w-full flex justify-start items-center gap-x-5 bg-blued-500">
                    <Input type="number" defaultValue={product.discount.toString()} styleDimensions="max-w-[200px]" name="Crear Descuento" onChange={(e) => setUpdateProduct({...updateProduct, discount:Number(e.target.value)})}/>
                    <Input type="number" defaultValue={product.price.toString()} styleDimensions="max-w-[200px]" name="Precio" onChange={(e) => setUpdateProduct({...updateProduct, price:Number(e.target.value)})}/>
                </div>
                <div className="w-full flex justify-center md:justify-start items-center">
                    <button className="px-3 py-1 font-semibold tracking-wide bg-neutral-800 text-white" onClick={() => {handlerUpdate(product.product_id); onClose}}>Editar Producto</button>
                </div>
            </div>
            </div>
                    
        </div>
    </div>
  )
}

export default ModalDashboardProduct