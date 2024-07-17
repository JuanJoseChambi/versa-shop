import { useEffect, useState } from "react"
import { DataProduct } from "../../interfaces/interfaces";
const {VITE_URL_BASE} = import.meta.env

interface PropRelatedProducts {
    name:string;
    color: string;
    type: string;
}


function RelatedProducts({name, color, type}: PropRelatedProducts) {
    const [products, setProducts] = useState<DataProduct[] | null>()

    async function handlerRelatedProducts () {
        const response = await fetch(`${VITE_URL_BASE}/product/related?name=${name.split(" ")[0]}&color=${color}&type=${type}`)
        const data:{data: DataProduct[]} = await response.json()
        console.log(data);
        
        setProducts(data.data)
    }

    useEffect(() => {
        handlerRelatedProducts()
    },[name, color, type])

  return (
    <aside className="w-area h-auto flex justify-center items-center flex-col gap-0 bg-redd-500">
        <h3 className="text-4xl text-neutral-800 tracking-wider font-semibold">PRODUCTOS RELACIONADOS</h3>
        <section className="w-area h-auto py-5 flex justify-start sm:justify-between items-center gap-x-5 sm:gap-x-0 max-sm:overflow-x-auto scroll flex-row bg-greend-500">
            {products?.map((product) => (
                <div key={product.product_id} className="max-sm:min-w-[250px] max-sm:h-[250px] sm:w-[200px] sm:max-w-[200px] sm:h-[200px] overflow-hidden flex justify-start items-center flex-col bg-redd-500">
                    <picture key={product.product_id} className="w-[90%] overflow-hidden flex justify-center items-center bg-redd-500">
                        <img src={product.image} alt={product.name} className="w-[100%] h-full object-cover "/>
                    </picture>
                    <h4 className="text-xs text-center ">{product.name}</h4>
                </div>
            ))}
        </section>
    </aside>
  )
}

export default RelatedProducts