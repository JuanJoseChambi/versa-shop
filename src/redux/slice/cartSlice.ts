import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productsInCart } from "../../interfaces/interfaces";




interface cartState {
    cart:productsInCart[]
}

const cartLocal = localStorage.getItem("cart")


const initialState:cartState = {
    cart: cartLocal ? JSON.parse(cartLocal) : []
}


const cartSlice = createSlice ({
    name:"cart",
    initialState:initialState,
    reducers:{
        addToCart: (state, action: PayloadAction<productsInCart>) => {
            const product = action.payload;
            const productExist = state.cart.find(productCart => productCart.id === product.id)
            if (productExist) {
                productExist.cantidad +=1
            }else {
                state.cart = [...state.cart, product]
            }
            localStorage.setItem("cart",JSON.stringify(state.cart))
        },
        removeToCart: (state, action:PayloadAction<productsInCart>) => {
            const product = action.payload;
            const productInCart = state.cart.find(productsInCart => productsInCart.id === product.id);
            if (productInCart && productInCart.cantidad >= 1) productInCart.cantidad -=1;
            if(productInCart && productInCart.cantidad <= 0) {
                state.cart = state.cart.filter(products => products.id !== productInCart.id)
            }
            localStorage.setItem("cart",JSON.stringify(state.cart))
        },
        deleteToCart: (state, action:PayloadAction<productsInCart>) => {
            const product = action.payload;
            state.cart = state.cart.filter(products => products.id !== product.id)
            localStorage.setItem("cart",JSON.stringify(state.cart))
        }   
       
    }
})

export const { addToCart, removeToCart, deleteToCart} = cartSlice.actions;

export default cartSlice.reducer;