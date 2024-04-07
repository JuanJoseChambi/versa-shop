import useApi from "../../../hooks/useApi"
import { DataProduct } from "../../../interfaces/interfaces"
import CardProduct from "../../../components/CardProduct/CardProduct"
import Filters from "../../../components/Filters/Filters"
import { useState } from "react"
import React from "react"

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

    const productoDestacado1: string = data && data[0].image;
    const productoDestacado2: string = data && data[2].image;
    const productoDestacado3: string = data && data[3].image;
    
  return (
    <main className="w-[95%] mx-auto flex justify-between items-start flex-col">
        <section className="w-full h-auto my-2 flex justify-center items-center flex-col py-10">
            <h2 className="tracking-widest font-noto text-2xl">PRODUCTOS DESTACADOS</h2>
            <section className="flex area justify-evenly items-center py-10">
                <picture className="flex flex-col justify-center items-center w-[350px] max-h-[300px] overflow-hidden bg-redd-500">
                    <img src={productoDestacado1} alt="" className="w-full object-cover" />
                </picture>
                <picture className="flex flex-col justify-center items-center w-[350px] max-h-[300px] overflow-hidden bg-redd-500">
                    <img src={productoDestacado2} alt="" className="w-full object-cover" />
                </picture>
                <picture className="flex flex-col justify-center items-center w-[350px] max-h-[300px] overflow-hidden bg-redd-500">
                    <img src={productoDestacado3} alt="" className="w-full object-cover" />
                </picture>
            </section>
        </section>

        <section className="area min-h-[0px] bg-greend-500 flex justify-center items-start flex-col gap-y-5">
            <section className="w-full flex justify-between items-center">
                <h2 className="tracking-widest font-noto text-2xl">STOCK DE PRODUCTOS</h2>
                <button className="outline-none font-light gap-x-1 flex justify-center items-center tracking-widest" onClick={() => setFilters(!filters)}>
                    <i className="scale-125 bx bx-filter"></i>Filtros
                </button>
            </section>
            
        </section>
        
        <aside className={`w-full ${filters ? "min-h-[0px] max-h-[50px]  py-10" : "max-h-0 min-h-0 opacity-0 py-0 overflow-hidden"} transition-[min-height_max-height] duration-700 flex justify-evenly items-start divide-x divide-neutral-500 bg-redd-500`}>

                <Filters filter={categoriesArray} title="CATEGORIAS"/>
                <Filters filter={typesArray} title="TIPOS"/>
                <Filters filter={sizesArray} title="TAMAÑOS"/>
                <Filters filter={colorsArray} title="COLORES"/>

        </aside>

        <section className="w-full gap-10 flex flex-wrap justify-center items-center py-5 bg-blued-500">
            {data?.map(product => (
                   <React.Fragment key={product.product_id}>
                   {product.unit > 0 && <CardProduct key={product.product_id} product={product}/>}
                   </React.Fragment>
            ))}
        </section>
    </main>
  )
}

export default MainShop