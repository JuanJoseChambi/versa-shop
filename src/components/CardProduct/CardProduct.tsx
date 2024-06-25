import { useState } from "react";
import { DataProduct, Stock } from "../../interfaces/interfaces"
import { Link } from "react-router-dom"
import { StockGroupColors } from "../../views/DetailProduct/DetailProduct";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addToCart } from "../../redux/slice/cartSlice";
import hanlderDiscount from "../../utils/handlerDiscount";

interface CardProductProp {
    product: DataProduct
}

function CardProduct({product}:CardProductProp) {
    const [color, setColor] = useState<string>("")
    const [size, setSize] = useState<StockGroupColors | null>(null)
    const [addCart, setAddCart] = useState(false)
    const dispatch:AppDispatch = useDispatch()
    // const colors = product.Stocks.filter(sizeStock => sizeStock.Size.size === size)
    const cart = useSelector((state: RootState) => state.cart.cart)
    
    const colorsAvailable = new Set(product.Stocks.map(stock => stock.Color.color));
    const hxacolorAvailable = new Set(product.Stocks.map(stock => stock.Color.hxacolor));
    const uniqueColorsQuantity = [...colorsAvailable]
    const uniqueHxacolorQuantity = [...hxacolorAvailable]
    

    const avalibleSizeColors: StockGroupColors[] = [];

    product.Stocks.forEach((stock:Stock) => {
        
        const sizeColorsExist = avalibleSizeColors.find(sizes => sizes.size === stock.Size.size);

        if (!sizeColorsExist) {
            avalibleSizeColors.push({unit:stock.unit, size:stock.Size.size, colors:[{color:stock.Color.color, hxacolor:stock.Color.hxacolor, unit: stock.unit}]})
        }else {
            sizeColorsExist.unit += stock.unit,
            sizeColorsExist.colors.push({color:stock.Color.color, hxacolor:stock.Color.hxacolor, unit: stock.unit})
        }

    });

    const productInCart = cart.filter(productC => productC.id === product?.product_id)

    const quantityAvaliable = size && productInCart[0]?.cantidad >= size.unit ;

    const infoProduct = {
        id:product.product_id,
        name:product.name, 
        image:product.image, 
        cantidad:1, 
        size:size?.size || "", 
        unit:size?.unit || 0,
        price:product.discount ? hanlderDiscount(product.price, product.discount) : product.price,
        color:color
    }
    // console.log(size);
    
  return (
    <article key={product.product_id} 
        className="
        max-w-[180px] min-h-[250px]
        sm:max-w-[276px] sm:min-h-[320px] 
        relative flex justify-center items-center flex-col 
        bg-redd-500  outline-none hover:outline-1 hover:outline hover:outline-neutral-300 transition-[outline] duration-500 ">
                {/* <Link to={`/detail/${product.product_id}`}> */}
                    <picture className="max-w-[250px] min-h-[190px] max-h-[220px] relative flex justify-center items-center overflow-hidden bg-blued-500">
                        <img src={product.image} alt={product.name} className="w-[90%] h-full object-cover"/>
                        {!addCart && <button className="absolute top-1 right-2 scale-125 cursor-pointer" onClick={() => setAddCart(true)}><i className="bx bx-cart-add"></i></button>}
                        
                        <div className={`${addCart ? "w-full h-full bg-[#ffffff] flex justify-start items-center flex-col py-10 absolute top-0 left-0 rounded-sm": "hidden"}`}>
                            {addCart && <button className="absolute top-1 right-2 scale-125 cursor-pointer" onClick={() => setAddCart(false)}><i className="bx bx-x"></i></button>}
                            <h3 className="absolute top-1 text-sm text-neutral-800 font-semibold tracking-wider">Añadir a carrito</h3>
                            <div className="bg-redd-500 text-white flex justify-center items-center gap-x-3">
                                
                                {avalibleSizeColors.map((stock, index) => (
                                    <p key={index} className={`${stock.size === size?.size && "bg-black text-white"} text-neutral-800 px-2 cursor-pointer border border-neutral-400 rounded-md`} onClick={() => {size && size.size === stock.size ? setSize(null) : (setColor(""), setSize(stock))}}>{stock.size}</p>
                                ))}
                                
                            </div>
                            <div className="w-full flex justify-center items-center gap-3 my-auto">
                                {size && size?.colors.map((col, index) => (
                                    <div key={`${index} ${col.color}`} className={`${color === col.color ? "p-0.5 border border-neutral-600" : "outline outline-neutral-300"} min-w-[25px] min-h-[25px] rounded-full cursor-pointer flex justify-center items-center bg-transparent`} onClick={() => setColor(col.color)} >
                                        <div className="w-[25px] h-[25px] rounded-full" style={{backgroundColor: col.hxacolor}}></div>
                                    </div>
                                ))}
                                {!size && uniqueHxacolorQuantity?.map((hxacolor, index) => (
                                    <div key={`${index} ${hxacolor}`} className="w-[25px] h-[25px] rounded-full cursor-pointer outline outline-neutral-300" style={{backgroundColor:hxacolor}}></div>
                                ))}
                            </div>
                            <button 
                                className={`${!size || !color || quantityAvaliable ? "bg-neutral-300 text-neutral-600 pointer-events-none select-none" : "bg-neutral-800 text-white"}  font-semibold px-5 py-2 rounded-sm flex justify-center items-center gap-x-1`} 
                                onClick={() => {dispatch(addToCart(infoProduct))}}><i className="bx bx-cart-add scale-110"/></button>
                        </div>
                    </picture>
                {/* </Link> */}
                <Link to={`/detail/${product.product_id}`} className="w-[90%] mx-auto min-h-[80px] max-h-[80px] flex flex-col justify-between items-start bg-greend-500 ">
                    <h5 className="font-semibold text-xs sm:text-lg text-neutral-800 tracking-widest sm:leading-5 text-clipping">{product.name}</h5>
                    <div className="w-full flex justify-between items-center mt-auto ">

                    <div className="flex justify-start items-center gap-x-1">
                        {product.discount !== 0 && <h3 className="text-xl flex justify-center items-center gap-x-1"><span className="text-sm">$</span> {hanlderDiscount(product.price, product.discount)}</h3>}
                        {product.discount !== 0 && <span className="text-sm text-neutral-600 line-through flex justify-center items-center relative">
                            <span className="text-xs">$</span>
                            {product.price}
                            {product.discount !== 0 && <span className={`absolute -top-2 left-6 text-xs px-1 rounded-sm bg-neutral-700 text-white font-light`}>{product.discount}%</span>}
                        </span>}
                        {product.discount === 0 && <h3 className="text-xl flex justify-center items-center gap-x-1"><span className="text-sm">$</span> {product.price}</h3>}
                    </div>

                        <div className="flex justify-center items-center flex-col gap-y-1 ">
                            <p className="text-sm text-neutral-500">{uniqueColorsQuantity.length} Colores</p>
                            <div className="flex justify-center items-center gap-x-1 ">
                                {uniqueHxacolorQuantity.map((color, index) => (
                                    <button key={`${product.product_id} ${index}`} style={{backgroundColor:color}} className={`flex justify-center items-center min-w-[15px] min-h-[15px] rounded-full`}></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </Link>
    </article>
  )
}

export default CardProduct