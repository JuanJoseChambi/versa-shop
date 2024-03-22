// Button -------------------------------------
export interface ButtonProp {
    icon?:string;
    text?:string;
    dir?:string | undefined
    style?:string;
    onClick?: () => void;
    img?: string;
}
// Tooltip ------------------------------------
export interface TooltipProp {
    text:string;
    children:React.ReactNode
}
// Access -------------------------------------

export interface SignUpProp {
    visible:string;
}
export interface LogInProp {
    visible:string;
}