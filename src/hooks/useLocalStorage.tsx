
export function useLocalStorage () {
    
    function getIDLocalStorage () {
        const id = localStorage.getItem("ID") as string
        return JSON.parse(id)
    }

    function getCartLocalStorage() {
        const cartJson = localStorage.getItem("cart");

        return cartJson ? JSON.parse(cartJson) : null;
    }
    
    
    return { getIDLocalStorage, getCartLocalStorage }
}