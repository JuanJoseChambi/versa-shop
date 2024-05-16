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
      <div className="w-[45%] h-full relative flex justify-center items-center overflow-hidden bg-blue-500">
        <div
            className="w-[100%] h-full bg-cover bg-center bg-red-500 border border-blackd"
            // className="w-[500px] h-[500px] bg-cover bg-center bg-red-500 border border-black"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        {isZoomVisible && (
        <div
            className="w-[100px] h-[100px] absolute z-10 border-2 border-white pointer-events-none -translate-y-16  -translate-x-5"
            style={{
                left: client.x, 
                top: client.y,
            }}>
            
                <div className="w-full h-full" style={{ 
                    backgroundImage: `url(${imageUrl})`,
                    backgroundPosition: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`,}}></div>
            </div>
        )}
        
        
      </div>
    );
}

export default ImageZoom