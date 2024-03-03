import SectionsFooter from "../../../components/SectionsFooter/SectionsFooter"

function FooterHome() {
  return (
    <footer className="w-full bg-gradient-to-t from-[#1C1818]  to-[#292929]">
      <section className="py-10 flex justify-center items-center">
        <h2 className="font-noto font-light text-7xl text-white">Versa</h2>
      </section>
      <section className=" flex justify-center items-start py-10">
        
        <nav className="w-[70%] bg-redd-500 flex justify-center items-center space-x-3">

          <SectionsFooter 
          styleUl="space-y-2"
          styleLi="text-xs tracking-widest font-semibold text-[#777474] "
          styleTitle="text-lg font-black tracking-widest"
          options={[
            {text:"SECCIONES", url:null},
            {text:"INICIO", url:"#"},
            {text:"TIENDA", url:"#"},
            {text:"NOSOTROS", url:"#"},
            {text:"POLITICAS", url:"#"}
          ]}/>
          <SectionsFooter 
          styleUl="space-y-2"
          styleLi="text-xs tracking-widest font-semibold text-[#777474]"
          styleTitle="text-lg font-black tracking-widest"
          options={[
            {text:"CATEGORIAS", url:null},
            {text:"ROPA", url:"#"},
            {text:"TECNOLOGIA", url:"#"},
            {text:"ELECTRONICA", url:"#"},
            {text:"ACCESORIOS", url:"#"},
            {text:"DECORACION", url:"#"},
            {text:"MUEBLES", url:"#"},
          ]}/>
          <SectionsFooter 
          styleUl="space-y-2"
          styleLi="text-xs tracking-widest font-semibold text-[#777474]"
          styleTitle="text-lg font-black tracking-widest"
          options={[
            {text:"REDES", url:null},
            {text:"INSTAGRAM", url:"#"},
            {text:"TWITTER", url:"#"},
            {text:"GMAIL", url:"#"},
          ]}/>

        </nav>
        
        <article className="w-[30%] flex flex-col justify-center items-start">
          <h2 className="text-lg font-black tracking-widest text-[#777474]">CONTACTANOS</h2>
          <form className="flex justify-center items-start flex-col space-y-3">

            <div className="flex justify-center items-center flex-col">
            <input type="text" className="w-[250px] px-2 py-1 text-sm border border-neutral-500 rounded-[3px]" placeholder="Email"/>
            </div>

            <div className="flex justify-center items-center flex-col">
            <input type="text" className="w-[250px] px-2 py-1 text-sm border border-neutral-500 rounded-[3px]" placeholder="Asunto"/>
            </div>

            <div className="flex justify-center items-center flex-col">
            <textarea  className="resize-none w-[300px] h-[100px] px-2 py-1 text-sm border border-neutral-500 rounded-[3px]" placeholder="Mensaje"/>
            </div>

          </form>
        </article>
      
      </section>

      <section className="flex justify-center items-center py-5">
          <p className="text-neutral-400 font-thin text-xs ">©2023 Versaㅤ•ㅤDesigned And Developed By JC</p>
      </section>

    </footer>
  )
}

export default FooterHome


// <ul className="w-[180px] h-[200px] bg-blue-500">
//             <li>SECCIONES</li>
//             <li>Inicio</li>
//             <li>Tienda</li>
//             <li>Nosotros</li>
//             <li>Politicas</li>
//           </ul>

//           <ul className="w-[180px] h-[200px] bg-blue-500">
//             <li>CATEGORIAS</li>
//             <li>Ropa</li>
//             <li>Tecnologia</li>
//             <li>Electronica</li>
//             <li>Accesorios</li>
//             <li>Decoracion</li>
//             <li>Muebles</li>
//           </ul>

//           <ul className="w-[180px] h-[200px] bg-blue-500">
//             <li>REDES</li>
//             <li>Instagram</li>
//             <li>Twitter</li>
//             <li>Gmail</li>
//           </ul>