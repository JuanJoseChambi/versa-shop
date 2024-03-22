
// --------------- Hooks useApi ------------------------
export interface ApiResponse<T> {
    data?: T | null | ResponseData;
    error?: string | null;
    loading?:boolean;
}

export interface CategoryData {
    id:number;
    category:string;
}
export interface TypeData {
    id:number;
    type:string;
}
export interface ColorData {
    color_id:number;
    color:string;
}
export interface SizeData {
    size_id:number;
    size:string;
}


export interface UseFilterResponse {
    categories:CategoryData[] | undefined;
    types: TypeData[] | undefined;
    colors: ColorData[] | undefined;
    sizes: SizeData[] | undefined;
    error?:string | null;
    loading?:boolean;
}
// Hook useDecode ----------------------------------
export interface DecodeToken {
    email: string,
    lastname: string,
    name: string,
    nickname: string,
    role: string,
    user_id: string
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

// Register User ----------------------------------------

export interface ResponseData {
    message:string;
    error:boolean;
    token?:string;
}

export interface UserProp {
    name:string | undefined;
    lastname:string | undefined;
    nickname:string | undefined;
    email:string | undefined;
    password:string | undefined;
    repeatPassword:string | undefined
}
export interface DataUser {
    user_id?:string;
    error?:string; 
}
// ProductDB --------------------------------------------
export interface DataProduct {
    product_id:      string;
    name:            string;
    image:           string;
    description:     string;
    price:           number;
    unit:            number;
    Category:        Category;
    Type:            Type;
    Stocks:          Stock[];
}

export interface Category {
    category: string;
}

export interface Stock {
    unit:  number;
    Size:  Size;
    Color: Color;
}

export interface Color {
    color: string;
    hxacolor:string;
}

export interface Size {
    size: string;
}

export interface Type {
    type: string;
}
// Redux Interfaces : CART -------------------------------------
export interface ProductsInCart {
    id:string;
    name:string;
    image:string;
    price:number;
    cantidad:number;
    size:string;
    color:string
}
// Result Function Api Return -------------------------------------