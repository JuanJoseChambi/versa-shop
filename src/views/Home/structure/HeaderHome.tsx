import women from "../../../assets/asHome/womenHeader.webp"
function HeaderHome() {
  return (
    <header className="bg-gradient-to-r from-[#EAEAEA] to-[#E5E5E5] w-full h-screen flex justify-center items-center flex-col space-y-3 text-lg tracking-widest">
      <picture className="w-[50%] absolute bottom-0 flex justify-center items-center pointer-events-none ">
        <img src={women} alt="Women" className="select-none object-cover bg-fixed bg-cover"/>
      </picture>
      <h2 className="z-0 text-9xl font-thin tracking-widest ">Versa</h2>
      <h1 className="z-0 w-[750px] text-center text-sm pb-36 italic"><b className="text-5xl">"</b>Descubre la elegancia y versatilidad en cada compra con Versa: tu destino exclusivo para tecnología de vanguardia, moda exquisita y una variedad de productos</h1>
    </header>
  )
}

export default HeaderHome