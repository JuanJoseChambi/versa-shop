import { useDispatch } from "react-redux"
import { DataProduct } from "../../interfaces/interfaces"
import { AppDispatch } from "../../redux/store"
import { addToCart } from "../../redux/slice/cartSlice"
import { Link } from "react-router-dom"
// import { useState } from "react"
// import { ColorsData } from "../../utils/ColorsData/ColorsData"

interface CardProductProp {
    product: DataProduct
}


function CardProduct({product}:CardProductProp) {
    // const [color, setColor] = useState<string>("")
    const dispatch:AppDispatch = useDispatch()

    const colorsAvailable = new Set(product.Stocks.map(stock => stock.Color.color));
    const uniqueColors = [...colorsAvailable]
    // const arrayHxaColors = ColorsData.filter(colorData => uniqueColors.find(nameColor => nameColor === colorData.name))

    // console.log(color);
    

  return (
    <article key={product.product_id} className="max-w-[276px] min-h-[335px] relative flex justify-between items-start flex-col border border-neutral-300 p-3">
                <button 
                    className="text-2xl absolute top-3 right-5 " 
                    onClick={() => dispatch(addToCart({id:product.product_id,name:product.name, image:product.image, cantidad:1, size:"Xl", price:product.price, color:uniqueColors[0]}))}><i className='bx bx-cart-add'></i></button>
                <Link to={`/detail/${product.product_id}`}>
                    <picture className="w-[250px] min-h-[220px] max-h-[220px] flex justify-center items-center overflow-hidden bg-blued-500 ">
                        <img src={product.image} alt={product.name} className="w-[80%]"/>
                    </picture>
                </Link>
                <Link to={`/detail/${product.product_id}`}>
                    <h5 className="font-semibold text-lg tracking-widest">{product.name}</h5>
                    <div className="w-full flex justify-between items-center mt-auto">
                        <p className="font-semibold">$ {product.price}</p>
                        <div className="flex justify-center items-center flex-col gap-y-1">
                            <p className="text-sm text-neutral-500">{uniqueColors.length} Colores</p>
                            <div className="flex justify-center items-center gap-x-1">
                                {product.Stocks.map(stock => (
                                    <button key={stock.Color.color} style={{backgroundColor:stock?.Color?.hxacolor}} className={`flex justify-center items-center min-w-[15px] min-h-[15px] rounded-full`}></button>
                                    ))}
                            </div>
                        </div>
                    </div>
                </Link>
    </article>
  )
}

export default CardProduct