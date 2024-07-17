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
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts"
import Footer from "../../components/Footer/Footer"
import hanlderDiscount from "../../utils/handlerDiscount"
const {VITE_URL_BASE} = import.meta.env


export interface StockGroupColors {
    unit: number;
    size: string;
    colors: {
        color: string;
        hxacolor: string;
        unit:number
    }[];
  }


function DetailProduct() {
    const { id } = useParams();

    const { data, loading} = useApi(`${VITE_URL_BASE}/product/detail/${id}`) as { data:DataProduct, loading:boolean }

    const [quantity, setQuantity] = useState(1)

    const [colorUnit, setColorUnit] = useState<number | null>(0)
    const [size, setSize] = useState<StockGroupColors | null>()
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
            avalibleSizeColors.push({unit:stock.unit, size:stock.Size.size, colors:[{color:stock.Color.color, hxacolor:stock.Color.hxacolor, unit: stock.unit}]})
        }else {
            sizeColorsExist.unit += stock.unit,
            sizeColorsExist.colors.push({color:stock.Color.color, hxacolor:stock.Color.hxacolor, unit: stock.unit})
        }

    });

    const infoProduct = {
        id:data?.product_id,
        name:data?.name, 
        image:data?.image, 
        cantidad:quantity, 
        size:size?.size || "", 
        unit:size?.unit || 0,
        price:data?.discount ? hanlderDiscount(data?.price, data?.discount) : data?.price, 
        color:color
    }

    const productInCart = cart.filter(product => product.id === data?.product_id)

    const quantityAvaliable = size && productInCart[0]?.cantidad >= size.unit ;
    
return (
    <main className="w-full min-h-screen bg-redd-500 flex justify-center items-start flex-col gap-12">
        <Nav style="fixed left-0 top-0"/>
        <Loader active={loading}/>
        <section className="min-h-screen w-full flex justify-start items-center flex-col pt-[65px]
        lg:justify-center lg:items-center
        bg-blued-500">

            <section className="w-[95%] min-h-[80vh] mx-auto 
                flex justify-start items-center 
                lg:justify-center lg:items-start 
                bg-greend-500 flex-col lg:flex-row ">

                <ImageZoom imageUrl={data?.image} stylePosition="lg:sticky lg:top-14"/>

                <article className="w-[100%] lg:w-[50%] h-[75%] py-5 lg:pt-0 px-5 lg:px-10 flex justify-between items-start flex-col bg-blued-500">
                    <p className="text-xs text-neutral-700 tracking-widest">Tienda | Productos | {data?.Type.type}</p>
                    <h2 className="text-4xl tracking-widest font-semibold">{data?.name}</h2>

                    <div className="flex justify-center items-center gap-x-2 text-sm font-light tracking-widest">
                        <p>{data?.Type.type}</p>
                        <p>|</p>
                        <p>{data?.Category.category}</p>
                    </div>
                    <div className="flex justify-start items-center gap-x-1">
                        {data?.discount !== 0 && <h3 className="text-2xl flex justify-center items-center gap-x-1"><span className="text-sm">$</span> {hanlderDiscount(data?.price, data?.discount)}</h3>}
                        {data?.discount !== 0 && <span className="text-sm text-neutral-600 line-through flex justify-center items-center relative">
                            <span className="text-xs">$</span>
                            {data?.price}
                            {data?.discount !== 0 && <span className={`absolute -top-2 left-6 text-xs px-1 rounded-sm bg-neutral-700 text-white font-light`}>{data?.discount}%</span>}
                        </span>}
                        {data?.discount === 0 && <h3 className="text-2xl flex justify-center items-center gap-x-1"><span className="text-sm">$</span> {data?.price}</h3>}
                    </div>

                    <div className="flex justify-center items-start flex-col gap-x-3 py-3">
                        <h3 className="text-sm text-neutral-700 tracking-widest">Talles:</h3>
                        <div className="w-full flex justify-center items-center gap-x-3">
                        {avalibleSizeColors.map((stock) => (
                            <button 
                                key={stock.size} 
                                className={`border border-neutral-400 
                                ${stock.size === size?.size? "bg-neutral-800 text-white" : null} py-1 px-3 rounded-sm transition-colors duration-500`} 
                                onClick={() => (setColor(""), setSize(stock), setColorUnit(null))}>{stock.size}</button>
                        ))}
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-x-3">

                        {size 
                        ?   size?.colors?.map((colors, index) => (
                            <Tooltip text={colors.color} key={index}>
                                <button style={{backgroundColor:colors.hxacolor}} 
                                        className={`w-[30px] h-[30px] rounded-full ${colors.color === color? "outline outline-neutral-800" : null}`}
                                        onClick={() => {setColor(colors.color), setColorUnit(colors.unit)}}></button> 
                            </Tooltip>
                        )) 

                        : colorsAvalible.map((colors, index) => (
                            <Tooltip text={colors.color} key={index}>
                                <div  style={{backgroundColor:colors.hxacolor}} 
                                className="w-[30px] h-[30px] rounded-full"></div>
                            </Tooltip>
                        )) }

                    </div>
                    <div className={`my-3 flex justify-center items-center ${size?.unit === 0 ? "text-rose-500" :"text-green-500"} text-sm`}>{size && color ?<p> Unidades disponibles: {colorUnit}</p> : <p>ㅤ</p>}</div>
                    
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
        </section>

        <RelatedProducts name={data?.name} color={data?.Stocks[0]?.Color.color} type={data?.Type.type}/>

        
        <Footer/>
    </main>

  )
}

export default DetailProduct



// <span className={`${data?.discount && "order-2"} relative text-neutral-800 text-lg`}>
//                                 {data?.discount && <span className={`text-sm bg-redd-500`}>$</span>}
//                                 <span className={`${data?.discount && "text-sm text-neutral-400 line-through"}`}>
//                                     {/* <span className={`${data?.discount && "text-xs"}`}>$ </span> */}
//                                     {data?.discount && <span className={`text-sm bg-redd-500`}>$</span>}
//                                 {data?.price}
//                                 </span>
//                                 {data?.discount !== 0 && <span className={`absolute -top-1 left-7 text-xs px-1 rounded-sm bg-neutral-700 text-white font-light`}>{data?.discount}%</span>}
//                             </span>
//                             <p className={`${data?.discount ? "order-1" : "hidden"} text-neutral-800 text-2xl`}><span className="text-sm">$ </span> {hanlderDiscount(data?.price, data?.discount)}</p>