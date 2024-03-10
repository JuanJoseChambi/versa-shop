import { useState } from "react"
import { fetchPOST } from "../../utils/fetchPOST"

interface categoryData {
    category:undefined | string
}

interface typeData {
    type:undefined | string
}

function Admin() {
    const [catgory, setCategory] = useState<categoryData>({
        category:undefined
    })
    const [type, setType] = useState<typeData>({
        type:undefined
    })
    
    async function hanlderCategory (e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const {data} = await fetchPOST("http://localhost:3001/category/create", catgory)
        console.log(data);
        
    }

    async function hanlderType (e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const {data} = await fetchPOST("http://localhost:3001/type/create", type)
        console.log(data);
        
    }


  return (
    <div className="flex justify-center items-center flex-col">
        <h2 className="text-xl font-bold py-10">Panel de administrador</h2>

        <section className="flex justify-center items-center flex-col gap-y-3 border border-neutral-400 py-5 px-10 my-5 ">
            <h2>Crear categorias</h2>
            <form className="flex justify-center items-center flex-col gap-y-3" onSubmit={hanlderCategory}>
                <input type="text" className="border border-black" placeholder="Categorias" onChange={(e) => setCategory({category: e.target.value})}/>
                <input type="submit" className="bg-black text-white py-1 px-3 rounded-full"/>
            </form>
        </section>    

        <section className="flex justify-center items-center flex-col gap-y-3 border border-neutral-400 py-5 px-10 my-5 ">
            <h2>Crear tipos</h2>
            <form className="flex justify-center items-center flex-col gap-y-3" onSubmit={hanlderType}>
                <input type="text" className="border border-black" placeholder="Tipos" onChange={(e) => setType({type: e.target.value})}/>
                <input type="submit" className="bg-black text-white py-1 px-3 rounded-full"/>
            </form>
        </section>

        <section className="flex justify-center items-center flex-col gap-y-3 border border-neutral-400 py-5 px-10 my-5 ">
            <h2>Crear tipos</h2>
            <form className="flex justify-center items-center flex-col gap-y-3" onSubmit={hanlderType}>
                <input type="text" className="border border-black" placeholder="Tipos" onChange={(e) => setType({type: e.target.value})}/>
                <input type="submit" className="bg-black text-white py-1 px-3 rounded-full"/>
            </form>
        </section>

    </div>
  )
}

export default Admin