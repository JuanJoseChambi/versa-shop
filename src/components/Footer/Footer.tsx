
function Footer() {


    function liOptions (title:string) {
        return (
            <ul className="min-w-[125px] text-center sm:text-start text-sm space-y-5 bg-redd-500">
                <li className="text-sm tracking-widest font-bold text-white">{title}</li>
                <li className="tracking-wider cursor-pointer text-neutral hover:text-white font-extralight text-neutral-400">Camperas</li>
                <li className="tracking-wider cursor-pointer text-neutral hover:text-white font-extralight text-neutral-400">Pantalones</li>
                <li className="tracking-wider cursor-pointer text-neutral hover:text-white font-extralight text-neutral-400">Remeras</li>
                <li className="tracking-wider cursor-pointer text-neutral hover:text-white font-extralight text-neutral-400">Zapatillas</li>
            </ul>
        )
    }


  return (
    <footer className="w-full h-auto relative bg-neutral-800 mt-auto ">
        
        <section className="w-full h-full flex justify-evenly items-center flex-col bg-redd-500">
            <section className="w-full py-14 flex justify-around items-center flex-col gap-y-9 lg:gap-0 lg:flex-row bg-yellowd-500">

                <section className="w-[30%] relative flex justify-center items-center bg-greend-500">
                    <h2 className="font-noto text-4xl font-semibold tracking-widest text-white">Versa</h2>
                </section>

                <section className="w-full lg:w-[50%] flex justify-evenly lg:justify-between gap-y-10 sm:gap-0 items-start flex-wrap bg-blued-500">
                        {liOptions("CATEGORIAS")}
                        {liOptions("NOSOTROS")}
                        {liOptions("SOPORTES")}
                        {liOptions("TERMINOS")}
                </section>

            </section>

            <section className="w-area py-10 border-t border-b border-neutral-700 flex justify-between items-center flex-col gap-y-8 lg:flex-row lg:gap-0 bg-violetd-500 ">
                <section className="text-white text-center lg:text-start space-y-3">
                    <h3 className="font-semibold">Suscríbete a nuestra tienda</h3>
                    <h3 className="text-sm font-light">Las últimas noticias, artículos y recursos, enviados a su bandeja de entrada semanalmente.</h3>
                </section>
                <section>
                    <input type="text" placeholder="Ingresa tu correo" className="text-sm text-white outline-none bg-transparent "/>
                    <button className="text-sm text-white py-1 px-2 bg-neutral-500 rounded-sm">Suscribirme</button>
                </section>
            </section>
                
            <section className="w-area bg-greend-500 py-5 flex justify-between items-center flex-col gap-y-5 sm:gap-0 sm:flex-row">
                <h3 className="order-2 sm:order-1 text-white text-xs">© 2024 Versa. Todos los derechos reservados.</h3>
                <section className="order-1 sm:order-2 text-white text-[25px] flex justify-center items-center gap-x-5">
                    <i className='bx bxl-facebook-circle'></i>
                    <i className='bx bxl-instagram' ></i>
                    <i className='bx bxl-twitter'></i>
                    <i className='bx bxl-github'></i>
                    <i className='bx bxl-youtube'></i>
                    
                </section>
            </section>
        </section>

    </footer>
  )
}

export default Footer