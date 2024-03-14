import { useEffect, useState } from "react"
import useApi from "../../../hooks/useApi"
import { DataProduct } from "../../../interfaces/interfaces"
import { useFilter } from "../../../hooks/useFilter"
import CardProduct from "../../../components/CardProduct/CardProduct"
import { Link } from "react-router-dom"

function MainShop() {


    const [dataProduct, setData] = useState<DataProduct[]>()
        const {data} = useApi("http://localhost:3001/product/all")

    useEffect(() => {
        
        setData(data as DataProduct[])
        
    },[data, ])

    const {categories, types, colors, sizes} = useFilter()


  return (
    <main className="max-w-[1320px] mx-auto flex justify-between items-start">
        <section className="sticky top-10 w-[250px] bg-redd-500 py-3">
            <h3 className="py-2 text-sm tracking-widest"><i className='bx bx-filter-alt'></i> Filtros</h3>
            <hr className="bg-neutral-400 h-[2px]"></hr>
            <section className="flex justify-center items-center flex-col gap-y-8 bg-redd-500 py-5">
                <select className="w-[80%]">
                    <option value="">Categoria</option>
                    {categories?.map((category) => (
                        <option key={category.id} value={category.category}>{category.category}</option>
                    ))}
                </select>
                <select className="w-[80%]">
                    <option value="">Tipo</option>
                    {types?.map((type) => (
                        <option key={type.id} value={type.type}>{type.type}</option>
                    ))}
                </select>
                <select className="w-[80%]">
                    <option value="">Tamaño</option>
                    {sizes?.map((size) => (
                        <option key={size.size_id} value={size.size}>{size.size}</option>
                    ))}
                </select>
                <select className="w-[80%]">
                    <option value="">Colores</option>
                    {colors?.map((color) => (
                        <option key={color.color_id} value={color.color}>{color.color}</option>
                    ))}
                </select>
                <button className="w-full rounded-full py-3 text-sm text-white bg-neutral-800">Apilcar Filtro</button>
            </section>

        </section>
        <section className="w-[80%] gap-10 flex flex-wrap justify-center items-center py-10 bg-blued-500">
            {dataProduct?.map(product => (
                <Link to={`/detail/${product.product_id}`}>
                    <CardProduct key={product.product_id} product={product}/>
                </Link>
            ))}
        </section>
    </main>
  )
}

export default MainShop