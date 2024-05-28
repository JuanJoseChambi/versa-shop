
interface PropWithoutResul {
    visible:boolean
}

function WithoutResult({visible}:PropWithoutResul) {

    if(!visible) return null

  return (
    <div className="w-full h-[150px] relative flex justify-center items-center border border-neutral-300 bg-redd-500 text-neutral-700 tracking-widest">
        <h3 className="text-sm font-bold">NO EXISTEN RESULTADOS</h3>
        {/* <h3>No existen resultados</h3> */}
        <h4 className="px-4 font-noto text-neutral-700 absolute -bottom-3 bg-white">Versa</h4>
    </div>
  )
}

export default WithoutResult