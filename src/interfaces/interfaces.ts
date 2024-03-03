// --------------- Component Button --------------------
export interface ButtonProp {
    icon?:string;
    text?:string;
    dir?:string | undefined
    style?:string
}
// --------------- Hooks useApi ------------------------
export interface ApiResponse<T> {
    data?: T | null;
    error?:Error | null;
    loading?:boolean;
}
// -----------------------------------------------------
interface Product {
    _id:string;
    name: string
    image: string
    description:string
    brand: string
    price:  number
    category: string
    type:string
    stock: number
    available_colors: string[]
    sizes: string[]
    createdAt:Date;
    updatedAt:Date;
}
export interface AllProducts {
    TotalResults: number;
    results:Product[];
}

export interface ResponseAllProducts {
    data: AllProducts | undefined;
    error:Error | null;
    loading:boolean;
}