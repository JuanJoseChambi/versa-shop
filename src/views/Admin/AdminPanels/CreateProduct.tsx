import { useState } from "react"
import Input from "../../../components/Input/Input";
import Textarea from "../../../components/Textarea/Textarea";
import useApi from "../../../hooks/useApi";
import Filters from "../../../components/Filters/Filters";
import Button from "../../../components/Button/Button";


interface StructureNewProduct {
    name: string;
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


export interface Filters {
    colors:     Color[];
    sizes:      Size[];
    types:      Type[];
    categories: Category[];
}

export interface Category {
    category: string;
}

export interface Color {
    color:    string;
    hxacolor: string;
}

export interface Size {
    size: string;
}

export interface Type {
    type: string;
}

function CreateProduct() {
    
    const [newProduct, setNewProduct] = useState<StructureNewProduct>({
        name:"",
        image:"",
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

    const {data} = useApi("http://localhost:3001/product/filters") as {data:Filters}
    // console.log(data);

    const categories = data?.categories?.map(categorie => categorie?.category)
    const types = data?.types?.map(type => type?.type)
    const sizes = data?.sizes?.map(size => size?.size)
    // console.log(categories);
    
  return (
    <section className="w-[95%] bg-redd-500">
        
        <section className="">
            <h3 className="text-3xl">Create Product</h3>
        </section>
        <section className="w-full flex justify-evenly items-centerbg-redd-500 py-10">
            <picture className="w-[350px] min-h-[350px] max-h-[350px] overflow-hidden flex justify-center items-center bg-blued-500">
                <img src="https://res.cloudinary.com/dth62bdky/image/upload/v1704144326/ProductApi/do3asovhei15ieqitptj.jpg" alt="" className="w-[90%]"/>
            </picture>
            <section className="w-[60%] bg-blued-500 flex justify-center items-start flex-col gap-y-8">
                <Input name="Name" placeholder="Nombre" styleDimensions="w-[50%]" styleText="ml-0 text-sm"/>
                <Textarea placeholder="Descripción" name="Description" />

                <section className="w-full flex justify-center items-center flex-col gap-y-5">
                    <div className="w-full h-auto flex justify-around items-center bg-redd-500">
                        <Filters filter={categories || []} title="Categorias"/>
                        <Filters filter={types || []} title="Tipos"/>
                    </div>
                    <section className="w-full flex justify-between items-center bg-redd-500">

                        <section className="w-[60%] flex justify-center items-center flex-col gap-y-5 bg-greend-500">
                            <div className="w-full flex justify-center items-center bg-blued-500">
                                <Filters filter={data?.colors || []} title="Colores"/>
                                <Filters filter={sizes || []} title="Colores"/>
                            </div>
                            <div className="w-full flex justify-center items-center flex-col gap-y-5 bg-redd-500">
                                <div className="w-full flex justify-center items-center gap-x-3">
                                    <Input name="Unidades" type="number" placeholder="10" styleDimensions="w-[45%]"/>
                                    <Input name="Talle" placeholder="S" styleDimensions="w-[45%]"/>
                                </div>
                                <div className="w-full flex justify-center items-center gap-x-3">
                                    <Input name="Color" placeholder="Negro" styleDimensions="w-[45%]"/>
                                    <Input name="HxaColor" placeholder="#000000" styleDimensions="w-[45%]"/>
                                </div>
                                <Button text="Añadir Stock" style="w-full rounded-full bg-neutral-800 text-white"/>
                            </div>
                        </section>

                        <section className="w-[35%] bg-blue-500">StocksCreados</section>

                    </section>
                </section>
                <div className="flex w-full justify-start items-center gap-x-1">
                    <h3>$</h3><Input type="number" name="Price" placeholder="Precio" defaultValue="" styleDimensions="w-[30%]" onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}/>
                </div>
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