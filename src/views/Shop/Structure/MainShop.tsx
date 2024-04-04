import useApi from "../../../hooks/useApi"
import { DataProduct } from "../../../interfaces/interfaces"
import CardProduct from "../../../components/CardProduct/CardProduct"
import Filters from "../../../components/Filters/Filters"
import { useState } from "react"

function MainShop() {

    const [filters, setFilters] = useState<boolean>(false)

    const { data } = useApi("http://localhost:3001/product/all") as { data: DataProduct[] }

    let categories =  new Set(data?.map(product => product.Category.category))
    let types = new Set(data?.map(product => product.Type.type));

    let sizes = new Set(); 
    let colorshxa = new Set<string>();
    data?.forEach((product) => {
        product.Stocks.forEach((stock) => {
            sizes.add(stock.Size.size)
            let colorshxaItem = { color: stock.Color.color, hxacolor: stock.Color.hxacolor };
            let colorshxaString = JSON.stringify(colorshxaItem);
            if (!colorshxa.has(colorshxaString)) {
                colorshxa.add(colorshxaString ) ;
            }
            
        })
    })

    const colorsArray = Array.from(colorshxa).map(color => { return JSON.parse(color) as {color:string, hxacolor:string} });

    const categoriesArray = [...categories] as string[];
    const typesArray = [...types] as string[];
    const sizesArray = [...sizes] as string[];
    
  return (
    <main className="w-[95%] mx-auto flex justify-between items-start flex-col">
        <section className="w-full h-auto my-2 flex justify-center items-center py-10">
            <h2>PRODUCTOS DESTACADOS</h2>
        </section>

        <section className="w-full min-h-[0px] bg-greend-500 flex justify-center items-start flex-col gap-y-5">
            <button className="outline-none font-thin gap-x-1 flex justify-center items-center border border-neutral-800 px-2 py-1 rounded-md" onClick={() => setFilters(!filters)}>
                <i className="scale-125 bx bx-filter"></i>Filtros
            </button>
            <aside className={`w-full ${filters ? "min-h-[0px] max-h-[50px]" : "max-h-0 min-h-0 opacity-0"} transition-[min-height_max-height] duration-700 flex justify-evenly items-start divide-x divide-neutral-500 bg-redd-500`}>

                <Filters filter={categoriesArray} title="CATEGORIAS"/>
                <Filters filter={typesArray} title="TIPOS"/>
                <Filters filter={sizesArray} title="TAMAÑOS"/>
                <Filters filter={colorsArray} title="COLORES"/>

            </aside>
        </section>

        <section className="w-full gap-10 flex flex-wrap justify-center items-center py-5 bg-blued-500">
            {data?.map(product => (
                    <CardProduct key={product.product_id} product={product}/>
            ))}
        </section>
    </main>
  )
}

export default MainShop