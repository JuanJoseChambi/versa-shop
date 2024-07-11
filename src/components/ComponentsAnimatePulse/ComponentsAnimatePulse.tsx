
interface Pulse {
    active:boolean
}

export function DashboardProductPulse ({active}:Pulse) {

    if(!active) return

    return (
        <div className={`w-full h-[70px] -z-10 bg-redd-500 flex justify-center items-center md:divide-x md:divide-neutral-400 bg-redd-500 border-b border-neutral-300 `}>

            <div className={`hidden md:block w-[175px] h-[50px] mr-3 bg-neutral-400 rounded-md animate-pulse`}></div>
            <h3 className="w-full max-md:hidden pl-1 flex justify-start items-center">
                <p className="w-[200px] h-4 bg-neutral-400 rounded-md animate-pulse"></p>
            </h3>
            <h4 className="w-1/3 max-md:hidden text-center flex justify-center items-center">
                <p className="w-[50px] h-4 bg-neutral-400 rounded-md animate-pulse"></p>
            </h4>
            <h3 className="w-1/3 max-md:hidden text-center flex justify-center items-center">
                <p className="w-[50px] h-4 bg-neutral-400 rounded-md animate-pulse"></p>
            </h3>
            <h4 className="w-1/3 max-md:hidden text-center flex justify-center items-center">
                <p className="w-[50px] h-4 bg-neutral-400 rounded-md animate-pulse"></p>
            </h4>
            <h3 className="w-1/3 max-md:hidden text-center flex justify-center items-center">
                <p className="w-[80px] h-4 bg-neutral-400 rounded-md animate-pulse"></p>
            </h3>
            <div className="w-1/2 h-full text-sm hidden md:flex justify-start items-center flex-col overflow-auto scroll gap-y-2">
                <div className="w-full mx-auto min-h-[20px] max-h-[20px] relative flex justify-start items-center text-sm py-4 px-1 bg-neutral-400 rounded-md animate-pulse"></div>
                <div className="w-full mx-auto min-h-[20px] max-h-[20px] relative flex justify-start items-center text-sm py-4 px-1 bg-neutral-400 rounded-md animate-pulse"></div>
            </div>
            
            {/* View Mobile --------------------------------------------------------------------------- */}
            <picture className="hidden max-md:flex min-w-[70px] h-[70px] bg-neutral-400 rounded-md animate-pulse"></picture>

            <section className="w-full md:hidden pl-1 ">
                <div className="w-full flex justify-start items-center text-neutral-800 font-bold tracking-wider">
                    <h3 className="w-24 h-4 bg-neutral-400 rounded-md animate-pulse"></h3>
                    <h3 className=" ml-auto mr-5 w-5 h-4 bg-neutral-400 rounded-md animate-pulse"></h3>
                </div>
                <div className="text-sm text-neutral-600 flex justify-start items-center gap-x-1">
                    <h4 className="w-14 h-4 bg-neutral-400 rounded-md animate-pulse"></h4>
                    <h4>|</h4>
                    <h4 className="w-14 h-4 bg-neutral-400 rounded-md animate-pulse"></h4>
                </div>
                <h3 className="w-14 h-4 bg-neutral-400 rounded-md animate-pulse"></h3>
            </section>

            <section className="min-w-[110px] h-full bg-redd-500 overflow-y-auto flex md:hidden justify-start items-start flex-col gap-y-2">

                <div className="w-full mx-auto min-h-[20px] max-h-[20px] h-4 bg-neutral-400 rounded-md animate-pulse"></div>
                <div className="w-full mx-auto min-h-[20px] max-h-[20px] h-4 bg-neutral-400 rounded-md animate-pulse"></div>
                
            </section>
            
            {/* ------------------------------------------------------------------------------------------ */}

            <div className="w-1/3 flex justify-center items-center gap-x-2">
                <div className="w-3 h-3 bg-neutral-400 rounded-md animate-pulse"></div>
                <div className="w-3 h-3 bg-neutral-400 rounded-md animate-pulse"></div>
                <div className="w-3 h-3 bg-neutral-400 rounded-md animate-pulse"></div>
            </div>
        </div>
    )
}


export function SalesPulse ({active}:Pulse) {

    if(!active) return;


    return (
        <>
            <div className="hidden sm:flex sm:w-full h-[40px] border border-neutral-400 justify-around items-center bg-blued-500 px-3 gap-x-3 cursor-pointer -z-10" >
                <div className="w-[20%] h-5 rounded-md bg-neutral-400 animate-pulse"></div>
                <div className="w-[20%] h-5 rounded-md bg-neutral-400 animate-pulse"></div>
                <div className="w-[20%] h-5 rounded-md bg-neutral-400 animate-pulse"></div>
                <div className="w-[20%] h-5 rounded-md bg-neutral-400 animate-pulse"></div>
            </div>

            <div className="flex sm:hidden w-full h-[50px] border border-neutral-400 justify-between items-center bg-blued-500 gap-x-3 cursor-pointer -z-10" >
                <div className="w-[20%] h-5 rounded-md bg-neutral-400 animate-pulse"></div>
                <div className="w-[20%] h-5 rounded-md bg-neutral-400 animate-pulse"></div>
                <div className="w-[10%] h-5 rounded-md bg-neutral-400 animate-pulse"></div>
                <div className="w-[25%] flex justify-center items-center gap-x-2 bg-redd-500">
                    <div className="w-[30%] h-5 rounded-md bg-neutral-400 animate-pulse"></div>
                    <div className="w-[30%] h-5 rounded-md bg-neutral-400 animate-pulse"></div>
                </div>
            </div>
        </>
    )
}