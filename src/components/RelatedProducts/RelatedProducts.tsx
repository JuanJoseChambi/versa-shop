import { useEffect, useState } from "react"
import { DataProduct } from "../../interfaces/interfaces";
import { Link } from "react-router-dom";
import { RelatedPulse } from "../ComponentsAnimatePulse/ComponentsAnimatePulse";
const {VITE_URL_BASE} = import.meta.env

interface PropRelatedProducts {
    name:string;
    color: string;
    type: string;
    id: string;
}


function RelatedProducts({name, color, type, id}: PropRelatedProducts) {
    const [products, setProducts] = useState<DataProduct[] | null>()

    async function handlerRelatedProducts () {
        const response = await fetch(`${VITE_URL_BASE}/product/related/${id}?name=${name.split(" ")[0]}&color=${color}&type=${type}`)
        const data:{data: DataProduct[]} = await response.json()
        setProducts(data.data)
    }

    useEffect(() => {
        handlerRelatedProducts()
    },[name])

  return (
    <aside className="w-area h-auto flex justify-center items-center flex-col gap-0 bg-redd-500">
        <h3 className="text-4xl text-neutral-800 tracking-wider font-semibold">PRODUCTOS RELACIONADOS</h3>
        <section className={`w-full h-auto py-5 flex justify-start sm:justify-between items-center gap-x-5 ${!products ? "sm:gap-x-4 sm:overflow-x-auto" : "sm:gap-x-0 max-sm:overflow-x-auto"} scroll flex-row bg-greend-500`}>
            {products?.map((product) => (
                <Link to={`/detail/${product?.product_id}`}>
                    <div key={product.product_id} className={`max-sm:min-w-[250px] max-sm:h-[250px] sm:max-w-[300px] sm:max-h-[300px] overflow-hidden flex justify-between items-center flex-col gap-y-2 bg-redd-500`}>
                        <picture key={product.product_id} className="w-[95%] overflow-hidden flex justify-center items-center bg-redd-500">
                            <img src={product.image} alt={product.name} className="w-[100%] h-full object-cover "/>
                        </picture>
                        <h4 className="w-[85%] text-sm text-center line-clamp-2">{product.name}</h4>
                    </div>
                </Link>
            ))}
            {Array.from({ length: 6 }).map((_, index) => (
                <RelatedPulse key={index} active={!products} />
            ))}
        </section>
    </aside>
  )
}

export default RelatedProducts
