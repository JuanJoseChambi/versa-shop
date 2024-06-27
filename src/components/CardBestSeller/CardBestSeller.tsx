import { Link } from "react-router-dom"
import hanlderDiscount from "../../utils/handlerDiscount"
import { SalesProducts } from "../../interfaces/interfaces"

function CardBestSeller({product}:{product:SalesProducts}) {
  return (
    <div key={`${product.product_id} ${product.name} ${product.product_id}`} 
        className="min-w-[300px] min-h-[350px] sm:min-w-[100px] sm:min-h-[100px] sm:max-w-[350px] sm:max-h-[330px] ml-6 sm:mx-0 flex justify-start items-center flex-col bg-redd-500 ">
        <Link to={`/detail/${product.product_id}`}>
            <picture className="flex flex-col justify-center items-center max-w-[350px] max-h-[300px] overflow-hidden bg-blued-500">
                <img src={product.image} alt={product.image} className="w-full object-cover" />
            </picture>
        </Link>
        <p className="text-xs text-clipping-1 leading-4 bg-greend-500">{product.name}</p>
        <span className="w-1/2 h-[1px] mt-4 bg-neutral-500 flex justify-center items-center">
            <span className="flex justify-center items-center gap-x-1 text-xl bg-white px-2 ">
                <span className="text-xs">$</span>
                {product.discount === 0 && <h3 className="leading-3">{product.price}</h3>}
                {product.discount !== 0 && <span className="leading-3 relative">
                    {hanlderDiscount(product.price, product.discount)}
                    <div className="absolute -top-2 left-6 text-xs px-1 rounded-sm bg-neutral-700 text-white font-light">
                        {product.discount}%
                    </div>    
                </span>}
            </span>
        </span>
    </div>
  )
}

export default CardBestSeller