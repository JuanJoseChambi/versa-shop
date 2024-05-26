import { useParams } from "react-router-dom"
import useApi from "../../hooks/useApi"
import { Color, DataProduct, Stock } from "../../interfaces/interfaces"
import Loader from "../../components/Loader/Loader"
import Nav from "../../components/Nav/Nav"
import { useState } from "react"
import Tooltip from "../../components/Tooltip/Tooltip"
import { AppDispatch, RootState } from "../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../redux/slice/cartSlice"
import Button from "../../components/Button/Button"
// import Footer from "../../components/Footer/Footer"
import Acordeon from "../../components/Acordeon/Acordeon"
import ImageZoom from "../../components/ImageZoom/ImageZoom"
const {VITE_URL_BASE} = import.meta.env


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

    const { data, loading} = useApi(`${VITE_URL_BASE}/product/detail/${id}`) as { data:DataProduct, loading:boolean }

    const [quantity, setQuantity] = useState(1)

    const [size, setSize] = useState<StockGroupColors>()
    const [color, setColor] = useState<string>("")

    const cart = useSelector((state: RootState) => state.cart.cart)
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
        cantidad:quantity, 
        size:size?.size || "", 
        unit:size?.unit || 0,
        price:data?.price, 
        color:color
    }

    const productInCart = cart.filter(product => product.id === data?.product_id)

    const quantityAvaliable = size && productInCart[0]?.cantidad >= size.unit ;

return (
    <main className="min-h-[100vh] 
        flex justify-start items-center flex-col pt-[65px]
        lg:justify-center lg:items-center
        bg-blued-500 ">
        <Nav style="fixed top-0"/>
        <Loader active={loading}/>
        <section className="w-[95%] h-[80vh] mx-auto 
            flex justify-start items-center 
            lg:justify-center lg:items-start 
            bg-greend-500 flex-col lg:flex-row ">

            <ImageZoom imageUrl={data?.image}/>

            <article className="w-[100%] lg:w-[50%] h-[75%] py-5 lg:pt-0 px-5 lg:px-10 flex justify-between items-start flex-col bg-blued-500">
                <p className="text-xs text-neutral-700 tracking-widest">Tienda | Productos | Camperas</p>
                <h2 className="text-4xl tracking-widest font-semibold">{data?.name}</h2>

                <div className="flex justify-center items-center gap-x-2 text-sm font-light tracking-widest">
                    <p>{data?.Type.type}</p>
                    <p>|</p>
                    <p>{data?.Category.category}</p>
                </div>
                <p className="text-2xl pt-3">$ {data?.price}</p>

                {/* <p className="tracking-widest text-pretty my-5">{data?.description}</p> */}
                <div className="flex justify-center items-start flex-col gap-x-3 py-3">
                    <h3 className="text-sm text-neutral-700 tracking-widest">Talles:</h3>
                    <div className="w-full flex justify-center items-center gap-x-3">
                    {avalibleSizeColors.map(stock => (
                        <button 
                            key={stock.size} 
                            className={`border border-neutral-400 
                            ${stock.size === size?.size? "bg-neutral-800 text-white" : null} py-1 px-3 rounded-sm transition-colors duration-500`} 
                            onClick={() => (setColor(""), setSize(stock))}>{stock.size}</button>
                    ))}
                    </div>
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
                
                <section className="w-full flex justify-start items-center gap-5 bg-redd-500">
                    <div className="w-[100px] h-[40px] text-lg text-neutral-700 divide-x divide-neutral-400 flex justify-between items-center bg-neutral-100 border border-neutral-400">
                        <div className="w-[30px] h-full flex justify-center items-center bg-redd-500 cursor-pointer select-none" onClick={() => {quantity === 1 ? null : setQuantity(quantity - 1)}}>-</div>
                        <div className="w-[30px] h-full flex justify-center items-center bg-redd-500 cursor-pointer select-none">{quantity}</div>
                        <div className="w-[30px] h-full flex justify-center items-center bg-redd-500 cursor-pointer select-none" onClick={() => {size && size?.unit <= quantity ? null : setQuantity(quantity + 1)}}>+</div>
                    </div>
                <Button 
                    style={`w-[300px] py-3 text-sm text-white ${!size || !color || !size.unit || quantity > size.unit || quantityAvaliable ? "bg-neutral-400 pointer-events-none select-none" : "bg-neutral-800"}`}
                    text="Añadir a Carrito" 
                    iconLeft="bx bx-cart-add"
                    onClick={() => dispatch(addToCart(infoProduct))}/>
                </section>

                <div className="w-full mt-5 pt-3 border-t border-neutral-400 bg-neutrald-600">
                    <h3 className="text-xl font-semibold ">Descripcion</h3>
                    <Acordeon>
                        <pre className="h-auto text-pretty text-sm">{data?.description}</pre>
                    </Acordeon>
                </div>



            </article>

        </section>
    </main>

  )
}

export default DetailProduct

