import { useState } from "react";
interface PropImageMagnifier {
    imageUrl: string;
    carusel?: boolean;
}
function ImageZoom({imageUrl, carusel= false}:PropImageMagnifier) {
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isZoomVisible, setIsZoomVisible] = useState(false);
    const [client, setClient] = useState({ x: 0, y: 0 });
  
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLDivElement;
        const {clientX, clientY} = e
        setClient({ x: clientX, y: clientY });
        const { left, top, width, height } = target.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setZoomPosition({ x, y });
    
      setIsZoomVisible(true);
    };
  
    const handleMouseLeave = () => {
      setIsZoomVisible(false);
    };
    const images = [imageUrl, imageUrl, imageUrl, imageUrl, imageUrl, imageUrl, imageUrl, imageUrl, imageUrl]
    return ( 
    <div className="w-full h-full max-h-full lg:w-[45%] flex justify-center items-center flex-col lg:flex-row bg-blued-500">

      {carusel && <div className="w-[90%] mx-auto h-[150px] lg:w-[100px] lg:h-full flex-row lg:flex-col relative flex justify-start items-center  gap-x-2 lg:gap-y-2 order-2 lg:order-1 overflow-x-auto lg:overflow-hidden bg-redd-500">

        <button className="w-[30px] h-full lg:w-full lg:h-[40px] text-2xl text-neutral-800 flex justify-center items-center lg:items-start bg-gradient-to-r lg:bg-gradient-to-b from-white to-tranparent sticky left-0 lg:top-0">
          <i className='bx bx-chevron-up hidden lg:block'></i>
          <i className='bx bx-chevron-left block lg:hidden'></i>
        </button>
        {images.map(images => (
          <picture className="min-w-[85px] min-h-[85px] max-w-[85px] max-h-[85px] flex justify-center items-center cursor-pointer border border-neutral-300">
            <img src={images} alt="" className="w-full h-full object-cover"/>
          </picture>
        ))}

        <button className="w-[30px] h-full lg:w-full lg:h-[40px] text-2xl text-neutral-800 flex justify-center items-center lg:items-end bg-gradient-to-l lg:bg-gradient-to-t from-white to-tranparent sticky -right-0 lg:bottom-0">
          <i className='bx bx-chevron-down hidden lg:block'></i>
          <i className='bx bx-chevron-right block lg:hidden'></i>
        </button>
      </div>}

        <picture
            className={`max-w-[90%] h-[100%] flex justify-center items-center order-1 lg:order-2
            ${carusel ? "lg:min-w-[80%]" : "lg:min-w-full"} lg:h-full bg-cover bg-center bg-red-500 border border-neutral-200`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            // style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <img src={imageUrl} alt="" className="w-full h-full object-cover flex justify-center items-center"/>
        </picture>
        {isZoomVisible && (
        <div
            className="hidden lg:flex w-[100px] h-[100px] justify-center items-center overflow-hidden absolute z-10 border-2 border-white pointer-events-none -translate-y-12 -translate-x-12"
            style={{
                left: client.x, 
                top: client.y,
            }}>
                  <div className="w-full h-full scale-[2] flex justify-center items-center" style={{ 
                    backgroundImage: `url(${imageUrl})`,
                    backgroundPosition: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`,}}></div>
            </div>
        )}
        
        
      </div>
    );
}

export default ImageZoom