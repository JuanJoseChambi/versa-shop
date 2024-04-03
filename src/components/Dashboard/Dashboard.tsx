
interface DashboardProp {
    values:ValuesDashboard[];
}


interface ValuesDashboard {
    value?:string;
    value2?:string;
    value3?:string;
    value4?:string;
    value5?:string;
    value6?:string;
    value7?:string;
    value8?:string;
    value9?:string;
    value10?:string;
    width?:string;
    width2?:string;
    width3?:string;
    width4?:string;
    width5?:string;
    width6?:string;
    width7?:string;
    width8?:string;
    width9?:string;
    width10?:string;
    type?:string
}

function Dashboard({ values }:DashboardProp) {
  return (
        
        <section className="w-full min-h-[60px] max-h-[60px] flex justify-between items-center text-center text-sm divide-x divide-neutral-400 bg-blued-500">
            {values.map(value => (
                <>
                    {value.type === "image" && value.value && 
                    <picture className={`${value.width} overflow-hidden flex justify-center items-center`}>
                        <img src={value.value} alt="Image Not Found" className=""/>
                    </picture> }
                    {value.value2 && <h3 className={value.width2}>{value.value2}</h3> }
                    {value.value3 && <h3 className={value.width3}>{value.value3}</h3> }
                    {value.value4 && <h3 className={value.width4}>{value.value4}</h3> }
                    {value.value5 && <h3 className={value.width5}>{value.value5}</h3> }
                    {value.value6 && <h3 className={value.width6}>{value.value6}</h3> }
                    {value.value7 && <h3 className={value.width7}>{value.value7}</h3> }
                    {value.value8 && <h3 className={value.width8}>{value.value8}</h3> }
                    {value.value9 && <h3 className={value.width9}>{value.value9}</h3> }
                    {value.value10 && <h3 className={value.width10}>{value.value10}</h3> }
                </>
            ))}
        </section>
        
  )
}

export default Dashboard


