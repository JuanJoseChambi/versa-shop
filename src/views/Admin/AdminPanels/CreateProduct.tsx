import { useState } from "react"
import Input from "../../../components/Input/Input";
import Textarea from "../../../components/Textarea/Textarea";
import useApi from "../../../hooks/useApi";
import Filters from "../../../components/Filters/Filters";
import Button from "../../../components/Button/Button";
import { fetchPOST } from "../../../utils/fetchPOST";
import { error, success } from "../../../utils/alert";
import { ResponseData } from "../../../interfaces/interfaces";
import { uploadImageToCloudinary } from "../../../utils/uploadImageToCloudinary";
import {Filters as FiltersInterface} from "../../../interfaces/components"
// import { uploadImageToCloudinary } from "../../../utils/uploadImageToCloudinary";
// const {VITE_PRESET_KEY} = import.meta.env

interface StructureNewProduct {
    name: string;
    // image: FormData | null;
    // image: File | null;
    image: string;
    description: string;
    price: number;
    category: string;
    type: string;
    stocks: Stocks[];
}

interface Stocks {
    unit:number;
    size:string;
    color:string,
    hxaColor:string
}


function CreateProduct() {
    
    const [newProduct, setNewProduct] = useState<StructureNewProduct>({
        name:"",
        image: "",
        // image: "",
        description:"",
        price:0,
        category:"",
        type:"",
        stocks:[]
    })

    const [stock, setStock] = useState<Stocks>({
        unit:0,
        size:"",
        color:"",
        hxaColor:""
    })
    
    const {data} = useApi("http://localhost:3001/product/filters") as {data:FiltersInterface}

    const categories = data?.categories?.map(categorie => categorie?.category)
    const types = data?.types?.map(type => type?.type)
    const sizes = data?.sizes?.map(size => size?.size)

    const [previewImage, setPreviewImage] = useState("")
    // const [fileImage, setFileImage] = useState<string>("")
    const [fileImage, setFileImage] = useState<File | null>(null)


    async function handlerCreateProduct () {
        if (!fileImage) return error("Por favor selecione una imagen")

        const imageURL = await uploadImageToCloudinary(fileImage);
        if(!imageURL) return error("Error al subir la imagen");    
        
        const { data } = await fetchPOST("http://localhost:3001/product/create", {...newProduct, image:imageURL}) as {data: ResponseData};
        
        if (data.error) {
            console.log(data);
            return error(data.message)
        }else {
            success(data.message)
            setNewProduct({
                name:"",
                image:"",
                // image:"",
                description:"",
                price:0,
                category:"",
                type:"",
                stocks:[]
            })
            setStock({
                unit:0,
                size:"",
                color:"",
                hxaColor:""
            })
            setFileImage(null)
            // setFileImage("")
        }
    }

    async function handlerPreviewImage (e:React.ChangeEvent<HTMLInputElement>) {
        
        if (!e.target.files) return null;

        const file = e.target.files[0]
        setFileImage(file)
        
        const reader = new FileReader()
        reader.onload = () => {
            setPreviewImage(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

  return (
    <section className="w-[95%] h-[90vh] bg-redd-500">
        
        <section className="">
            <h3 className="text-3xl">Crear producto</h3>
        </section>
        <section className="w-full h-full flex justify-evenly items-start bg-blued-500 pt-5">
            <section className="w-[350px] h-full bg-greend-500 flex justify-center items-center flex-col gap-5">
                <picture className="w-[350px] relative min-h-[350px] max-h-[350px] overflow-hidden flex justify-center items-center bg-blued-500">
                    <div className={`${!previewImage ? "h-full w-full border border-neutral-500 bg-redd-500 bg-transparent" : "hidden"}`}>
                        <label htmlFor="imageUpload">
                            <i className="bx bx-image-add text-white w-full h-full flex justify-center items-center bg-[#00000096] text-4xl opacity-0 hover:opacity-100 transition-opacity duration-500 z-10 cursor-pointer"></i>
                        </label>
                        <input type="file" id="imageUpload" className="hidden" accept="image/*" onChange={handlerPreviewImage}/>
                        
                    </div>
                    {previewImage && <img src={previewImage} alt="" className={`w-[90%] h-auto object-cover`}/>}
                    {/* <button className="absolute bottom-0 text-sm text-gray-500">+ Agregar</button> */}
                </picture>
                <section className="flex justify-center items-center gap-5 bg-redd-500">
                    {[{image:"https://res.cloudinary.com/dth62bdky/image/upload/v1704144326/ProductApi/do3asovhei15ieqitptj.jpg"},{image:"https://res.cloudinary.com/dth62bdky/image/upload/v1704144326/ProductApi/do3asovhei15ieqitptj.jpg"}].map((image, index) => (
                        <picture key={index} className="w-[60px] h-[60px] overflow-hidden border-2 border-neutral-600 rounded-sm bg-redd-500">
                            <img src={image.image} alt="Image" className=""/>
                        </picture>
                    ))}
                    <div className="w-[60px] h-[60px] flex justify-center items-center overflow-hidden border-2 text-2xl bg-[#00000096] border-neutral-600 rounded-sm text-white cursor-pointer">
                        +
                    </div>
                </section>
            </section>
            <section className="w-[60%] h-full bg-greend-500 flex justify-evenly items-start flex-col gap-5 bg-redd-500">
                <Input name="Name" placeholder="Nombre" styleDimensions="w-[50%]" styleText="ml-0 text-sm" onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}/>
                <Textarea placeholder="Descripción" name="Description" onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}/>

                <section className="w-full flex justify-center items-center flex-col gap-y-5">
                    <div className="w-full h-auto flex justify-around items-center divide-x divide-neutral-300 bg-redd-500">
                        <Filters filter={categories || []} title="Categorias" select={newProduct?.category} onClick={(value) => setNewProduct({...newProduct, category: value as string})}/>
                        <Filters filter={types || []} title="Tipos" select={newProduct?.type} onClick={(value) => setNewProduct({...newProduct, type: value as string})}/>
                    </div>
                    <section className="w-full flex justify-between items-start bg-redd-500">

                        <section className="w-[60%] flex justify-center items-center flex-col gap-y-5 bg-greend-500">
                            <div className="w-full flex justify-center items-center bg-blued-500">
                                <Filters filter={data?.colors || []} title="Colores" 
                                select={stock?.color}
                                onClick={(value) => { 
                                    typeof value === 'string' ? setStock({ ...stock, color: value }) : setStock({ ...stock, color: value.color, hxaColor: value.hxacolor });
                                }}/>
                                <Filters filter={sizes || []} title="Talles" select={stock?.size} onClick={(value) => setStock({...stock, size: value as string})}/>
                            </div>
                            <div className="w-full flex justify-center items-center flex-col gap-y-5 bg-redd-500">
                                <div className="w-full flex justify-center items-center gap-x-3">
                                    <Input name="Unidades" type="number" placeholder="10" styleDimensions="w-[45%]" onChange={(e) => setStock({...stock, unit:Number(e.target.value)})}/>
                                    <Input name="Talle" placeholder="S" styleDimensions="w-[45%]" onChange={(e) => setStock({...stock, size:e.target.value})}/>
                                </div>
                                <div className="w-full flex justify-center items-center gap-x-3">
                                    <Input name="Color" placeholder="Negro" styleDimensions="w-[45%]" onChange={(e) => setStock({...stock, color:e.target.value})}/>
                                    <Input name="HxaColor" placeholder="#000000" styleDimensions="w-[45%]" onChange={(e) => setStock({...stock, hxaColor:e.target.value})}/>
                                </div>
                                <Button text="Añadir Stock" style="py-1 px-7 rounded-full bg-neutral-800 text-white" onClick={() => setNewProduct({...newProduct, stocks:[...newProduct.stocks, stock]})}/>
                            </div>
                        </section>

                        <section className="w-[35%] h-[180px] flex justify-start items-start flex-col gap-y-3 bg-blued-500 overflow-auto scroll">
                            <h4 className="w-full leading-[20px] bg-redd-500 m-0 border-b border-neutral-400 sticky top-0 z-0 backdrop-blur-sm bg-gradient-to-b from-white to-transparent tracking-widest">Stocks</h4>
                            {newProduct.stocks.map((stock, index) => (
                                <div key={index} className="w-full relative text-sm bg-white rounded-sm border border-neutral-400 py-1 px-2 z-[-10]">
                                        <h3>Talle: {stock.size ? stock.size : null }</h3>
                                        <h3 className="absolute right-2 top-1 text-xs">x {stock.unit ? stock.unit : null}</h3>
                                        <h3>Color: {stock.color ? stock.color : null}</h3>
                                        <h3>HxaColor: {stock.hxaColor ? stock.hxaColor : null}</h3>
                                </div>
                            ))}
                        </section>

                    </section>
                </section>
                <div className="flex w-full justify-start items-center gap-x-1 bg-redd-500">
                    <h3>$</h3><Input type="number" name="Price" placeholder="Precio" defaultValue="" styleDimensions="w-[30%]" onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}/>
                </div>

                <Button text="Crear Producto" style="py-1 px-7 rounded-full bg-neutral-800 text-white my-0" onClick={handlerCreateProduct}/>
            </section>
        </section>

    </section>
  )
}

export default CreateProduct












 {/* <select className="w-[20%] py-1 border-b border-neutral-400 flex bg-redd-500 outline-none">
                        <option value="">Categoria</option>
                        {data?.categories.map(categories => (
                            <option value={categories.category}>{categories.category}</option>
                        ))}
                    </select>
                    <select className="w-[20%] py-1 border-b border-neutral-400 flex bg-redd-500 outline-none">
                        <option value="">Tipo</option>
                        {data?.types.map(type => (
                            <option value={type.type}>{type.type}</option>
                        ))}
                    </select> */}
                    {/* <select className="w-[20%] py-1 border-b border-neutral-400 flex bg-redd-500 outline-none">
                        <option value="">Color</option>
                        {data?.colors.map(color => (
                            <option value={color.color}>{color.color}</option>
                        ))}
                    </select>
                    <select className="w-[20%] py-1 border-b border-neutral-400 flex bg-redd-500 outline-none">
                        <option value="">Talle</option>
                        {data?.sizes.map(size => (
                            <option value={size.size}>{size.size}</option>
                        ))}
                    </select> */}