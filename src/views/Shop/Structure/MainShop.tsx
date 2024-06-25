import useApi from "../../../hooks/useApi"
import { DataBestSeller, DataProduct } from "../../../interfaces/interfaces"
import CardProduct from "../../../components/CardProduct/CardProduct"
import Filters from "../../../components/Filters/Filters"
import { useEffect, useState } from "react"
import React from "react"
import Loader from "../../../components/Loader/Loader"
import WithoutResult from "../../../components/WithoutResult/WithoutResult"
import Input from "../../../components/Input/Input"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { Link } from "react-router-dom"
import hanlderDiscount from "../../../utils/handlerDiscount"
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

    const [searchProduct, setSearchProduct] = useState<DataProduct[] | null>(null)

    const { data } = useApi(`${VITE_URL_BASE}/product/all`) as { data: DataProduct[] | [] }
    const { data:bestSeller } = useApi(`${VITE_URL_BASE}/sale/product/all?maxSales=1&quantity=3`) as {data: DataBestSeller[]}

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

    async function handlerFilterProducts() {
        
        const queryOptions = [
            optionsFilter.category.length > 0 ? `category=${optionsFilter.category.join(",")}` : "",
            optionsFilter.type.length > 0 ? `type=${optionsFilter.type.join(",")}` : "",
            optionsFilter.size.length > 0 ? `size=${optionsFilter.size.join(",")}` : "",
            optionsFilter.color.length > 0 ? `color=${optionsFilter.color.join(",")}` : "",
            optionsFilter.maxPrice > 0 ? `maxPrice=${optionsFilter.maxPrice}` : "",
            optionsFilter.minPrice > 0 ? `minPrice=${optionsFilter.minPrice}` : "",
        ]
        const query = queryOptions?.filter(qry => qry !== "").join("&")

        try {
            const response = await fetch(`${VITE_URL_BASE}/product?${query}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const result = await response.json()
            setProductsFiltred(result)
        } catch (error) {
            console.error("Error fetching filtered products:", error)
        }
    }

    const sought = useSelector((state:RootState) => state.navBar.sought)

    async function handlerSearchProduct () {
        const response = await fetch(`${VITE_URL_BASE}/product?search=${sought}`)
        const result = await response.json()
        setSearchProduct(result)
    }

    useEffect(() => {
        if (sought) {
            handlerSearchProduct()
        } else {
            setSearchProduct(null)
        }
    },[sought])

    const buttonDisable = `${!optionsFilter.maxPrice && !optionsFilter.minPrice && !optionsFilter.category.length && !optionsFilter.type.length && !optionsFilter.size.length && !optionsFilter.color.length ? "pointer-events-none select-none bg-neutral-400 text-neutral-200" : " bg-neutral-800 text-white"} text-sm px-4 py-1`

    let productsToDisplay: DataProduct[] | null = null;

    if (searchProduct) {
        productsToDisplay = searchProduct;
    } else if (productsFiltred) {
        productsToDisplay = productsFiltred;
    } else {
        productsToDisplay = data;
    }

  return (
    <main className=" mx-auto flex justify-between items-start flex-col bg-redd-500">
        <section className="w-full h-auto my-2 flex justify-center items-center flex-col py-10">
            <h2 className="tracking-widest font-noto text-2xl">PRODUCTOS DESTACADOS</h2>
            <section className="flex area justify-evenly items-center py-10 scroll overflow-x-auto sm:overflow-x-hidden bg-greend-500 ">
            
                {bestSeller?.map(sale => {
                    const product = sale.Products[0];
                    return (
                        <div key={`${product.product_id} ${product.name} ${product.product_id}`} className="min-w-[300px] min-h-[350px] sm:min-w-[100px] sm:min-h-[100px] sm:max-w-[350px] sm:max-h-[330px] ml-6 sm:mx-0 flex justify-start items-center flex-col bg-redd-500 ">
                            <Link to={`/detail/${product.product_id}`}>
                                <picture className="flex flex-col justify-center items-center max-w-[350px] max-h-[300px] overflow-hidden bg-blued-500">
                                    <img src={product.image} alt={product.image} className="w-full object-cover" />
                                </picture>
                            </Link>
                            <p className="text-xs text-clipping-1 leading-4 bg-greend-500">{product.name}</p>
                            <span className="w-1/2 h-[1px] mt-4 bg-neutral-500 flex justify-center items-center">
                                {/* <p>{product.}</p> */}
                                {/* <span className="bg-white relative px-2 text-lg flex justify-center items-center gap-x-1 font-lighta">
                                    <span className="text-xs font-normal">$</span> {product.price}
                                    {product.discount && <span className="absolute -top-1 -right-4 px-1 text-xs rounded-sm text-white bg-neutral-700">{product.discount}%</span>}
                                </span> */}
                                <span className="flex justify-center items-center gap-x-1 text-xl bg-white px-2 ">
                                    <span className="text-xs">$</span>
                                    {product.discount === 0 && <h3 className="leading-3">{product.price}</h3>}
                                    {product.discount !== 0 && <span className="leading-3 relative">
                                        {hanlderDiscount(product.price, product.discount)}
                                        <div className="absolute -top-2 left-6 text-xs px-1 rounded-sm bg-neutral-700 text-white font-light">
                                            {product.discount}%
                                        </div>    
                                    </span>}
                                    {/* {product.discount !== 0 && <h3 className="text-xl flex justify-center items-center gap-x-1"><span className="text-sm">$</span> {hanlderDiscount(product.price, product.discount)}</h3>}
                                    {product.discount !== 0 && <span className="text-sm text-neutral-600 line-through flex justify-center items-center relative">
                                        {product.discount !== 0 && <span className={`absolute -top-2 left-6 text-xs px-1 rounded-sm bg-neutral-700 text-white font-light`}>{product.discount}%</span>}
                                    </span>}
                                    {product.discount === 0 && <h3 className="text-xl flex justify-center items-center gap-x-1"><span className="text-sm">$</span> {product.price}</h3>} */}
                                </span>
                            </span>
                        </div>
                    )
                })}

                {!bestSeller?.join("") && <WithoutResult visible={!bestSeller?.join("")}/>}

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
        
        <aside className={`${filters ? "w-full h-screen md:hidden" : "hidden"} fixed top-0 left-0 z-[100] flex justify-start items-center flex-col pt-5 pb-5 gap-10 bg-white`}>
            <section className="w-area flex justify-between items-center">
                <h3 className="text-2xl font-semibold tracking-widest">FILTROS</h3>
                <button className="bg-blued-500 flex justify-center items-center text-2xl scale-150" onClick={() => setFilters(false)}><i className="bx bx-x"></i></button>
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
            <div className={`flex justify-center items-center gap-8`}>
                <button className={buttonDisable} onClick={() => {setOptionsFilter({category:[], type:[], size:[], color:[], maxPrice:0, minPrice:0}), setProductsFiltred(null)}}>Limpiar filtro</button>
                <button className={buttonDisable} onClick={() => {handlerFilterProducts(), setFilters(false)}}>Filtrar</button>
            </div>
        </aside>

        <section className="w-[95%] max-w-[1850px] mx-auto md:gap-10 flex flex-wrap justify-center items-center pt-5 pb-16 bg-blued-500">

            {productsToDisplay?.map(product => (
                <React.Fragment key={`${product.name} ${product.product_id}`}>
                    {product.unit > 0 && product.available && <CardProduct product={product}/>}
                </React.Fragment>
            ))}

            <Loader active={!data}/>
            <WithoutResult visible={data?.length === 0 || searchProduct?.length === 0 || productsFiltred?.length === 0}/>
        </section>
    </main>
  )
}

export default MainShop