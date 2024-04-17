import { useParams } from "react-router-dom"
import useApi from "../../hooks/useApi"
import { Color, DataProduct, Stock } from "../../interfaces/interfaces"
import Loader from "../../components/Loader/Loader"
import Nav from "../../components/Nav/Nav"
import { useState } from "react"
import Tooltip from "../../components/Tooltip/Tooltip"
import { AppDispatch } from "../../redux/store"
import { useDispatch } from "react-redux"
import { addToCart } from "../../redux/slice/cartSlice"
import Button from "../../components/Button/Button"



interface StockGroupColors {
    unit: number;
    size: string;
    colors: {
        color: string;
        hxacolor: string;
    }[];
  }


function DetailProduct() {
    const { id } = useParams();

    const { data, loading} = useApi(`http://localhost:3001/product/detail/${id}`) as { data:DataProduct, loading:boolean }

    const [size, setSize] = useState<StockGroupColors>()
    const [color, setColor] = useState<string>("")

    const dispatch:AppDispatch = useDispatch()


    const colorsAvalible: Color[] = []
    data?.Stocks.forEach((stock:Stock) => {
        const colorExist = colorsAvalible.find(colors => colors.color === stock.Color.color);

        if (!colorExist) {
            colorsAvalible.push({color:stock.Color.color, hxacolor:stock.Color.hxacolor})
        }else{
            return
        }

    })  

    const avalibleSizeColors: StockGroupColors[] = [];

    data?.Stocks.forEach((stock:Stock) => {
        
        const sizeColorsExist = avalibleSizeColors.find(sizes => sizes.size === stock.Size.size);

        if (!sizeColorsExist) {
            avalibleSizeColors.push({unit:stock.unit, size:stock.Size.size, colors:[{color:stock.Color.color, hxacolor:stock.Color.hxacolor}]})
        }else {
            sizeColorsExist.unit += stock.unit,
            sizeColorsExist.colors.push({color:stock.Color.color, hxacolor:stock.Color.hxacolor})
        }
        
    });

    const infoProduct = {
        id:data?.product_id,
        name:data?.name, 
        image:data?.image, 
        cantidad:1, 
        size:size?.size || "", 
        unit:size?.unit || 0,
        price:data?.price, 
        color:color
    }

return (
    <main className="min-h-screen pb-10 ">
        <Nav style="sticky"/>
        <Loader active={loading}/>
        <section className="w-[95%] lg:w-[90%] min-h-[90%] md:h-[90%]  mx-auto flex justify-center items-center flex-col md:flex-row bg-redd-500">
            
            <picture className="max-w-[300px] max-h-[350px] min-h-[350px] md:w-[550px] md:max-h-[75%] md:min-h-[75%] lg:max-w-[25%] overflow-hidden mt-10 mb-5 flex justify-center items-center bg-greend-500 p-5 border border-neutral-500 rounded-sm">
                <img src={data?.image} alt={data?.name} className="object-cover"/>
            </picture>

            <article className="w-[100%] lg:w-[70%] min-h-[75%] py-5 px-5 lg:px-16 flex justify-between items-start flex-col bg-blude-500">
                <h2 className="text-4xl tracking-widest font-semibold">{data?.name}</h2>

                <div className="flex justify-center items-center gap-x-2 text-sm font-light tracking-widest">
                    <p>{data?.Type.type}</p>
                    <p>|</p>
                    <p>{data?.Category.category}</p>
                </div>

                <p className="tracking-widest text-pretty my-5">{data?.description}</p>
                <div className="flex justify-center items-center gap-x-3 my-5">
                    {avalibleSizeColors.map(stock => (
                        <button 
                            key={stock.size} 
                            className={`border border-neutral-400 
                            ${stock.size === size?.size? "bg-neutral-800 text-white" : null} py-1 px-3 rounded-xl transition-colors duration-500`} 
                            onClick={() => (setColor(""), setSize(stock))}>{stock.size}</button>
                    ))}
                </div>

                <div className="flex justify-center items-center gap-x-3">
                    
                    {size 
                    ?   size.colors.map((colors) => (
                        <Tooltip text={colors.color} key={size.size}>
                            <button style={{backgroundColor:colors.hxacolor}} 
                                    className={`w-[30px] h-[30px] rounded-full ${colors.color === color? "outline outline-neutral-800" : null}`}
                                    onClick={() => setColor(colors.color)}></button> 
                        </Tooltip>
                    )) 

                    : colorsAvalible.map(colors => (
                        <Tooltip text={colors.color} key={colors.hxacolor}>
                            <div  style={{backgroundColor:colors.hxacolor}} 
                            className="w-[30px] h-[30px] rounded-full"></div>
                        </Tooltip>
                    )) }

                </div>
                <div className={`my-3 flex justify-center items-center ${size?.unit === 0 ? "text-rose-500" :"text-green-500"} text-sm`}>{size ?<p> Unidades disponibles: {size?.unit}</p> : <p>ㅤ</p>}</div>
                <p className="mt-auto mb-5 text-xl">$ {data?.price}</p>
                
                <Button 
                    style={`w-[90%] mx-auto rounded-full py-3 text-sm text-white ${!size || !color || !size.unit ? "bg-neutral-400 pointer-events-none select-none" : "bg-neutral-800"}`}
                    text="Añadir a Carrito" 
                    iconLeft="bx bx-cart-add"
                    onClick={() => dispatch(addToCart(infoProduct))}/>

            </article>

        </section>
    </main>
  )
}

export default DetailProduct