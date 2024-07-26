interface MethodsPaymentProp {
    onClick?: () => void;
    image?:string | React.ReactNode;
    method?:string;
    typeImage?:string
}

function MethodsPayment ({onClick, image, method, typeImage}:MethodsPaymentProp) {
    return (
        <div className={`w-full min-h-[80px] relative hover:bg-neutral-200 cursor-pointer transition-colors duration-700 flex justify-center items-center flex-col flex-1 bg-blued-500`} 
                onClick={onClick}>
                <picture className="flex gap-x-2">
                    {typeImage === "img" && typeof image === "string" ? <img src={image}/> : image}
                </picture>
                <h3 className="text-xs tracking-widest font-semibold text-neutral-800">{method}</h3>
                <i className="absolute right-8 scale-150 text-[#393939]  bx bx-chevron-right"/>
        </div>
    )
}

export default MethodsPayment