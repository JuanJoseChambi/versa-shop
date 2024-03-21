import { toast } from "sonner";

export function normal (message:string) {
    toast(message)
}
export function error (message:string) {
    toast.error(message)
}
export function success (message:string) {
    toast.success(message)
}
export function info (message:string) {
    toast.info(message)
}
export function warning (message:string) {
    toast.warning(message)
}
export function description (title:string, description:string) {
    toast.message(title, {
        description: description,
    })
}

// export function promise(promise:Promise<any>) {
//     toast.promise(promise, {
//         loading: 'Loading...',
//         success: (data:any) => {
//             // console.log(data.data);
            
            
//             }else {
//                 return `${data.data.message}`
//             }
            
//         },
//         error: 'Error',
//     }
//     )
// }