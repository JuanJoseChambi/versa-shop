import { useState } from "react"
import { useFilter } from "../../../hooks/useFilter"
import { fetchPOST } from "../../../utils/fetchPOST";
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

    const {categories, types, colors, sizes} = useFilter()

  return (
    <section className="w-[95%] flex justify-center items-center flex-col flex-wrap bg-redd-500 gap-5">
        <h3 className="w-full text-start text-2xl font-semibold text-neutral-800 tracking-widest">DATOS PRODUCTO</h3>
        <div className="flex justify-center items-center flex-wrap gap-x-5">
            <section className="flex justify-center items-center flex-col gap-y-3 border border-neutral-400 py-5 w-full md:px-10 md:w-auto my-5 ">
                <h2>Crear categorias</h2>
                <form className="flex justify-center items-center flex-col gap-y-3" onSubmit={hanlderCategory}>
                    <input type="text" className="border border-black" placeholder="Categorias" onChange={(e) => setDataSend({...dataSend,category: e.target.value})}/>
                    <input type="submit" className="bg-black text-white py-1 px-3 rounded-full"/>
                </form>
                <select className="w-[150px]">
                    {categories?.map((category) => (
                        <option key={category.id} value={category.category}>{category.category}</option>
                    ))}
                </select>
            </section>    

            <section className="flex justify-center items-center flex-col gap-y-3 border border-neutral-400 py-5 w-full md:px-10 md:w-auto my-5 ">
                <h2>Crear tipos</h2>
                <form className="flex justify-center items-center flex-col gap-y-3" onSubmit={hanlderType}>
                    <input type="text" className="border border-black" placeholder="Tipos" onChange={(e) => setDataSend({...dataSend, type: e.target.value})}/>
                    <input type="submit" className="bg-black text-white py-1 px-3 rounded-full"/>
                </form>
                <select className="w-[150px]">
                    {types?.map((type) => (
                        <option key={type.id} value={type.type}>{type.type}</option>
                    ))}
                </select>
            </section>

            <section className="flex justify-center items-center flex-col gap-y-3 border border-neutral-400 py-5 w-full md:px-10 md:w-auto my-5 ">
                <h2>Crear Color</h2>
                <form className="flex justify-center items-center flex-col gap-y-3" onSubmit={hanlderColor}>
                    <input type="text" className="border border-black" placeholder="Tipos" onChange={(e) => setDataSend({...dataSend, color: e.target.value})}/>
                    <input type="submit" className="bg-black text-white py-1 px-3 rounded-full"/>
                </form>
                <select className="w-[150px]">
                    {colors?.map((color) => (
                        <option key={color.color_id} value={color.color}>{color.color}</option>
                    ))}
                </select>
            </section>

            <section className="flex justify-center items-center flex-col gap-y-3 border border-neutral-400 py-5 w-full md:px-10 md:w-auto my-5 ">
                <h2>Crear Tamaño</h2>
                <form className="flex justify-center items-center flex-col gap-y-3" onSubmit={hanlderSize}>
                    <input type="text" className="border border-black" placeholder="Tipos" onChange={(e) => setDataSend({...dataSend, size: e.target.value})}/>
                    <input type="submit" className="bg-black text-white py-1 px-3 rounded-full"/>
                </form>
                <select className="w-[150px]">
                    {sizes?.map((size) => (
                        <option key={size.size_id} value={size.size}>{size.size}</option>
                    ))}
                </select>
            </section>
        </div>
    </section>
  )
}

export default ProductData