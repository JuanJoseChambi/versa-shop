
interface LoaderProp {
    active:boolean
}

function Loader({active}:LoaderProp) {

    if (!active) return

  return (
    <main className="w-full h-screen absolute top-0 left-0 flex justify-center items-center">Loader</main>
  )
}

export default Loader