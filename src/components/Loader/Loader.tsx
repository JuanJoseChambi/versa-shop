
interface LoaderProp {
    active:boolean | undefined;
    label?:string;
}

function Loader({active, label}:LoaderProp) {

    if (!active) return

  return (
    <main className="w-full h-screen fixed top-0 left-0 flex justify-center items-center flex-col bg-white z-[110]">
      <section className="my-auto flex justify-center items-center flex-col gap-y-4">
        <i className="bx bx-loader-alt bx-spin text-3xl "></i>
        <h3 className="text-2xl text-neutral-700 font-semibold tracking-widest">LOADING</h3>
      </section>
      <section className="absolute bottom-5 flex justify-center items-center flex-col">
        <h3 className="text-3xl font-noto">VERSA</h3>
        <h4 className="text-sm font-noto text-neytral-700">{label}</h4>
      </section>
    </main>
  )
}

export default Loader