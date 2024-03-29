// import StreetWear from "../../../assets/RetroImage.jpeg"
import UrbanStreetWear from "../../../assets/UrbanStreetwear.jpeg"


function HeaderShop() {
  return (
    <header className={`w-full h-[350px] overflow-hidden relative flex justify-center items-center bg-cover bg-fixed bg-bottom`} 
    style={{ backgroundImage: `url(${UrbanStreetWear})` }}>

        <section className="absolute mt-28 mb-10 flex justify-center items-center bg-blud-500">
            <h2 className="text-8xl text-white tracking-widest">SHOP</h2>
        </section>

    </header>
  )
}

export default HeaderShop