
interface LoaderProp {
    active:boolean | undefined
}

function Loader({active}:LoaderProp) {

    if (!active) return

  return (
    <main className="w-full h-screen absolute top-0 left-0 flex justify-center items-center bg-white z-[110]">Loader</main>
  )
}

export default Loader