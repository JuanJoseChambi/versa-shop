// Button -------------------------------------
export interface ButtonProp {
    iconLeft?:string;
    iconRight?:string;
    styleIcon?:string;
    text?:string;
    dir?:string | undefined
    style?:string;
    onClick?: () => void;
    img?: string;
    hover?:boolean;
    disable?:boolean ;
    loaderSpin?:boolean;
}
// Tooltip ------------------------------------
export interface TooltipProp {
    text:string ;
    children:React.ReactNode
}
// Cart ---------------------------------------
export interface CartProp {
    visible:boolean;
    onClose:() =>  void
}
// Access -------------------------------------

export interface SignUpProp {
    visible:string;
}
export interface LogInProp {
    visible:string;
}
// CheckoutProfile ----------------------------
export interface CheckoutProfileProp {
    setPurchaseState:React.Dispatch<React.SetStateAction<ProfilePurchase>>
    statePurchase:ProfilePurchase
}
interface ProfilePurchase {
        id:string;
        email: string;
        name: string;
        lastname: string;
        phone: string;
        // gender: string;
        methodOfDelivery:string;
        postalCode:string;
        street: string;
        number: string;
        houseApartament: string;
        neighborhood: string;
        city: string;
        country:string;
        discountCode: string;
        discount:string;
        // receives: string;
}
// CreateProduct ------------------------------

export interface ArraysWithFilters {
    categories: string[] 
    types: string[]
    sizes: string[]
    colors: Color[]
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


// 

export interface MethodsOfDelivery {
    homeDelivery?: HomeDelivery;
    withdrawal?:   Withdrawal;
}

export interface HomeDelivery {
    correoArg?: ValueMethods | null;
}
export interface Withdrawal {
    localVersa?: ValueMethods | null;
    correoArg?:  ValueMethods | null; 
}

export interface ValueMethods {
    value?:    string;
    title?:    string;
    subtitle?: string;
    price?:    string;
}


