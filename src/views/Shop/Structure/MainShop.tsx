import useApi from "../../../hooks/useApi"
import { DataProduct } from "../../../interfaces/interfaces"
import CardProduct from "../../../components/CardProduct/CardProduct"
import Filters from "../../../components/Filters/Filters"
import { useState } from "react"
import React from "react"
import Loader from "../../../components/Loader/Loader"
import WithoutResult from "../../../components/WithoutResult/WithoutResult"
import Input from "../../../components/Input/Input"
const {VITE_URL_BASE} = import.meta.env


interface OptionsFilter {
    category: string[],
    type: string[],
    size: string[],
    color: string[],
    maxPrice: number;
    minPrice: number;
}

function MainShop() {

    const [filters, setFilters] = useState<boolean>(false)
    const [productsFiltred, setProductsFiltred] = useState<DataProduct[] | null>(null)

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

    const [optionsFilter, setOptionsFilter] = useState<OptionsFilter>({
        category:[],
        type:[],
        size:[],
        color:[],
        maxPrice:0,
        minPrice:0
    })

    const updateFilter = (filterType:string, value:string | {color:string, hxacolor:string}) => {
        if (filterType === "maxPrice" || filterType === "minPrice") {
        console.error(`Error: No se puede actualizar ${filterType} con esta función`);
        return;
        }
        if(typeof value === "string"){
            setOptionsFilter({...optionsFilter, [filterType]: [...new Set([...optionsFilter[filterType as keyof OptionsFilter] as string[], value])]});
        }else {
            setOptionsFilter({...optionsFilter, [filterType]: [...new Set([...optionsFilter[filterType as keyof OptionsFilter] as string[], value.color])]});
        }
    };

    async function handlerFilterProducts () {

        const queryOptions = [
            `${optionsFilter.category.length > 0 ? optionsFilter.category.length > 1 ? `category=${optionsFilter.category.join(",")}` : `category=${optionsFilter.category.join("")}` : ""}`,
            `${optionsFilter.type.length > 0 ? optionsFilter.type.length > 1 ? `type=${optionsFilter.type.join(",")}` : `type=${optionsFilter.type.join("")}` : ""}`,
            `${optionsFilter.size.length > 0 ? optionsFilter.size.length > 1 ? `size=${optionsFilter.size.join(",")}` : `size=${optionsFilter.size.join("")}` : ""}`,
            `${optionsFilter.color.length > 0 ? optionsFilter.color.length > 1 ? `color=${optionsFilter.color.join(",")}` : `color=${optionsFilter.color.join("")}` : ""}`,
            `${optionsFilter.maxPrice > 0 ? `maxPrice=${optionsFilter.maxPrice}` : ""}`,
            `${optionsFilter.minPrice > 0 ? `minPrice=${optionsFilter.minPrice}` : ""}`,
        ]
        const query = queryOptions.filter(qry => qry !== "")

        console.log(`${VITE_URL_BASE}/product?${query.join("&")}`);
        
        const data = await fetch(`${VITE_URL_BASE}/product?${query.join("&")}`)
        const result = await data.json()
        setProductsFiltred(result)
    }

    const buttonDisable = `${!optionsFilter.maxPrice && !optionsFilter.minPrice && !optionsFilter.category.length && !optionsFilter.type.length && !optionsFilter.size.length && !optionsFilter.color.length ? "pointer-events-none select-none bg-neutral-400 text-neutral-200" : " bg-neutral-800 text-white"} text-sm px-4 py-1`

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

                <div className="w-full hidden md:flex justify-center items-start flex-wrap gap-8 divide-x-0 md:divide-x divide-neutral-500">
                    <Filters maxWidth="min-w-[100px]" filter={categoriesArray} select={optionsFilter.category} title="CATEGORIAS" onClick={(value) => updateFilter("category", value as string)}/>
                    <Filters maxWidth="min-w-[100px]" filter={typesArray} select={optionsFilter.type} title="TIPOS" onClick={(value) => updateFilter("type", value as string)}/>
                    <Filters maxWidth="min-w-[100px]" filter={sizesArray} select={optionsFilter.size} title="TAMAÑOS" onClick={(value) => updateFilter("size", value as string)}/>
                    <Filters maxWidth="min-w-[100px]" filter={colorsArray} select={optionsFilter.color} title="COLORES" onClick={(value) => updateFilter("color", value as {color:string, hxacolor:string})}/>
                </div>
                <div className={`hidden md:flex justify-center items-center gap-8`}>
                    <button className={buttonDisable} onClick={() => {setOptionsFilter({category:[], type:[], size:[], color:[], maxPrice:0, minPrice:0}), setProductsFiltred(null)}}>Limpiar filtro</button>
                    <button className={buttonDisable} onClick={handlerFilterProducts}>Filtrar</button>
                </div>

        </aside>
        
        <aside className={`${filters ? "w-full h-screen md:hidden" : "hidden"} fixed top-0 left-0 z-[100] flex justify-start items-center flex-col pt-2 pb-5 gap-10 bg-white`}>
            <section className="w-area flex justify-between items-center">
                <h3 className="text-2xl font-semibold tracking-widest">FILTROS</h3>
                <button className="bg-blued-500 flex justify-center items-center scale-150" onClick={() => setFilters(false)}><i className="bx bx-x"></i></button>
            </section>
            <section className="w-full flex justify-center items-center flex-col gap-y-7">
                <Filters styleTitle="text-sm -top-5 text-neutral-700 font-semibold tracking-widest" filter={categoriesArray} select={optionsFilter.category} title="CATEGORIAS" onClick={(value) => updateFilter("category", value as string)}/>
                <Filters styleTitle="text-sm -top-5 text-neutral-700 font-semibold tracking-widest" filter={typesArray} select={optionsFilter.type} title="TIPOS" onClick={(value) => updateFilter("type", value as string)}/>
                <Filters styleTitle="text-sm -top-5 text-neutral-700 font-semibold tracking-widest" filter={sizesArray} select={optionsFilter.size} title="TAMAÑOS" onClick={(value) => updateFilter("size", value as string)}/>
                <Filters styleTitle="text-sm -top-5 text-neutral-700 font-semibold tracking-widest" filter={colorsArray} select={optionsFilter.color} title="COLORES" onClick={(value) => updateFilter("color", value as {color:string, hxacolor:string})}/>
                <div className="w-area gap-x-5 flex justify-center items-center">
                    <Input name="Max Price" type="number" onChange={(e) => setOptionsFilter({...optionsFilter, maxPrice:Number(e.target.value)})}/>
                    <Input name="Min Price" type="number" onChange={(e) => setOptionsFilter({...optionsFilter, minPrice:Number(e.target.value)})}/>
                </div>
            </section>
            <div className={`mt-auto flex justify-center items-center gap-8`}>
                <button className={buttonDisable} onClick={() => {setOptionsFilter({category:[], type:[], size:[], color:[], maxPrice:0, minPrice:0}), setProductsFiltred(null)}}>Limpiar filtro</button>
                <button className={buttonDisable} onClick={() => {handlerFilterProducts(), setFilters(false)}}>Filtrar</button>
            </div>
        </aside>

        <section className="w-[95%] max-w-[1850px] mx-auto gap-10 flex flex-wrap justify-center items-center pt-5 pb-16 bg-blued-500">
            {!productsFiltred && data?.map(product => (
                <React.Fragment key={product.product_id}>
                    {product.unit > 0 && product.available && <CardProduct product={product}/>}
                </React.Fragment>
            ))}
            {productsFiltred && productsFiltred?.map(product => (
                <React.Fragment key={product.product_id}>
                    {product.unit > 0 && product.available && <CardProduct product={product}/>}
                </React.Fragment>
            ))}
            <Loader active={!data}/>
            <WithoutResult visible={data && data.length === 0}/>
        </section>
    </main>
  )
}

export default MainShop