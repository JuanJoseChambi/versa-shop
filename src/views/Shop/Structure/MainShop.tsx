import useApi from "../../../hooks/useApi"
import { DataBestSeller, DataProduct } from "../../../interfaces/interfaces"
import CardProduct from "../../../components/CardProduct/CardProduct"
import Filters from "../../../components/Filters/Filters"
import { useCallback, useEffect, useMemo, useState } from "react"
import React from "react"
import Loader from "../../../components/Loader/Loader"
import WithoutResult from "../../../components/WithoutResult/WithoutResult"
import Input from "../../../components/Input/Input"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { dataForFilter } from "../../../utils/dataForFilter"
import CardBestSeller from "../../../components/CardBestSeller/CardBestSeller"
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

    const [productsToDisplay, setProductsToDisplay] = useState<DataProduct[] | null>(null)
    const [products, setProducts] = useState<DataProduct[] | null>()

    const [loadingProducts, setLoadingProducts] = useState<boolean>()
    const [page, setPage] = useState(1)
    const [hasMoreProducts, setHasMoreProducts] = useState<boolean>(true)

    const { data } = useApi(`${VITE_URL_BASE}/product/all`) as { data: DataProduct[] | [] }
    const { data:bestSeller } = useApi(`${VITE_URL_BASE}/sale/product/all?maxSales=1&quantity=3`) as {data: DataBestSeller[]}

    const { categoriesArray, typesArray, sizesArray, colorsArray } = useMemo(() => dataForFilter(data), [data])

    const [optionsFilter, setOptionsFilter] = useState<OptionsFilter>({
        category:[],
        type:[],
        size:[],
        color:[],
        maxPrice:0,
        minPrice:0
    })

    let productsNoRepeat = new Set();

    const handlerLoadProducts = useCallback(async () => {
        if (!hasMoreProducts || loadingProducts) return;
        setLoadingProducts(true)
        try {
            const response = await fetch(`${VITE_URL_BASE}/product/paged?page=${page}`);
            const result: {data:DataProduct[], itemsForPage:number} = await response.json()
            const newProduct = result?.data.filter(product => !productsNoRepeat.has(product.product_id) && productsNoRepeat.add(product.product_id))
            // if (result.length > 0) {
                
            if (newProduct.length > 0) {
                setProducts(prevProducts => 
                    prevProducts ? [...prevProducts, ...result.data] : result.data
                );
                
                setPage(page + 1);

                result.data.length === result.itemsForPage && setHasMoreProducts(true);
                result.data.length < result.itemsForPage && setHasMoreProducts(false);

            }else {
                setHasMoreProducts(false);
            }
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setLoadingProducts(false);
        }
    }, [page])

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
            const response = await fetch(`${VITE_URL_BASE}/product/filter?${query}`)
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
        const response = await fetch(`${VITE_URL_BASE}/product/filter?search=${sought}`)
        const result = await response.json()
        setSearchProduct(result)
    }




    useEffect(() => {
        handlerLoadProducts()
    },[])

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 600 && !loadingProducts) {
            handlerLoadProducts();
        }
    };

    useEffect(() => {
        !loadingProducts && window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
        
    }, [loadingProducts]);

    useEffect(() => {
        if (sought) {
            handlerSearchProduct()
        } else {
            setSearchProduct(null)
        }
    }, [sought])

    useEffect(() => {
        
        if (searchProduct) {
            // productsToDisplay = searchProduct;
            setProductsToDisplay(searchProduct);
        } else if (productsFiltred) {
            // productsToDisplay = productsFiltred;
            setProductsToDisplay(productsFiltred);
        } else {
            // productsToDisplay = data;
            const productsSet = new Set(products)
            const productsDisplay: DataProduct[] = [...productsSet ]
            setProductsToDisplay(productsDisplay as DataProduct[]);
        }
        // console.log(searchProduct);
        
    },[products, productsFiltred, searchProduct])

    const buttonDisable = `${!optionsFilter.maxPrice && !optionsFilter.minPrice && !optionsFilter.category.length && !optionsFilter.type.length && !optionsFilter.size.length && !optionsFilter.color.length ? "pointer-events-none select-none bg-neutral-400 text-neutral-200" : " bg-neutral-800 text-white"} text-sm px-4 py-1`


  return (
    <main className=" mx-auto flex justify-between items-start flex-col bg-redd-500">
        <section className="w-full h-auto my-2 flex justify-center items-center flex-col py-10">
            <h2 className="tracking-widest font-noto text-2xl">PRODUCTOS DESTACADOS</h2>
            <section className="flex area justify-start sm:justify-evenly items-center py-10 scroll overflow-x-auto sm:overflow-x-hidden bg-greend-500">
            
                {bestSeller?.map(sale => {
                    const product = sale.Products[0];
                    return (
                        <CardBestSeller key={product.product_id} product={product}/>
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

        <section className="w-full max-w-[1850px] mx-auto gap-y-8 md:gap-y-5 flex justify-evenly sm:justify-evenly items-center flex-wrap pt-5 pb-16 bg-blued-500">

            {productsToDisplay && productsToDisplay?.map(product => (
                <React.Fragment key={`${product.name} ${product.product_id}`}>
                    {product.unit > 0 && product.available && <CardProduct product={product}/>}
                </React.Fragment>
            ))}
            {loadingProducts && <div className="w-full mt-14 bg-redd-500 flex justify-center items-center"><div className="inline w-[30px] h-[30px] animate-spin rounded-full border-r-2 border-t-2 border-neutral-400 bg-redd-500"></div></div>}
            <Loader active={!data}/>
            <WithoutResult visible={productsToDisplay?.length === 0 || searchProduct?.length === 0 || productsFiltred?.length === 0}/>
        </section>
    </main>
  )
}

export default MainShop