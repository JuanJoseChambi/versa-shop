
function ViewNotFound() {
  return (
    <section className="w-full h-96 absolute left-0 flex justify-center items-center flex-col bg-redd-500">
        <i className="bx bx-error text-[130px] text-rose-600"/>
        <h4 className="text-neutral-800 font-semibold tracking-wide">Pagina no encontrada</h4>
        <p className="text-neutral-800 py-2 text-sm text-center">Error de enrutamiento, verifique la Url y asegurese de direccionar a la pagina deseada.</p>
        {/* <div className="w-1/2 h-[1px] absolute -bottom-20 bg-neutral-500 flex justify-center items-center"><p className="bg-white px-2 text-neutral-800 font-semibold font-noto">Versa</p></div> */}
    </section>
  )
}

export default ViewNotFound