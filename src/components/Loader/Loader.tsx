
interface LoaderProp {
    active:boolean | undefined;
}

function Loader({active}:LoaderProp) {

    if (!active) return

  return (
    <main className="w-full h-screen fixed top-0 left-0 flex justify-center items-center flex-col bg-white z-[110]">
      <section className="my-auto flex justify-center items-center flex-col gap-y-4">
        <i className="bx bx-loader-alt bx-spin text-3xl text-neutral-800"></i>
        <h3 className="text-sm text-neutral-700 font-semibold tracking-widest animate-pulse">LOADING</h3>
      </section>
      <div className="w-[90%] h-[91vh] md:hidden absolute border border-neutral-800 rounded-sm"></div>
      <h3 className="absolute bottom-5 text-3xl font-noto font-light px-3 bg-white">VERSA</h3>
    
    </main>
  )
}

export default Loader