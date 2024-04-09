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
    disable?:boolean | string;
    loaderSpin?:boolean;
}
// Tooltip ------------------------------------
export interface TooltipProp {
    text:string;
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