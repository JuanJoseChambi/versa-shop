
interface DashboardProp {
    titles:TitlesAtributes[];
}

interface TitlesAtributes {
    text:string;
    width:string;
}

function Dashboard({ titles }:DashboardProp) {
  return (
    <>
        <section className="w-full h-[30px] text-sm text-neutral-500 text-center flex justify-center items-center bg-redd-500 border-b border-neutral-500 divide-x divide-neutral-400">
            {titles.map((title) => (
                <div className={`${title.width}`}>{title.text}</div>
            ))}
        </section>
        <section className="w-full min-h-[60px] max-h-[60px] flex justify-between items-center text-center divide-x divide-neutral-400 bg-blued-500">
            <picture className="w-[500px] rounded-lg overflow-hidden flex justify-center items-center">
                <img src="" alt="" className="w-full" />
            </picture>
            <div className="w-[100%] text-sm">
                <h3 className="break-words">Campera Nike</h3>
            </div>
            <div className="w-[100%] text-sm">
                <h3>Ropa</h3>
            </div>
            <div className="w-[100%] text-sm">
                <h3>Camperas</h3>
            </div>
            <div className="w-[100%] text-sm">
                <h3>Verde</h3>
            </div>
            <div className="w-[50%] text-sm">
                <h3>XL</h3>
            </div>
            <div className="w-[50%] text-sm">
                <h3>3</h3>
            </div>
            <div className="w-[50%] text-sm">
                <h3>$ 80</h3>
            </div>
        </section>
    </>
  )
}

export default Dashboard