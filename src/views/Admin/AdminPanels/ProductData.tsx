import React, { useState } from "react"
// import { useFilter } from "../../../hooks/useFilter"
import { fetchPOST } from "../../../utils/fetchPOST";
import { allFilters } from "../../../utils/allFilters";
import { fetchDELETE } from "../../../utils/fetchDELETE";
const {VITE_URL_BASE} = import.meta.env

interface DataProp {
    data: string;
    title:string;
    state: any;
    filter: string[] | {color:string, hxacolor:string}[];
    change?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClickAdd?: () => void;
    onClickDelete?:(data:string, param:string) => void
}

function Data ({filter, title, data, state, change, onClickAdd, onClickDelete}: DataProp) {
    const [open, setOpen] = useState<string | null>(null)
    const [add, setAdd] = useState<string | null>(null)
    const [deleted, setDeleted] = useState<string | null>(null)

    return (
        <section className="w-full px-3 ">
            <div className="w-full cursor-pointer flex justify-between items-center" >                   
                <h3 className="w-full py-5 text-lg text-neutral-800 font-semibold bg-redd-500" onClick={() => {open && open === data ? (setAdd(null), setOpen(null), setDeleted(null)) : setOpen(data)}}>{title}</h3>
                <div className="flex justify-center items-center gap-x-3">
                    {open && open === data && <i className="bx bx-plus scale-125" onClick={() => {add ? setAdd(null) : setAdd(data)}}/>}
                    {open && open === data && <i className="bx bx-edit scale-110"/>}
                    {open && open === data && <i className="bx bx-trash scale-110" onClick={() => deleted ? setDeleted(null) : setDeleted(data)}/>}
                    
                    <i className={`${open === data ? "bx bx-chevron-up" : "bx bx-chevron-down"} scale-150`}/>
                </div>
            </div>
            <ul hidden={open !== data} className={`${open === data && "flex justify-center items-start flex-col"} px-3 pb-4 gap-5 text-sm text-neutral-700 font-semibold`}>
                {add === data && <div className="w-full flex justify-start items-center gap-x-3">
                    <input hidden={add !== data} 
                        type="text" 
                        placeholder="Dato a Añadir" 
                        className="outline-none border-b border-neutral-400 py-1" 
                        onChange={change}/>
                    <i hidden={!state} className="bx bx-check scale-150 cursor-pointer" onClick={onClickAdd}/>
                </div>}
                {!filter && 
                <div className="w-full flex justify-center items-center flex-col gap-y-2">
                    <div className="w-[20px] h-[20px] animate-spin rounded-full border-2 border-b border-l border-neutral-600"></div>
                    <h3>Cargando Datos</h3>
                </div>}
                {filter?.length === 0 && 
                <div className="w-full flex justify-center items-center">
                    <h3>No se encontraron Datos de este Producto</h3>
                </div>}
                {filter?.map((value, index) => (
                    <React.Fragment key={index}>
                        <li className="flex justify-center items-center gap-x-2">
                            {typeof value === "object" && value?.hxacolor && <span className="w-[20px] h-[20px] rounded-full border border-neutral-600" style={{backgroundColor:value.hxacolor}}></span>}
                            {typeof value === "string" ? value : value?.color}
                            {deleted && <i className="bx bx-trash scale-110 cursor-pointer" onClick={() => onClickDelete && onClickDelete(data, value.toString())}/>}
                        </li>
                    </React.Fragment>    
                ))}
            </ul>
        </section>
    )
}


interface DataSend {
    category?:undefined | string;
    type?:undefined | string;
    color?:undefined | string;
    size?:undefined | string;
}
function ProductData() {
    const [dataSend, setDataSend] = useState<DataSend>({
        category:undefined,
        type:undefined,
        color:undefined,
        size:undefined
    })

    const {categories, colors, sizes, types} = allFilters()

    async function createData (data:string, body:DataSend) {
        await fetchPOST(`${VITE_URL_BASE}/${data}/create`, body)
    }

    async function deleteData (data:string, param:string) {
        await fetchDELETE(`${VITE_URL_BASE}/${data}/delete/${param}`)
    }

  return (
    <section className="w-[95%] flex justify-center items-center flex-col flex-wrap bg-redd-500 gap-3">
        <h3 className="w-full text-start text-2xl font-semibold text-neutral-800 tracking-widest">DATOS PRODUCTO</h3>
        <p className="w-full flex justify-start items-center gap-x-2 text-start text-sm text-neutral-600 font-semibold"><i className="bx bx-info-circle"></i> Informacion de todos los productos donde se puede Crear, Eliminar, Actualizar y mas opciones</p>
        <section className="w-full flex justify-center items-center flex-col border border-neutral-400 divide-y divide-neutral-400">
            
            
            <Data 
                title="CATEGORIAS" 
                data="category" 
                filter={categories} 
                state={dataSend.category} 
                change={(e) => setDataSend({...dataSend, category:e.target.value})} 
                onClickAdd={() => createData("category", {category:dataSend.category})}
                onClickDelete={deleteData}
                />
            <Data 
                title="TIPOS" 
                data="type" 
                filter={types} 
                state={dataSend.type} 
                change={(e) => setDataSend({...dataSend, type:e.target.value})} 
                onClickAdd={() => createData("type", {type:dataSend.type})}
                onClickDelete={deleteData}
                />
            <Data 
                title="COLORES" 
                data="color" 
                filter={colors} 
                state={dataSend.color} 
                change={(e) => setDataSend({...dataSend, color:e.target.value})} 
                onClickAdd={() => createData("color", {color:dataSend.color})}/>
            <Data 
                title="TALLES"
                data="size" 
                filter={sizes} 
                state={dataSend.size} 
                change={(e) => setDataSend({...dataSend, size:e.target.value})} 
                onClickAdd={() => createData("size", {size:dataSend.size})}
                onClickDelete={deleteData}
                />
        </section>
    </section>
  )
}

export default ProductData

