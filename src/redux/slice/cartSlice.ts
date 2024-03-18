import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsInCart } from "../../interfaces/interfaces";

interface CartState {
    cart:ProductsInCart[]
}

const cartLocal = localStorage.getItem("cart")


const initialState:CartState = {
    cart: cartLocal ? JSON.parse(cartLocal) : []
}


const cartSlice = createSlice ({
    name:"cart",
    initialState:initialState,
    reducers:{
        addToCart: (state, action: PayloadAction<ProductsInCart>) => {
            const product = action.payload;
            const productExist = state.cart.find(productsInCart => productsInCart.id === product.id )
            if (productExist) {
                productExist.cantidad +=1
            }else {
                state.cart = [...state.cart, product]
            }
            localStorage.setItem("cart",JSON.stringify(state.cart))
        },
        removeToCart: (state, action:PayloadAction<ProductsInCart>) => {
            const product = action.payload;
            const productInCart = state.cart.find(productsInCart => productsInCart.id === product.id);
            if (productInCart && productInCart.cantidad >= 1) productInCart.cantidad -=1;
            if(productInCart && productInCart.cantidad <= 0) {
                state.cart = state.cart.filter(products => products.id !== productInCart.id)
            }
            localStorage.setItem("cart",JSON.stringify(state.cart))
        },
        deleteFromCart: (state, action:PayloadAction<ProductsInCart>) => {
            const product = action.payload;
            state.cart = state.cart.filter(productsInCart => !(productsInCart.id === product.id));
            localStorage.setItem("cart",JSON.stringify(state.cart))
        },
        deleteAllCart: (state) => {
            state.cart = []
            localStorage.setItem("cart",JSON.stringify(state.cart))
        } 
       
    }
})

export const { addToCart, removeToCart, deleteFromCart, deleteAllCart} = cartSlice.actions;

export default cartSlice.reducer;