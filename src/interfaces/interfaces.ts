
// --------------- Hooks useApi ------------------------
export interface ApiResponse<T> {
    data?: T | null | ResponseData;
    error?: string | boolean | null;
    loading?:boolean;
    message?:string

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
    // email: string,
    // lastname: string,
    // name: string,
    // nickname: string,
    role: string,
    // user_id: string,
    token:string
}
// -----------------------------------------------------
interface Product {
    _id:string;
    name: string
    image: string
    description:string
    brand: string
    price:  number
    available:boolean
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
    error:boolean | unknown;
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
    available:       boolean;
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
    stock_id:string
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


// REQUEST GET -----------------------------------------------

// Profile User ----------------------
export interface ProfileUser {
    user_id:   string;
    image:     null;
    nickname:  string;
    name:      string;
    lastname:  string;
    email:     string;
    password:  string;
    role:      string;
    createdAt: Date;
    updatedAt: Date;
    Purchases: any[];
}

// AdmilPanel -------------------------------------------------
export interface SalesData {
    purchase_id:   string;
    direction:     string;
    payment_id:    string;
    priceTotal:    number;
    createdAt:     Date;
    updatedAt:     Date;
    userPurchase:  string;
    PurchaseState: PurchaseState;
    Products:      ProductPurchase[];
}

export interface ProductPurchase {
    product_id:      string;
    name:            string;
    image:           string;
    description:     string;
    PurchaseProduct: PurchaseProduct;
}

export interface PurchaseProduct {
    PurchaseProduct_id: string;
    cantidad:           number;
    size:               string;
    color:              string;
    PurchasePurchaseId: string;
    ProductProductId:   string;
}
export interface PurchaseState {
    state: string;
}

// REQUEST PATCH -----------------------------------------------
export interface UpdateProduct {
    id:string;
    name:string, 
    description:string, 
    price:number, 
    category:string, 
    type:string
}