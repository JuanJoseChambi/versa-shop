import useApi from "../../../hooks/useApi"
import { DataProduct } from "../../../interfaces/interfaces"
import { useFilter } from "../../../hooks/useFilter"
import CardProduct from "../../../components/CardProduct/CardProduct"
import SelectOption from "../../../components/SelectOption/SelectOption"

function MainShop() {

    const { data } = useApi("http://localhost:3001/product/all") as { data: DataProduct[] }

    const {categories, types, colors, sizes} = useFilter()


  return (
    <main className="max-w-[1320px] mx-auto flex justify-between items-start">
        <section className="sticky top-10 w-[250px] bg-redd-500 py-3">
            <h3 className="py-2 text-sm tracking-widest"><i className='bx bx-filter-alt'></i> Filtros</h3>
            <hr className="bg-neutral-400 h-[2px]"></hr>
            <section className="flex justify-center items-center flex-col gap-y-8 bg-redd-500 py-5">
                
                <SelectOption options={categories} titleOption="Categorias"/>
                <SelectOption options={types} titleOption="Tipos"/>
                <SelectOption options={sizes} titleOption="Tamaños"/>
                <SelectOption options={colors} titleOption="Colores"/>
                
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