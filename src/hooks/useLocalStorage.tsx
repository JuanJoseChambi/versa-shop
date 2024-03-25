
export function useLocalStorage () {
    
    function getLocalStorage (name:string) {
        const objectLS = localStorage.getItem(name)
        if (!objectLS) return null;
        try {
            const parsedObject = JSON.parse(objectLS);
            if (Array.isArray(parsedObject)) {
                return parsedObject;
            } else {
                return parsedObject; 
            }
        } catch (error) {
            return objectLS; 
        }
    }
    
    function setLocalStorage (name:string, object:any): void {
        if ( Array.isArray(object)) {
            localStorage.setItem(name, JSON.stringify(object))
        }else{
            localStorage.setItem(name, object)
        }
    }

    function deleteLocalStorage (name:string) {
        localStorage.removeItem(name)
    } 


    return { getLocalStorage, setLocalStorage, deleteLocalStorage }
}