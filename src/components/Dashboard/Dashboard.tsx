
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


{/* <section className="w-[70%] mx-auto min-h-[250px] bg-blued-500 flex justify-start items-start py-10 flex-col bg-greend-500">
<TitleDashboard titles={[
    {text:"Imagen", width:"w-[230px] mr-2"},
    {text:"Nombre", width:"w-full"},
    {text:"Talle", width:"w-1/3"},
    {text:"Color", width:"w-1/2"},
    {text:"Cantidad", width:"w-1/3"},
    {text:"Estado", width:"w-2/3"},
    {text:"Precio", width:"w-1/2"},
    {text:"Total", width:"w-1/2"},
]}/>
{Array.isArray(data) && data?.map((purchase) => {

    const {priceTotal, PurchaseState} = purchase;
    
    return (
        <>
            {
                purchase.Products.map(({name, image, price, PurchaseProduct}) => (
                    <Dashboard values={[
                        {   value:image, type:"image", width:"w-[230px] mr-2", 
                            value2:name, width2:"w-full",
                            value3:PurchaseProduct.size, width3:"w-1/3",
                            value4:PurchaseProduct.color, width4:"w-1/2",
                            value5:PurchaseProduct.cantidad.toString(), width5:"w-1/3",
                            value6:PurchaseState.state, width6:"w-2/3",
                            value7:price.toString(), width7:"w-1/2",
                            value8:priceTotal.toString(), width8:"w-1/2"
                        }
                    ]}/>
                ))
            }
        </>
    )
})}

</section> */}