import { useState } from "react";
interface PropImageMagnifier {
    imageUrl: string
}
function ImageZoom({imageUrl}:PropImageMagnifier) {
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
  
    return ( 
    <div className="w-full h-full max-h-full lg:w-[45%] flex justify-center items-center">
        {/* <div className="min-w-[100%] max-w-[900px] min-h-[40vh] md:min-w-[45%] md:h-full relative flex justify-center items-center overflow-hidden bg-blue-500"> */}
        <picture
            className="max-w-[90%] h-[100%] flex justify-center items-center
            lg:min-w-[100%] lg:h-full bg-cover bg-center bg-red-500 border border-blackd"
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