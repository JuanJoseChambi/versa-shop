import { useEffect, useState } from "react"
import { uploadImageToCloudinary } from "../../../utils/uploadImageToCloudinary";
import ClipboardButton from "../../../components/ClipboardButton/ClipboardButton";
import { fetchPOST } from "../../../utils/fetchPOST";
// import { error as ErrorAlert } from "../../../utils/alert";
const {VITE_URL_BASE} = import.meta.env


function CreateJsonProducts() {
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [urlImage, setUrlImage] = useState<string | null>(null)
    const [textJson, setTextJson] = useState<string | null>(null)
    const [tested, setTested] = useState<boolean>(false)
    const [sentJsonText, setSentJsonText] = useState<string | null>(null)

    async function handlerPreviewImage (e:React.ChangeEvent<HTMLInputElement>) {
        
        if (!e.target.files) return null;

        const file = e.target.files[0]
        const imageUrl = await uploadImageToCloudinary(file)
        imageUrl && setUrlImage(imageUrl as string)
        
        const reader = new FileReader()
        reader.onload = () => {
            setPreviewImage(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    async function handlerCreate () {
        if(!textJson) return;
        await fetchPOST(`${VITE_URL_BASE}/product/bulk-create`, JSON.parse(textJson))
        setSentJsonText(textJson)
    }

    async function handlerTestJson () {
        if(!textJson) return;
        const jsonParsed = JSON.parse(textJson)
        if(jsonParsed.length === 0) return
        if(textJson !== sentJsonText) setTested(false)
        // const textJsonOne = textJson;
        const {error} = await fetchPOST(`${VITE_URL_BASE}/product/test-json`, JSON.parse(textJson))
        // if(!error) textJsonOne === textJson && setTested(true) 
        !error && setTested(true)
    }

    useEffect(() => {
        handlerTestJson()
        // if(textJson !== null && sentJsonText !== null && textJson === sentJsonText) setTested(true)
    },[textJson])


    return (
    <section className="w-area">
        <h3 className="w-full text-start text-2xl font-semibold text-neutral-800 tracking-widest">CREAR PRODUCTOS JSON</h3>
        <section className="w-full min-h-[35vh] py-7 md:py-0 flex justify-center items-center flex-col gap-y-5 bg-blued-500">
            <section className="w-[70%] min-h-[225px] flex justify-between items-center flex-col md:flex-row bg-redd-500">
                <picture className="relative min-w-[150px] min-h-[200px] max-w-[200px] max-h-[200px] overflow-hidden flex justify-center items-center bg-greend-500 shadow-lg shadow-neutral-600">
                    <div className={`${!previewImage ? "w-[200px] h-[200px] border border-neutral-300 bg-redd-500 bg-transparent" : "hidden"}`}>
                        <label htmlFor="imageUpload">
                            <i className="bx bx-image-add text-neutral-600 w-full h-full flex justify-center items-center bg-[#0000001f] text-4xl duration-500 z-10 cursor-pointer"></i>
                        </label>
                        <input type="file" id="imageUpload" className="hidden" accept="image/*" onChange={handlerPreviewImage}/>
                        
                    </div>
                    {previewImage && <img src={previewImage} alt="" className={`w-[100%] h-auto object-cover `}/>}
                    {previewImage && <button onClick={() => {setPreviewImage(null), setUrlImage(null)}} className="absolute top-2 right-2 z-10 flex justify-center items-center rounded-full bg-white border border-neutral-400"><i className="bx bx-x"/></button>}
                </picture>
                <div className="min-w-[300px] max-w-[500px] min-h-[20px] mt-6 md:my-0 bg-white px-2 py-1 text-sm font-semibold flex justify-center items-center gap-x-3 divide-x divide-neutral-400 border border-neutral-400 rounded-md">
                    <h3 className="w-full line-clamp-1 text-wrap text-neutral-700 bg-redd-500">{urlImage ? urlImage : "Url de Imagen"}</h3>
                    <ClipboardButton text={urlImage ? urlImage : null} style="px-2"/>
                </div>
            </section>
        </section>
        <section className="w-full bg-redd-500">
            <textarea className="w-full md:w-[90%] h-[50vh] outline-none resize-none border border-neutral-500 p-2 text-sm" onChange={(e) => setTextJson(e.target.value)} placeholder="Ingresa el JSON" ></textarea>
        </section>
        <section className="flex justify-start items-center gap-x-4">
            <button className={`${tested ? "bg-neutral-800 text-white" : "bg-neutral-300 text-neutral-600 select-none pointer-events-none" } px-2 py-1 text-sm font-semibold rounded-sm`} onClick={handlerCreate}>Crear Productos</button>
            <button className="px-2 py-1 text-sm font-semibold bg-neutral-800 text-white rounded-sm" onClick={handlerTestJson}>Testear Json</button>
            <button className="px-2 py-1 text-sm font-semibold bg-neutral-800 text-white rounded-sm">Eliminar Valor TextArea</button>
        </section>
    </section>
  )
}

export default CreateJsonProducts