import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import { AllProducts } from "../../../interfaces/interfaces";
import { imagesTypeProducts } from "../../../utils/HomeData/HomeData";
import flowerWhite from "../../../assets/asHome/FlowerWhite.png"

function MainHome() {
  const [dataProducts,setDataProducts] = useState<AllProducts | undefined>(undefined)
  
  const { data, error, loading } = useApi("https://product-api-backend-production.up.railway.app/api/v1/product/filter/?category=busos&type=tecnologia");
  // const { data, error, loading } = useApi("https://product-api-backend-production.up.railway.app/api/v1/product/filter/?category=busos");
  

  useEffect(() => {
    setDataProducts(data as AllProducts)
  },[data])

  
  return (
    <main className="">
      <section className="w-full h-auto my-2 flex justify-center items-center flex-wrap 1xl:space-x-2 max-1xl:space-y-2 bg-redd-500 overflow-hidden">

          <section className="w-[49%] max-1xl:w-[1340px] flex flex-wrap justify-center items-center space-x-2 bg-blued-500">
            {imagesTypeProducts.slice(0,2).map(product => (
              <picture key={product.info} className="flex-1 h-[350px] max-1xl:w-[48%] max-1xl:h-[500px] relative flex justify-center items-center bg-greend-500 overflow-hidden">
                <div className="w-full h-full bg-[#3a3939b0] absolute right-0 bottom-0 flex justify-center items-center">
                  <p className="text-white text-3xl font-noto font-normal tracking-[15px] text-center">{product.type}</p>
                </div>
                <img src={product.image} alt="" className="w-[70%]" />
              </picture>
            ))}
          </section>

          <section className="w-[49%] max-1xl:w-[1340px] flex flex-wrap justify-center items-center space-x-2 bg-blued-500">
            {imagesTypeProducts.slice(2,4).map(product => (
              <picture key={product.info} className="flex-1 h-[350px] max-1xl:w-[48%] max-1xl:h-[500px] relative flex justify-center items-center bg-greend-500 overflow-hidden">
                <div className="w-full h-full bg-[#3a3939b0] absolute right-0 bottom-0 flex justify-center items-center">
                  <p className="text-white text-3xl font-noto font-normal tracking-[15px] text-center">{product.type}</p>
                </div>
                <img src={product.image} alt="" className="w-[70%]" />
              </picture>
            ))}
          </section>
          
      </section>

      <article className="flex flex-col justify-center items-center my-20 space-y-5">
        <h2 className="font-noto font-light tracking-widest text-4xl">Versatilidad</h2>
        <p className="w-[70%] text-center font-light italic tracking-widest text-pretty"><b className="font-noto font-black tracking-widest">Versa</b>, tu destino para descubrir elegancia y funcionalidad en cada compra.<br/>
        combinamos estilo y tecnología para ofrecerte lo mejor en moda y dispositivos innovadores.<br/><br/>
        Explora nuestra amplia gama de productos, desde moda vanguardista hasta lo último en tecnología. Siempre encontrarás algo que se adapte a tu estilo de vida.</p>
      </article>


      <section className="area flex justify-center items-center flex-col my-20">

        <h2 className="text-4xl font-noto font-light tracking-widest">Productos Destacados</h2>

        <section className="area flex justify-center items-center flex-wrap bg-redd-500 py-16 gap-4 xl:gap-x-4 ">
          {dataProducts?.results?.slice(4,8).map((product) => (
            <article key={product._id} className="max-w-[276px] min-h-[440px] flex justify-between items-start flex-col border border-neutral-300 p-3">
              <picture className="w-[250px] min-h-[320px] flex justify-center items-center overflow-hidden bg-blued-500 ">
                <img src={product.image} alt="" className="w-[80%]"/>
              </picture>
              <h5 className="font-semibold tracking-wider">{product.name}</h5>
              <p className="font-light">$ {product.price}</p>
            </article>
          ))}
          {dataProducts?.results?.slice(0,4).map((product) => (
            <article key={product._id} className="max-w-[276px] min-h-[440px] flex justify-between items-start flex-col border border-neutral-300 p-3">
              <picture className="w-[250px] min-h-[320px] flex justify-center items-center overflow-hidden bg-blued-500 ">
                <img src={product.image} alt="" className="w-[80%]"/>
              </picture>
              <h5 className="font-semibold tracking-wider">{product.name}</h5>
              <p className="font-light">$ {product.price}</p>
            </article>
          ))}
        </section>

      </section>

      <section className="w-full h-[400px] relative overflow-hidden bg-gradient-to-t from-[#2D2D2D] to-[#3d3d3d] flex justify-center items-center">
            <picture className="w-[50%] h-[400px] bg-redd-500 flex justify-center items-center absolute overflow-hidden ">
              <img src={flowerWhite} alt="" className="bg-redd-500 w-[100%]" />
            </picture>
            <p className="area w-[70%] z-0 text-center text-white font-noto tracking-widest">Sumérgete en la experiencia de Versa, donde tus elecciones de moda y tecnología se entrelazan con tu historia personal. Cada compra es un paso más hacia la expresión auténtica de tu estilo de vida.</p>
      </section>

      <article className="area h-[300px] flex flex-col justify-center items-center space-y-5">
          <h2 className="text-4xl font-noto font-light tracking-widest">Únete a nuestra comunidad</h2>
          <p className="text-sm font-light">Recibe actualizaciones, ofertas y contenido exclusivo directamente en tu bandeja de entrada. No te pierdas nada.</p>

          <form className=" w-[40%] flex justify-between items-center rounded-sm overflow-hidden border border-neutral-400 ">
            <input type="email" className="outline-none px-3 py-2 w-full" placeholder="Ingrese Email"/>
            <button className="bg-black text-white h-full flex justify-center items-center px-3 gap-1">
              <i className='text-lg bx bxs-bell-plus' ></i>
              Suscribirse
            </button>
          </form>
          
      </article>

    </main>
  )
}

export default MainHome