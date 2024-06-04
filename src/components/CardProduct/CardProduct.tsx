import { DataProduct } from "../../interfaces/interfaces"
import { Link } from "react-router-dom"

interface CardProductProp {
    product: DataProduct
}

function CardProduct({product}:CardProductProp) {

    const colorsAvailable = new Set(product.Stocks.map(stock => stock.Color.color));
    const hxacolorAvailable = new Set(product.Stocks.map(stock => stock.Color.hxacolor));
    const uniqueColorsQuantity = [...colorsAvailable]
    const uniqueHxacolorQuantity = [...hxacolorAvailable]
    
  return (
    <article key={product.product_id} className="max-w-[276px] min-h-[320px] relative flex justify-start items-start flex-col bg-redd-500 p-3 outline-none hover:outline-1 hover:outline hover:outline-neutral-300 transition-[outline] duration-500 ">
                <Link to={`/detail/${product.product_id}`}>
                    <picture className="w-[250px] min-h-[220px] max-h-[220px] flex justify-center items-center overflow-hidden bg-blued-500">
                        <img src={product.image} alt={product.name} className="w-[80%]"/>
                    </picture>
                </Link>
                <Link to={`/detail/${product.product_id}`} className="w-full min-h-[80px] max-h-[80px] flex flex-col justify-between items-start bg-greend-500 ">
                    <h5 className="font-semibold text-lg text-neutral-800 tracking-widest leading-5 text-clipping">{product.name}</h5>
                    <div className="w-full flex justify-between items-center mt-auto ">
                        <p className="text-neutral-800 text-lg">$ {product.price}</p>
                        <div className="flex justify-center items-center flex-col gap-y-1 ">
                            <p className="text-sm text-neutral-500">{uniqueColorsQuantity.length} Colores</p>
                            <div className="flex justify-center items-center gap-x-1 ">
                                {/* {product.Stocks.map(stock => (
                                    <button key={`${product.product_id}${stock.stock_id}`} style={{backgroundColor:stock?.Color?.hxacolor}} className={`flex justify-center items-center min-w-[15px] min-h-[15px] rounded-full`}></button>
                                    ))} */}
                                {uniqueHxacolorQuantity.map(color => (
                                    <button key={`${product.product_id}`} style={{backgroundColor:color}} className={`flex justify-center items-center min-w-[15px] min-h-[15px] rounded-full`}></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </Link>
    </article>
  )
}

export default CardProduct