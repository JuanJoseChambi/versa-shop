import { useEffect, useState } from "react"
import { fetchDELETE } from "../../../utils/fetchDELETE";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { fetchPOST } from "../../../utils/fetchPOST";
const {VITE_URL_BASE} = import.meta.env

interface ResponseDiscountCode {
    id: number;
    code: string;
    discount: number; 
}

function CreateDiscountCode() {
    
    const [data, setData] = useState<ResponseDiscountCode[]>()
    const [discountCode, setDiscountCode] = useState<{active?:boolean, code?:string, discount?:number} | null>()

    async function getData () {
        const response = await fetch(`${VITE_URL_BASE}/discount-code`)
        const result = await response.json()
        setData(result)
    }

    async function createData() {
        const {error} = await fetchPOST(`${VITE_URL_BASE}/discount-code/create`, discountCode)
        const newData = [...data as ResponseDiscountCode[], { id: data?.length, code: discountCode?.code, discount: Number(discountCode?.discount) }];
        if(!error){
            setData(newData as ResponseDiscountCode[])
            setDiscountCode({active:true, code: "", discount: 0})
        }
    }

    async function deleteData(id:string) {
        await fetchDELETE(`${VITE_URL_BASE}/discount-code/delete/${id}`)
        const deleteDiscount = data?.filter(discount => discount.id !== Number(id))
        setData(deleteDiscount)
    }


    useEffect(() => {
        getData()
    },[])

  return (
    <section className="w-area ">

        <section className="flex justify-start items-start gap-y-5 flex-col">
            <h3 className="w-full text-start text-2xl font-semibold text-neutral-800 tracking-widest">CREAR CODIGOS DE DESCUENTO</h3>
            <p className="text-sm text-neutral-800 font-semibold "><i className="scale-150 mr-1  bx bx-info-circle"/> Seccion de Creaccion de codigos de descuento, no se puede crear codigos teniendo un rango menor a SA.</p>
            <section className="w-full flex justify-center items-start flex-col gap-x-4">
                <button className="flex justify-center items-center gap-x-2 border-l-2 border-neutral-500 text-sm font-semibold tracking-wide px-2 py-1" onClick={() => setDiscountCode({active:!discountCode?.active})}><i className="bx bx-plus"/> Crear Codigo </button>
                {discountCode?.active && <section className="w-full py-5 flex justify-center items-center flex-col gap-y-4 bg-redd-500">
                    <div className="w-[50%] flex justify-center items-center gap-x-5 sca">
                        <Input value={discountCode?.code} name="Codigo" onChange={(e) => setDiscountCode({...discountCode, code:e.target.value})}/>
                        <Input value={discountCode?.discount?.toString()} type="number" name="Descuento" onChange={(e) => setDiscountCode({...discountCode, discount:Number(e.target.value)})}/>
                    </div>
                    <Button text="Craer Descuento" onClick={createData} style="text-sm bg-neutral-800 text-white px-3 py-1 rounded-sm" iconLeft="bx bx-plus scale-90"/>
                </section>}
            </section>
            <section className="w-full flex justify-start items-center flex-col gap-x-4 divide-y divide-neutral-400">
                <ul className="w-full text-sm flex justify-between items-center py-2 border-t border-l border-r border-neutral-400">
                    <li className="bg-redd-500 w-[25%] text-center cursor-pointer">CODIGO</li>
                    <li className="bg-redd-500 w-[25%] text-center cursor-pointer">DESCUENTO</li>
                    <li className="bg-redd-500 w-[25%] text-center cursor-pointer">OPCIONES</li>
                </ul>
                {data?.map((code) => (
                    <div key={code.id} className="w-full text-sm flex justify-between items-center gap-x-2 px-2 py-2 ">
                        <h3 className="w-[25%] text-center font-semibold text-neutral-700">{code.code}</h3>
                        <h3 className="w-[25%] text-center font-semibold text-neutral-800">{code.discount} %</h3>
                        <div className="w-[25%] flex justify-center items-center gap-x-3">
                            <i className="scale-110 cursor-pointer   bx bx-edit"></i>
                            <i className="scale-110 cursor-pointer   bx bx-trash" onClick={() => deleteData(code.id.toString())}></i>
                        </div>
                    </div>
                ))}
            </section>
        </section>
    </section>
  )
}

export default CreateDiscountCode