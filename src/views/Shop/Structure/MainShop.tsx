import useApi from "../../../hooks/useApi"
import { DataProduct } from "../../../interfaces/interfaces"
import CardProduct from "../../../components/CardProduct/CardProduct"
import SelectOption from "../../../components/SelectOption/SelectOption"

function MainShop() {

    const { data } = useApi("http://localhost:3001/product/all") as { data: DataProduct[] }

    let categories =  new Set(data?.map(product => product.Category.category))
    let types = new Set(data?.map(product => product.Type.type));

    let sizes = new Set()
    let colors = new Set()
    data?.forEach((product) => {
        product.Stocks.forEach((stock) => {
            sizes.add(stock.Size.size)
            colors.add(stock.Color.color)
        })
    })

    const categoriesArray = [...categories] as string[];
    const typesArray = [...types] as string[];
    const sizesArray = [...sizes] as string[];
    const colorsArray = [...colors] as string[];
    
  return (
    <main className="w-[95%] mx-auto flex justify-between items-start">
        <section className="sticky top-10 w-[250px] bg-redd-500 py-3">
            <h3 className="py-2 text-sm tracking-widest"><i className='bx bx-filter-alt'></i> Filtros</h3>
            <hr className="bg-neutral-400 h-[2px]"></hr>
            <section className="flex justify-center items-center flex-col gap-y-8 bg-redd-500 py-5">
                
                <SelectOption options={categoriesArray} titleOption="Categorias"/>
                <SelectOption options={typesArray} titleOption="Tipos"/>
                <SelectOption options={sizesArray} titleOption="Tamaños"/>
                <SelectOption options={colorsArray} titleOption="Colores"/>
                
                <button className="w-full rounded-full py-3 text-sm text-white bg-neutral-800">Apilcar Filtro</button>
            </section>

        </section>
        <section className="w-[80%] gap-10 flex flex-wrap justify-center items-center py-10 bg-blued-500">
            {data?.map(product => (
                    <CardProduct key={product.product_id} product={product}/>
            ))}
        </section>
    </main>
  )
}

export default MainShop