import useApi from "../../../hooks/useApi"
import { DataProduct } from "../../../interfaces/interfaces"
import CardProduct from "../../../components/CardProduct/CardProduct"
import Filters from "../../../components/Filters/Filters"
import { useState } from "react"
import React from "react"
import Loader from "../../../components/Loader/Loader"
import WithoutResult from "../../../components/WithoutResult/WithoutResult"
const {VITE_URL_BASE} = import.meta.env


interface OptionsFilter {
    category: string[],
    type: string[],
    size: string[],
    color: string[]
}

function MainShop() {

    const [filters, setFilters] = useState<boolean>(false)

    const { data } = useApi(`${VITE_URL_BASE}/product/all`) as { data: DataProduct[] | [] }

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

    const productoDestacado1: string = data && data.length > 0 ? data[0].image : "";
    const productoDestacado2: string = data && data.length > 1 ? data[1].image : "";
    const productoDestacado3: string = data && data.length > 2 ? data[2].image : "";
    const imagesProducts = [productoDestacado1, productoDestacado2, productoDestacado3]

    // console.log(imagesProducts.join(""));
    const [optionsFilter, setOptionsFilter] = useState<OptionsFilter>({
        category:[],
        type:[],
        size:[],
        color:[]
    })
    console.log(optionsFilter);
    
    const updateFilter = (filterType:string, value:string | {color:string, hxacolor:string}) => {
        if(typeof value === "string"){
            setOptionsFilter({...optionsFilter, [filterType]: [...new Set([...optionsFilter[filterType as keyof OptionsFilter], value])]});
        }else {
            setOptionsFilter({...optionsFilter, [filterType]: [...new Set([...optionsFilter[filterType as keyof OptionsFilter], value.color])]});
        }
    };

    async function handlerFilterProducts () {

        const query:string[] = []

        optionsFilter.category && query.push(optionsFilter.category.join(","))
        optionsFilter.type && query.push(optionsFilter.type.join(","))
        optionsFilter.size && query.push(optionsFilter.size.join(","))
        optionsFilter.color && query.push(optionsFilter.color.join(","))

        const filtred = query.filter(qry => qry !== "")
        console.log(filtred);
        
        console.log(`${VITE_URL_BASE}/product?${filtred.join("&")}`);
        // const data = await fetch(`${VITE_URL_BASE}/product?${query}`)
    }

  return (
    <main className=" mx-auto flex justify-between items-start flex-col bg-redd-500">
        <section className="w-full h-auto my-2 flex justify-center items-center flex-col py-10">
            <h2 className="tracking-widest font-noto text-2xl">PRODUCTOS DESTACADOS</h2>
            <section className="flex area justify-evenly items-center py-10">
                {imagesProducts.join("") && imagesProducts.map((images) => (
                    <picture key={images} className="flex flex-col justify-center items-center w-[350px] max-h-[300px] overflow-hidden bg-redd-500">
                        <img src={images} alt="" className="w-full object-cover" />
                    </picture>
                ))}
                {!imagesProducts.join("") && <WithoutResult visible={!imagesProducts.join("")}/>}
            </section>
        </section>

        <section className="w-area min-h-[0px] bg-greend-500 flex justify-center items-start flex-col gap-y-5">
            <section className="w-full flex justify-between items-center">
                <h2 className="tracking-widest font-noto text-2xl">STOCK DE PRODUCTOS</h2>
                <button className="outline-none font-light gap-x-1 flex justify-center items-center tracking-widest" onClick={() => setFilters(!filters)}>
                    <i className="scale-125 bx bx-filter"></i>Filtros
                </button>
            </section>
            
        </section>
        
        <aside className={`w-area ${filters ? "min-h-[0px] max-h-[300px] pt-10" : "max-h-0 min-h-0 opacity-0 py-0 overflow-hidden"} transition-[min-height_max-height] duration-700 flex justify-center items-start flex-wrap gap-5`}>

                <div className="w-full flex justify-center items-start flex-wrap gap-8 divide-x-0 md:divide-x divide-neutral-500">
                    <Filters maxWidth="min-w-[100px]" filter={categoriesArray} select={optionsFilter.category} title="CATEGORIAS" onClick={(value) => updateFilter("category", value as string)}/>
                    <Filters maxWidth="min-w-[100px]" filter={typesArray} select={optionsFilter.type} title="TIPOS" onClick={(value) => updateFilter("type", value as string)}/>
                    <Filters maxWidth="min-w-[100px]" filter={sizesArray} select={optionsFilter.size} title="TAMAÑOS" onClick={(value) => updateFilter("size", value as string)}/>
                    <Filters maxWidth="min-w-[100px]" filter={colorsArray} select={optionsFilter.color} title="COLORES" onClick={(value) => updateFilter("color", value as {color:string, hxacolor:string})}/>
                </div>
                <div className="flex justify-center items-center gap-8">
                    <button className={`${!optionsFilter.category.length && !optionsFilter.type.length && !optionsFilter.size.length && !optionsFilter.color.length ? "pointer-events-none select-none bg-neutral-400 text-neutral-200" : " bg-neutral-800 text-white"} text-sm px-4 py-1`} onClick={() => setOptionsFilter({category:[], type:[], size:[], color:[]})}>Limpiar filtro</button>
                    <button className={`${!optionsFilter.category.length && !optionsFilter.type.length && !optionsFilter.size.length && !optionsFilter.color.length ? "pointer-events-none select-none bg-neutral-400 text-neutral-200" : " bg-neutral-800 text-white"} text-sm px-4 py-1`} onClick={handlerFilterProducts}>Filtrar</button>
                </div>
        </aside>

        <section className="w-[95%] max-w-[1850px] mx-auto gap-10 flex flex-wrap justify-center items-center pt-5 pb-16 bg-blued-500">
            {data?.map(product => (
                <React.Fragment key={product.product_id}>
                    {product.unit > 0 && <CardProduct key={product.product_id} product={product}/>}
                </React.Fragment>
            ))}
            <Loader active={!data}/>
            <WithoutResult visible={data && data.length === 0}/>
        </section>
    </main>
  )
}

export default MainShop