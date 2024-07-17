import useApi from "../../../hooks/useApi"
import { DataProduct } from "../../../interfaces/interfaces"
import TitleDashboard from "../../../components/TitleDashboard/TitleDashboard"
import { fetchDELETE } from "../../../utils/fetchDELETE"
import { useEffect, useState } from "react"
import React from "react"
import { fetchPATCH } from "../../../utils/fetchPATCH"
import { DashboardProductPulse } from "../../../components/ComponentsAnimatePulse/ComponentsAnimatePulse"
import hanlderDiscount from "../../../utils/handlerDiscount"
import ModalDashboardProduct from "../../../components/ModalDashboardProduct/ModalDashboardProduct"
const {VITE_URL_BASE} = import.meta.env


function DashboardProductsEdit() {
    const [dataProduct, setDataProduct] = useState<DataProduct[]>([])
    const [page, setPage] = useState(1)
    
    const { data } = useApi(`${VITE_URL_BASE}/product/paged?page=${page}`) as { data: {data: DataProduct[], existPage:boolean} }
    // const { data } = useApi(`${VITE_URL_BASE}/product/all`) as { data: DataProduct[] }
    const [edit, setEdit] = useState<string | null>(null)

    async function hanlderDelete (id:string) {
        const { error } = await fetchDELETE(`${VITE_URL_BASE}/product/delete/${id}`) as {error: boolean}
        if(!error) {
            setDataProduct(prevDataProduct => prevDataProduct.filter(product => product.product_id !== id))
        } 
    }

    async function hanlderUpdateState (id:string, available:boolean) {
        await fetchPATCH(`${VITE_URL_BASE}/product/update/${id}`, {available: !available})
    }
    // const {categories, types} = allFilters()

    useEffect(() => {
        // console.log(data);
        
        setDataProduct(data?.data)   
        // console.log(data);
    },[data])
    
    return (
    <section className="w-[95%] flex justify-center items-center flex-col bg-redd-500">
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
                    <div className={`w-full h-[70px] bg-redd-500  ${edit === product.product_id && "text-neutral-500 border-none"} flex justify-center items-center bg-redd-500 border-b border-neutral-300`}>

                        <picture className={`hidden md:flex w-[175px] h-[50px] overflow-hidden justify-center items-center mr-3 ${!product.image && "animate-pulse"} bg-redd-500`}>
                            <img src={product.image} alt="" className="w-full h-full object-cover"/>
                        </picture>
                        <h4 className="w-full max-md:hidden pl-1 text-clipping-2 text-neutral-700 text-sm font-semibold tracking-wider">{product.name}</h4>
                        <h4 className="w-1/3 max-md:hidden text-center text-neutral-700 font-semibold">{product.unit}</h4>
                        <div className="w-1/3 max-md:hidden text-center text-neutral-700 font-semibold flex flex-col">

                            <h4 className={`${product.discount && "line-through text-red-400 text-xs leading-3 order-2"}`}>$ {product.price}</h4>
                            {product.discount !== 0 && <h4 className="order-1 leading-4">$ {hanlderDiscount(product.price, product.discount)}</h4>  }

                        </div>
                        <h4 className="w-1/3 max-md:hidden text-center text-neutral-700 font-semibold">{product.discount}%</h4>
                        <h4 className="w-1/3 max-md:hidden text-center text-neutral-700 font-semibold">{product.Category.category}</h4>
                        <h4 className="w-1/3 max-md:hidden text-center text-neutral-700 font-semibold">{product.Type.type}</h4>
                        <div className="w-1/2 h-[80%] text-sm hidden md:flex justify-start items-center flex-col overflow-auto scroll gap-x-3">
                            {product.Stocks.map((stock, index) => (
                                <div key={index} className="w-full bg-redd-500 mx-auto min-h-[20px] max-h-[20px] relative flex justify-start items-center text-sm py-4 px-1">
                                            
                                            <div className="w-[20px] min-h-[20px] max-h-[20px] flex justify-center items-center rounded-full mr-1" style={{backgroundColor:stock.Color.hxacolor}}></div>
                                            <div className="flex justify-start items-start flex-col">
                                                <div className="bg-redd-500 relative flex justify-center items-center">
                                                    <p className="line-clamp-1 text-sm leading-3 font-semibold text-neutral-700">{stock.Color.color}</p>
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
                                <h3 className="text-clipping-1">{product.name}</h3>
                                <h3 className="text-center ml-auto mr-5">x{product.unit}</h3>
                            </div>
                            <div className="text-sm text-neutral-600 flex justify-start items-center gap-x-1">
                                <h4 className="text-center">{product.Category.category}</h4>
                                <h4>|</h4>
                                <h4 className="text-center">{product.Type.type}</h4>
                                <h4>|</h4>
                                <h4 className="text-center">{product.discount} %</h4>
                            </div>
                            <div className="text-start text-neutral-600 font-semibold tracking-wider flex justify-start items-center gap-x-2">
                                <h4 className={`${product.discount && "line-through text-red-400 text-xs order-2"}`}>$ {product.price}</h4>
                                {product.discount !== 0 && <h4 className="order-1">$ {hanlderDiscount(product.price, product.discount)}</h4>  }
                            </div>
                        </section>

                        {/* ------------------------------------------------------------------------------------------ */}

                        <div className="w-1/3 flex justify-center items-center gap-x-2">
                            {edit === product.product_id && <i className="bx bx-x cursor-pointer" onClick={() => {setEdit(null)}}></i>}
                            {edit !== product.product_id && <i className="cursor-pointer bx bx-edit" onClick={() => {setEdit(product.product_id)}}></i>}
                            <i className={`cursor-pointer bx ${product.available ? "bx-lock-open-alt" : "bx bxs-lock-alt"} scale-110`} onClick={() => hanlderUpdateState(product.product_id, product.available)}></i>
                            
                            <i className="cursor-pointer bx bx-trash" onClick={() => hanlderDelete(product.product_id)}></i>
                        </div>
                    </div>

                {edit === product.product_id && <ModalDashboardProduct active={edit === product.product_id} product={product} onClose={() => setEdit(null)}/>}
                    
                </React.Fragment>
            ))}
            {dataProduct && <ul className="w-full py-5 flex justify-center items-center gap-x-4 mt-auto text-neutral-800 bg-redd-500">
                <li className={`flex justify-center items-center bg-redd-500 ${page === 1 ? "pointer-events-none select-none text-neutral-500" : "cursor-pointer"}`} onClick={() => setPage(prevPage => prevPage - 1)}><i className='scale-150  bx bxs-chevron-left-circle'></i></li>
                <li className="w-5 flex justify-center items-center bg-redd-500 select-none">{page}</li>
                <li className={`flex justify-center items-center bg-redd-500 ${data?.existPage ? "cursor-pointer" : "pointer-events-none select-none text-neutral-500"}`} onClick={() => setPage(prevPage => prevPage + 1)}><i className='scale-150  bx bxs-chevron-right-circle'></i></li>
            </ul>}
            
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


































































// {edit === product.product_id && 
//     <div className={`w-full h-screen fixed top-0 left-0 flex justify-center items-center z-20 bg-[#000000ae]`}>
//         <div className="w-[90%] md:w-[1210px] h-[90vh] md:h-[570px] rounded-xl overflow-y-auto relative mx-auto flex justify-start items-center flex-col md:flex-row border-b border-neutral-300 bg-white">
//         {/* <div className="w-full min-h-[160px] flex justify-around items-center flex-col md:flex-row gap-x-2 border-b border-neutral-300 bg-red-500"> */}


//             <button className="absolute top-3 right-6 text-xl" onClick={() => setEdit(null)}><i className="bx bx-x scale-150"/></button>
            
//             <section className="py-10 w-[90%] md:w-[30%] md:py-0 md:min-h-[90%] flex justify-start items-center flex-col gap-x-2 gap-y-2 md:pt-0 bg-blued-500">

//                 <picture className="max-w-[300px] max-h-[300px] flex justify-center bg-redd-500 items-center">
//                     <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
//                 </picture>
//                 <div className="w-full min-w-[90%] md:max-w-[200px] md:w-[300px] h-[200px] flex justify-center items-start flex-col gap-y-5 bg-blued-500">
//                     <Input defaultValue={product.name} name="Nombre" placeholder="Nombre" style="p-1" onChange={(e) => setUpdateProduct({...updateProduct, name:e.target.value})}/>
//                     <Textarea defaultValue={product.description} name="Descripcion" placeholder="Descripcion" styleDimensions="w-full h-full" style="text-sm scroll" onChange={(e) => setUpdateProduct({...updateProduct, description:e.target.value})}/>
//                 </div>
//             </section>

//             <div className="w-[90%] h-auto pb-5 md:pb-0 md:w-[65%] md:min-h-[90%] flex justify-between items-center gap-y-5 md:gap-y-0 flex-col bg-greend-500">

//                 <div className="w-full md:w-full flex justify-center items-center flex-col gap-y-5 bg-redd-500">
//                     <h4 className="w-full text-xl font-semibold">DATA DE PRODUCTO</h4>
//                         <Filters select={product.Category.category} filter={categories} title="Categorias" 
//                             onClick={(value) => setUpdateProduct({...updateProduct, category:value as string})}/>
//                         <Filters select={product.Type.type} filter={types} title="Tipos"  
//                             onClick={(value) => setUpdateProduct({...updateProduct, type: value as string})}/>
//                 </div>



//                 {(!stockEdit && !createStock && !addStock) && <div className="w-full h-auto md:h-full flex justify-start items-center flex-col bg-blued-500">
//                     <h4 className="w-full text-xl font-semibold">DATA DE PRODUCTO</h4>
//                     <div className="w-full py-3 flex justify-between items-center bg-redd-500 ">
//                         <h3 className="flex justify-start items-center text-sm font-semibold tracking-wide text-neutral-600 cursor-pointer" onClick={() => setCreateStock(product.product_id)}><i className="bx bx-plus"></i> Crear Stock</h3>
//                         <h3 className="flex justify-start items-center text-sm font-semibold tracking-wide text-neutral-600 cursor-pointer" onClick={() => setAddStock(product.product_id)}><i className="bx bx-plus"></i> Agregar Stock</h3>
//                     </div>
//                     <ul className="w-full flex justify-center items-center border-b border-neutral-400 divide-x divide-neutral-400">
//                         <li className="text-xs mr-auto font-semibold text-neutral-700">Color</li>
//                         <li className="text-xs min-w-[60px] text-center font-semibold text-neutral-700 bg-redd-500">Tamaño</li>
//                         <li className="text-xs min-w-[60px] text-center mr-2  font-semibold text-neutral-700 bg-blued-500">Unidades</li>
//                     </ul>
//                     <div className="w-full min-h-[10px] flex justify-start items-start overflow-y-auto scroll divide-y divide-neutral-400 flex-col pt-2 bg-blued-500 ">
//                         {product.Stocks.map(stock => (
//                             <div key={`${stock.Size.size}-${stock.stock_id}`} onClick={() => setStockEdit(stock)} className="w-full mx-auto min-h-[20px] max-h-[20px] relative flex justify-between items-center text-sm py-4 px-1 cursor-pointer">

//                                 <div className="w-[20px] min-h-[20px] max-h-[20px] flex justify-center items-center rounded-full mr-1" style={{backgroundColor:stock.Color.hxacolor}}></div>
//                                 <div className="flex justify-start items-start flex-col">
//                                     <p className="text-sm leading-3 font-semibold text-neutral-700">{stock.Color.color}</p>
//                                     <p className="text-[11px] text-neutral-600">{stock.Color.hxacolor}</p>
//                                 </div>
//                                 <p className="min-w-[55px] text-center text-sm ml-auto bg-redd-500">{stock.Size.size}</p>
//                                 <p className="min-w-[55px] text-center bg-blued-500 text-sm">{stock.unit}</p>
//                             </div>
//                         ))}
//                     </div>
                    
//                 </div>}


//                 {(stockEdit || createStock || addStock) && <div className="w-full h-auto md:h-full flex justify-start items-center flex-col  relative bg-blued-500">
//                     <h4 className="w-full text-xl font-semibold">DATA DE PRODUCTO</h4>
//                     {/* {stockEdit} */}
//                     <div className="w-full relative">
//                         <ArrowBefore icon="bx bx-chevron-left" styleIcon="text-lg" style="w-auto h-[20px] flex justify-center items-center absolute top-0 left-0 z-10 bg-blued-500" 
//                             onClick={() => {setStockEdit(null), setCreateStock(null), setAddStock(null)}}/>
//                         <h3 className="w-full text-center text-sm bg-redd-500 ">{stockEdit ? "Editar Stock" : createStock ? "Crear Stock" : addStock ? "Agregar Stock" : ""}</h3>
//                     </div>
//                     <div className="w-full flex justify-center items-center gap-x-1 my-4">
//                         {stockEdit && <div className="min-w-[25px] min-h-[25px] border border-rose-400 rounded-full" style={{backgroundColor:stockEdit?.Color.hxacolor}}></div>}

//                         {!addStock && <Input name="Color" placeholder="Color" defaultValue={stockEdit?.Color?.color} 
//                             onChange={(e) => setUpdateStock({...updateStock, color:e.target.value})} />}
//                         {!addStock && <Input name="HxaColor" placeholder="HxaColor" defaultValue={stockEdit?.Color?.hxacolor} 
//                             onChange={(e) => setUpdateStock({...updateStock, hxacolor:e.target.value})}/>}

//                         {addStock && <Filters title="Color" select={updateStock.color} filter={filter?.colors} onClick={(value) => typeof value === "object" && setUpdateStock({...updateStock, color:value.color, hxacolor:value.hxacolor})}/>}

//                     </div>
//                     <div className="w-full flex justify-center items-center gap-x-4 my-2">
//                         <Input name="Talle" placeholder="Talle" defaultValue={createStock ? "" : stockEdit?.Size.size} 
//                             onChange={(e) => setUpdateStock({...updateStock, size:e.target.value})}/>
//                         <Input name="Unidades" placeholder="Unidades" type="number" defaultValue={createStock ? "" : stockEdit?.unit.toString()}
//                             onChange={(e) => setUpdateStock({...updateStock, unit:Number(e.target.value)})}/>
//                     </div>
//                     <div className="w-full flex justify-around items-center">
//                         {stockEdit && <button onClick={() => handlerDeleteStock(stockEdit.stock_id)}><i className="bx bx-trash"></i></button>}
//                         <button className="text-sm font-semibold tracking-wide px-2 py-1 text-white rounded-sm bg-neutral-800" 
//                             onClick={() => {
//                                 stockEdit ? handlerUpdateStock(stockEdit?.stock_id) : createStock || addStock ? handlerCreateStock(product.product_id) : null;
//                             }}>{stockEdit ? "Editar Stock" : createStock ? "Crear Stock" : addStock ? "Agregar Stock" : ""}</button>
//                         <button className="text-sm font-semibold tracking-wide px-2 py-1" onClick={() => {setStockEdit(null), setCreateStock(null), setAddStock(null)}}>Cancelar</button>
//                     </div>
//                 </div>}

//             <div className="w-full h-auto md:h-full flex justify-center items-center flex-col gap-y-5 bg-purpled-500">
//                 <h4 className="w-full text-xl font-semibold">DESCUENTOS Y PRECIO</h4>
//                 <div className="w-full flex justify-start items-center gap-x-5 bg-blued-500">
//                     <Input type="number" defaultValue={product.discount.toString()} styleDimensions="max-w-[200px]" name="Crear Descuento" onChange={(e) => setUpdateProduct({...updateProduct, discount:Number(e.target.value)})}/>
//                     <Input type="number" defaultValue={product.price.toString()} styleDimensions="max-w-[200px]" name="Precio" onChange={(e) => setUpdateProduct({...updateProduct, price:Number(e.target.value)})}/>
//                 </div>
//                 <div className="w-full flex justify-center md:justify-start items-center">
//                     <button className="px-3 py-1 font-semibold tracking-wide bg-neutral-800 text-white" onClick={() => {handlerUpdate(product.product_id); setEdit(null)}}>Editar Producto</button>
//                 </div>
//             </div>

//             </div>
                    
//         </div>
//     </div>
// }