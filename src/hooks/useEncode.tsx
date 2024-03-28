import { useLocalStorage } from "./useLocalStorage"


const {setLocalStorage, getLocalStorage} = useLocalStorage()

export function useEncode () {


    function encode (name:string, object:any) {
        // if (!object || !name) return null;
        const encoded = btoa(JSON.stringify(object))
        setLocalStorage(name, encoded)
        // return encoded
    }

    function decode (name:string) {
        if (!name) return null;
        
        const obejectEncode = getLocalStorage(name)
        if (!obejectEncode) return null;

        const decoded = JSON.parse(atob(obejectEncode))
        return decoded
    }

    return {encode, decode}


}