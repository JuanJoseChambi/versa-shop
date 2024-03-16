
export function useLocalStorage () {
    
    function getIDLocalStorage () {
        return localStorage.getItem("ID")
    }

    function getCartLocalStorage() {
        const cartJson = localStorage.getItem("cart");

        return cartJson ? JSON.parse(cartJson) : null;
    }
    
    
    return { getIDLocalStorage, getCartLocalStorage }
}