import SectionsFooter from "../../../components/SectionsFooter/SectionsFooter"

function FooterHome() {
  return (
    <footer className="w-full bg-gradient-to-t from-[#1C1818]  to-[#292929]">
      <section className="py-10 flex justify-center items-center">
        <h2 className="font-noto font-light text-7xl text-white">Versa</h2>
      </section>
      <section className="flex justify-center bg-blued-500 items-start py-10">
        
        <nav className="w-[50%] bg-redd-500 flex justify-evenly items-start space-x-3">

          <SectionsFooter 
          styleUl="space-y-2 bg-greend-500"
          styleA="text-xs tracking-widest font-semibold text-[#777474] hover:text-white transition-color duration-500"
          styleTitle="text-sm font-black tracking-widest text-[#777474]"
          options={[
            {text:"SECCIONES", url:null},
            {text:"INICIO", url:"#"},
            {text:"TIENDA", url:"#"},
            {text:"NOSOTROS", url:"#"},
            {text:"POLITICAS", url:"#"}
          ]}/>
          
          <SectionsFooter 
          styleUl="space-y-2 bg-greend-500"
          styleA="text-xs tracking-widest font-semibold text-[#777474] hover:text-white transition-color duration-500"
          styleTitle="text-sm font-black tracking-widest text-[#777474]"
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
          styleA="text-xs tracking-widest font-semibold text-[#777474] hover:text-white transition-color duration-500"
          styleTitle="text-sm font-black tracking-widest text-[#777474]"
          options={[
            {text:"REDES", url:null},
            {text:"INSTAGRAM", url:"#"},
            {text:"TWITTER", url:"#"},
            {text:"GMAIL", url:"#"},
          ]}/>

        </nav>
      
      </section>

      <section className="flex justify-center items-center py-5">
          <p className="text-neutral-400 font-thin text-xs ">©2023 Versaㅤ•ㅤDesigned And Developed By JC</p>
      </section>

    </footer>
  )
}

export default FooterHome
