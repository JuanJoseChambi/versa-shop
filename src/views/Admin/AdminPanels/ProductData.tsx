import React, { useState } from "react"
import { useFilter } from "../../../hooks/useFilter"
import { fetchPOST } from "../../../utils/fetchPOST";
import { allFilters } from "../../../utils/allFilters";
const {VITE_URL_BASE} = import.meta.env

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

    async function hanlderCategory (e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const {data} = await fetchPOST(`${VITE_URL_BASE}/category/create`, {category:dataSend.category})
        console.log(data);
        
    }
    async function hanlderType (e:React.FormEvent<HTMLFormElement>) {
            e.preventDefault()
            const {data} = await fetchPOST(`${VITE_URL_BASE}/type/create`, {type:dataSend.type})
            console.log(data);
            
    }
    async function hanlderColor (e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const {data} = await fetchPOST(`${VITE_URL_BASE}/color/create`, {color:dataSend.color})
        console.log(data);
        
    }
    async function hanlderSize (e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const {data} = await fetchPOST(`${VITE_URL_BASE}/size/create`, {size:dataSend.size})
        console.log(data);
        
    }   
    const [add, setAdd] = useState<string | null>(null)
    const [open, setOpen] = useState<string | null>(null)
    const {categories, colors, sizes, types} = allFilters()


    interface UlValueProp {
        valueUl:string; 
        filter: string[] | {color:string, hxacolor:string}[];
        add?:string | null; 
        onChange?: (e:React.ChangeEvent<HTMLInputElement>) => void;
    }


    function UlValues ({valueUl, filter, add, onChange}: UlValueProp) {
        return (
            <ul hidden={open !== valueUl} className={`${open === valueUl && "flex justify-center items-start flex-col"} px-3 pb-4 gap-5 text-sm text-neutral-700 font-semibold`}>
                    {add && add === valueUl && (<input type="text" placeholder="Dato a Añadir" className="outline-none border-b border-neutral-400 py-1" onChange={onChange}/>)}
                    
                    {filter?.map((value, index) => (
                        <React.Fragment key={index}>
                            <li className="flex gap-x-2">
                                {typeof value === "object" && value?.hxacolor && <span className="w-[20px] h-[20px] rounded-full border border-neutral-600" style={{backgroundColor:value.hxacolor}}></span>}
                                {typeof value === "string" ? value : value?.color}
                            </li>
                        </React.Fragment>    
                    ))}
            </ul>
        )
    }

  return (
    <section className="w-[95%] flex justify-center items-center flex-col flex-wrap bg-redd-500 gap-3">
        <h3 className="w-full text-start text-2xl font-semibold text-neutral-800 tracking-widest">DATOS PRODUCTO</h3>
        <p className="w-full flex justify-start items-center gap-x-2 text-start text-sm text-neutral-600 font-semibold"><i className="bx bx-info-circle"></i> Informacion de todos los productos donde se puede Crear, Eliminar, Actualizar y mas opciones</p>
        <section className="w-full flex justify-center items-center flex-col border border-neutral-400 divide-y divide-neutral-400">
            <section className="w-full px-3 ">
                <div className="w-full cursor-pointer flex justify-between items-center" >
                    <h3 className="w-full py-5 text-lg text-neutral-800 font-semibold bg-redd-500" onClick={() => {open && open === "category" ? (setAdd(null), setOpen(null)) : setOpen("category")}}>CATEGORIAS</h3>
                    <div className="flex justify-center items-center gap-x-3 z-10">
                        {open && open === "category" && <i className="bx bx-plus scale-125" onClick={() => setAdd("category")}/>}
                        {/* {dataSend.category && <i className="bx bx-ckeck"/>} */}
                        {open && open === "category" && <i className="bx bx-edit scale-110"/>}
                        
                        <i className={`${open === "category" ? "bx bx-chevron-up" : "bx bx-chevron-down"} scale-150`}/>
                    </div>
                </div>
                <UlValues valueUl="category" filter={categories} add={add} onChange={(e) => setDataSend({...dataSend, category: e.target.value})}/>
            </section>
            <section className="w-full px-3 ">
                <div className="w-full cursor-pointer flex justify-between items-center" >                   
                    <h3 className="w-full text-lg py-5 text-neutral-800 font-semibold" onClick={() => {open && open === "type" ? (setAdd(null), setOpen(null)) : setOpen("type")}}>TIPOS</h3>
                    <div className="flex justify-center items-center gap-x-3">
                        {open && open === "type" && <i className="bx bx-plus scale-125" onClick={() => setAdd("type")}/>}
                        {open && open === "type" && <i className="bx bx-edit scale-110"/>}
                        
                        <i className={`${open === "type" ? "bx bx-chevron-up" : "bx bx-chevron-down"} scale-150`}/>
                    </div>
                </div>
                <UlValues valueUl="type" filter={types} add={add} onChange={(e) => setDataSend({...dataSend, type:e.target.value})}/>
            </section>
            <section className="w-full px-3 ">
                <div className="w-full cursor-pointer flex justify-between items-center" >
                    <h3 className="w-full text-lg py-5 text-neutral-800 font-semibold" onClick={() => {open && open === "color" ? (setAdd(null), setOpen(null)) : setOpen("color")}}>COLORES</h3>
                    <div className="flex justify-center items-center gap-x-3">
                        {open && open === "color" && <i className="bx bx-plus scale-125" onClick={() => setAdd("color")}/>}
                        {open && open === "color" && <i className="bx bx-edit scale-110"/>}
                        
                        <i className={`${open === "color" ? "bx bx-chevron-up" : "bx bx-chevron-down"} scale-150`}/>
                    </div>
                </div>
                <UlValues valueUl="color" filter={colors} add={add}/>
            </section>
            <section className="w-full px-3 ">
                <div className="w-full cursor-pointer flex justify-between items-center" >
                    <h3 className="w-full text-lg py-5 text-neutral-800 font-semibold" onClick={() => {open && open === "size" ? (setAdd(null), setOpen(null)) : setOpen("size")}}>TALLES</h3>
                    <div className="flex justify-center items-center gap-x-3">
                        {open && open === "size" && <i className="bx bx-plus scale-125" onClick={() => setAdd("size")}/>}
                        {open && open === "size" && <i className="bx bx-edit scale-110"/>}
                        
                        <i className={`${open === "size" ? "bx bx-chevron-up" : "bx bx-chevron-down"} scale-150`}/>
                    </div>
                </div>
                <UlValues valueUl="size" filter={sizes} add={add}/>
            </section>
        </section>
    </section>
  )
}

export default ProductData





// <div className="flex justify-center items-center flex-wrap gap-x-5">
//             <section className="flex justify-center items-center flex-col gap-y-3 border border-neutral-400 py-5 w-full md:px-10 md:w-auto my-5 ">
//                 <h2>Crear categorias</h2>
//                 <form className="flex justify-center items-center flex-col gap-y-3" onSubmit={hanlderCategory}>
//                     <input type="text" className="border border-black" placeholder="Categorias" onChange={(e) => setDataSend({...dataSend,category: e.target.value})}/>
//                     <input type="submit" className="bg-black text-white py-1 px-3 rounded-full"/>
//                 </form>
//                 <select className="w-[150px]">
//                     {categories?.map((category) => (
//                         <option key={category.id} value={category.category}>{category.category}</option>
//                     ))}
//                 </select>
//             </section>    

//             <section className="flex justify-center items-center flex-col gap-y-3 border border-neutral-400 py-5 w-full md:px-10 md:w-auto my-5 ">
//                 <h2>Crear tipos</h2>
//                 <form className="flex justify-center items-center flex-col gap-y-3" onSubmit={hanlderType}>
//                     <input type="text" className="border border-black" placeholder="Tipos" onChange={(e) => setDataSend({...dataSend, type: e.target.value})}/>
//                     <input type="submit" className="bg-black text-white py-1 px-3 rounded-full"/>
//                 </form>
//                 <select className="w-[150px]">
//                     {types?.map((type) => (
//                         <option key={type.id} value={type.type}>{type.type}</option>
//                     ))}
//                 </select>
//             </section>

//             <section className="flex justify-center items-center flex-col gap-y-3 border border-neutral-400 py-5 w-full md:px-10 md:w-auto my-5 ">
//                 <h2>Crear Color</h2>
//                 <form className="flex justify-center items-center flex-col gap-y-3" onSubmit={hanlderColor}>
//                     <input type="text" className="border border-black" placeholder="Tipos" onChange={(e) => setDataSend({...dataSend, color: e.target.value})}/>
//                     <input type="submit" className="bg-black text-white py-1 px-3 rounded-full"/>
//                 </form>
//                 <select className="w-[150px]">
//                     {colors?.map((color) => (
//                         <option key={color.color_id} value={color.color}>{color.color}</option>
//                     ))}
//                 </select>
//             </section>

//             <section className="flex justify-center items-center flex-col gap-y-3 border border-neutral-400 py-5 w-full md:px-10 md:w-auto my-5 ">
//                 <h2>Crear Tamaño</h2>
//                 <form className="flex justify-center items-center flex-col gap-y-3" onSubmit={hanlderSize}>
//                     <input type="text" className="border border-black" placeholder="Tipos" onChange={(e) => setDataSend({...dataSend, size: e.target.value})}/>
//                     <input type="submit" className="bg-black text-white py-1 px-3 rounded-full"/>
//                 </form>
//                 <select className="w-[150px]">
//                     {sizes?.map((size) => (
//                         <option key={size.size_id} value={size.size}>{size.size}</option>
//                     ))}
//                 </select>
//             </section>
//         </div>