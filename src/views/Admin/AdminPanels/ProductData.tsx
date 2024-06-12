import React, { useState } from "react"
// import { useFilter } from "../../../hooks/useFilter"
import { fetchPOST } from "../../../utils/fetchPOST";
import { allFilters } from "../../../utils/allFilters";
const {VITE_URL_BASE} = import.meta.env

interface DataProp {
    data: string;
    title:string;
    state: any;
    filter: string[] | {color:string, hxacolor:string}[];
    change?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClickAdd: () => void
}

function Data ({filter, title, data, state, change, onClickAdd}: DataProp) {
    const [open, setOpen] = useState<string | null>(null)
    const [add, setAdd] = useState<string | null>(null)

    return (
        <section className="w-full px-3 ">
            <div className="w-full cursor-pointer flex justify-between items-center" >                   
                <h3 className="w-full py-5 text-lg text-neutral-800 font-semibold bg-redd-500" onClick={() => {open && open === data ? (setAdd(null), setOpen(null)) : setOpen(data)}}>{title}</h3>
                <div className="flex justify-center items-center gap-x-3">
                    {open && open === data && <i className="bx bx-plus scale-125" onClick={() => {add ? setAdd(null) : setAdd(data)}}/>}
                    {open && open === data && <i className="bx bx-edit scale-110"/>}
                    
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
                {filter?.map((value, index) => (
                    <React.Fragment key={index}>
                        <li className="flex gap-x-2">
                            {typeof value === "object" && value?.hxacolor && <span className="w-[20px] h-[20px] rounded-full border border-neutral-600" style={{backgroundColor:value.hxacolor}}></span>}
                            {typeof value === "string" ? value : value?.color}
                        </li>
                    </React.Fragment>    
                ))}
            </ul>
        </section>
    )
}


interface DataSend {
    category:undefined | string;
    type:undefined | string;
    color:undefined | string;
    size:undefined | string;
}
function ProductData() {
    const [dataSend, setDataSend] = useState<DataSend>({
        category:undefined,
        type:undefined,
        color:undefined,
        size:undefined
    })

    async function hanlderCategory () {
        // e.preventDefault()
        const {data} = await fetchPOST(`${VITE_URL_BASE}/category/create`, {category:dataSend.category})
        console.log(data);
        
    }
    async function hanlderType () {
            // e.preventDefault()
            const {data} = await fetchPOST(`${VITE_URL_BASE}/type/create`, {type:dataSend.type})
            console.log(data);
            
    }
    async function hanlderColor () {
        // e.preventDefault()
        const {data} = await fetchPOST(`${VITE_URL_BASE}/color/create`, {color:dataSend.color})
        console.log(data);
        
    }
    async function hanlderSize () {
        // e.preventDefault()
        const {data} = await fetchPOST(`${VITE_URL_BASE}/size/create`, {size:dataSend.size})
        console.log(data);
        
    }   
    const {categories, colors, sizes, types} = allFilters()


    

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
                onClickAdd={hanlderCategory}/>
            <Data 
                title="TIPOS" 
                data="type" 
                filter={types} 
                state={dataSend.type} 
                change={(e) => setDataSend({...dataSend, type:e.target.value})} 
                onClickAdd={hanlderType}/>
            <Data 
                title="COLORES" 
                data="color" 
                filter={colors} 
                state={dataSend.color} 
                change={(e) => setDataSend({...dataSend, color:e.target.value})} 
                onClickAdd={hanlderColor}/>
            <Data 
                title="TALLES"
                data="size" 
                filter={sizes} 
                state={dataSend.size} 
                change={(e) => setDataSend({...dataSend, size:e.target.value})} 
                onClickAdd={hanlderSize}/>
        </section>
    </section>
  )
}

export default ProductData

