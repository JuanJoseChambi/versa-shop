// import StreetWear from "../../../assets/RetroImage.jpeg"
import UrbanStreetWear from "../../../assets/UrbanStreetwear.jpeg"


function HeaderShop() {
  return (
    <header className={`w-full h-[350px] overflow-hidden relative flex justify-center items-center bg-cover bg-fixed bg-bottom `} 
    style={{ backgroundImage: `url(${UrbanStreetWear})` }}>
        <div className="w-full h-1/4 bg-redd-500 absolute top-0 bg-gradient-to-t from-transparent to-neutral-800"></div>
        <section className="absolute mt-28 mb-10 flex justify-center items-center bg-blud-500 ">
            <h2 className="text-8xl text-white tracking-widest font-noto backdrop-invert px-4 rounded-sm" style={{fontSize:"clamp(65px, 7vw, 100px)"}}>Tienda</h2>
        </section>

    </header>
  )
}

export default HeaderShop