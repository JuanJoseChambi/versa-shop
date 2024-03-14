import { useParams } from "react-router-dom"
import useApi from "../../hooks/useApi"
import { DataProduct, Stock } from "../../interfaces/interfaces"
import Loader from "../../components/Loader/Loader"
import Nav from "../../components/Nav/Nav"
import { useState } from "react"


function DetailProduct() {
    const { id } = useParams()

    const [size, setSize] = useState<Stock>()
    const [color, setColor] = useState<string>("")

    const { data, loading} = useApi(`http://localhost:3001/product/detail/${id}`) as {data:DataProduct, loading:boolean}
    
    const colorsAvalible = new Set(data?.Stocks.map(stock => stock.Color.hxacolor))
    const uniqueColors = [...colorsAvalible]

    // console.log(uniqueColors);
    

  return (
    <main className="bg-gradient-to-r from-[#EAEAEA] to-[#E5E5E5] h-screen">

        <Nav style="sticky"/>
        <Loader active={loading}/>

        <section className="w-[90%] mx-auto h-screen xl:h-[550px] 2xl:h-[800px] border border-neutral-400 rounded-xl flex justify-center items-center gap-x-20 bg-white">
            
            <picture className="w-[350px] min-h-[500px] max-h-[500px] overflow-hidden flex justify-center items-center bg-greend-500">
                <img src={data?.image} alt={data?.name} />
            </picture>
            <article className="w-[50%] h-[80%] py-5 px-10 flex justify-between items-start flex-col bg-blued-500">
                <h2 className="text-4xl tracking-widest font-semibold">{data?.name}</h2>

                <div className="flex justify-center items-center gap-x-2 text-sm font-light tracking-widest">
                    <p>{data?.Type.type}</p>
                    <p>|</p>
                    <p>{data?.Category.category}</p>
                </div>

                <p className="tracking-widest text-pretty my-5">{data?.description}</p>
                <div className="flex justify-center items-center gap-x-3 my-5">
                    {data?.Stocks.map(stock => (
                    <button className={`border border-neutral-400 ${size?.Size.size === stock.Size.size? "bg-neutral-800 text-white" : null} py-1 px-3 rounded-xl transition-colors duration-500`} onClick={() => setSize(stock)}>{stock.Size.size}</button>
                    ))}
                </div>

                <div className="flex justify-center items-center gap-x-3">
                    {uniqueColors.map(hxacolor => (
                        <div style={{backgroundColor:hxacolor}} 
                        className="w-[30px] h-[30px] rounded-full"></div>
                    ))}
                </div>
                <div className="my-3 flex justify-center items-center text-green-500 text-sm">{size ?<p> Unidades disponibles: {size?.unit}</p> : <p>ㅤ</p>}</div>
                <p className="mt-auto mb-5 text-xl">$ {data?.price}</p>
                <button className={`w-[30%] rounded-full py-3 text-sm text-white ${!size || !color ? "bg-neutral-400 pointer-events-none select-none" : "bg-neutral-800"}`}>Añadir a carrito</button>
            </article>

        </section>
    </main>
  )
}

export default DetailProduct