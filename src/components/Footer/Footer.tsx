
function Footer() {
  return (
    <footer className="w-full h-[125px] bg-neutral-800 mt-auto ">
        
        <section className="w-full h-full flex justify-center items-center flex-col bg-red-500">
            <section className="w-full flex justify-center items-center">
                <section className="w-1/3 flex justify-center items-center bg-green-500">
                    <h2 className="font-noto text-2xl font-semibold text-white">Versa</h2>
                </section>

                <section className="w-1/2 flex justify-center items-center">
                    <ul>
                        <li>Categorias</li>
                        <li>Camperas</li>
                        <li>Pantalones</li>
                        <li>Remeras</li>
                        <li>Zapatillas</li>
                    </ul>
                    <ul>
                        <li>Nosotros</li>
                        <li>Valores</li>
                        <li>Ayuda</li>
                        <li>Sponsors</li>
                        <li>Marcas</li>
                    </ul>
                    <ul>
                        <li>Ayuda</li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <ul>
                        <li>Terminos</li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </section>

            </section>
                
            <section>
                <h3 className="text-white">© 2024 Versa. Todos los derechos reservados.</h3>
            </section>
        </section>

    </footer>
  )
}

export default Footer