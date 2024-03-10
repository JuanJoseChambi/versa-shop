import { useEffect, useState } from "react"
import useApi from "../../../hooks/useApi"
import { DataProduct } from "../../../interfaces/interfaces"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../redux/store"
import { addToCart } from "../../../redux/slice/cartSlice"

function MainShop() {

    const counter = useSelector((state:RootState) => state.cart.cart);
    const dispatch:AppDispatch = useDispatch()


    const [dataProduct, setData] = useState<DataProduct[]>()
        const {data} = useApi("http://localhost:3001/product/all")

    useEffect(() => {
        
        setData(data as DataProduct[])

        // console.log(counter);
        
    },[data, counter])


  return (
    <main className="max-w-[1320px] mx-auto flex justify-between items-start">
        <section className="sticky top-10 w-[250px] bg-redd-500 py-3">
            <h3 className="py-2 text-sm tracking-widest"><i className='bx bx-filter-alt'></i> Filtros</h3>
            <hr className="bg-neutral-400 h-[2px]"></hr>
            <section className="flex justify-center items-center flex-col gap-y-8 bg-redd-500 py-5">
                <select name="" id="" className="w-[80%]">
                    <option value="">Colores</option>
                    <option value="">Gris</option>
                    <option value="">Azul</option>
                </select>
                <select name="" id="" className="w-[80%]">
                    <option value="">Talles</option>
                    <option value="">Gris</option>
                    <option value="">Azul</option>
                </select>
                <select name="" id="" className="w-[80%]">
                    <option value="">Categoria</option>
                    <option value="">Gris</option>
                    <option value="">Azul</option>
                </select>
                <select name="" id="" className="w-[80%]">
                    <option value="">Tipo</option>
                    <option value="">Gris</option>
                    <option value="">Azul</option>
                </select>
                <button className="w-full rounded-full py-3 text-sm text-white bg-neutral-800">Apilcar Filtro</button>
            </section>

        </section>
        <section className="w-[80%] gap-10 flex flex-wrap justify-center items-center py-10 bg-blued-500">
            {dataProduct?.map(product => (
                <article key={product.product_id} className="max-w-[276px] min-h-[440px] flex justify-between items-start flex-col border border-neutral-300 p-3">
                <picture className="w-[250px] min-h-[320px] flex justify-center items-center overflow-hidden bg-blued-500 ">
                    <img src={product.image} alt="" className="w-[80%]"/>
                </picture>
                <h5 className="font-semibold tracking-wider">{product.name}</h5>
                <p>{product.description}</p>
                <div className="w-full flex justify-between items-center">
                    <p className="font-light">$ {product.price}</p>
                    <button className="text-2xl" onClick={() => dispatch(addToCart({id:product.product_id,name:product.name, image:product.image, cantidad:1, size:"Xl", price:product.price}))}><i className='bx bx-cart-add'></i></button>
                </div>
              </article>
            ))}
        </section>
    </main>
  )
}

export default MainShop