import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useEncode } from "../../hooks/useEncode";
import { error, info } from "../../utils/alert";
import { ProductsInCart } from "../../interfaces/redux";
const { VITE_C_CART } = import.meta.env

interface CartState {
    cart:ProductsInCart[]
}

const {encode, decode} = useEncode()

const cart = decode(VITE_C_CART)

const initialState:CartState = {
    cart: cart ? cart : []
}


const cartSlice = createSlice ({
    name:"cart",
    initialState:initialState,
    reducers:{
        addToCart: (state, action: PayloadAction<ProductsInCart>) => {
            const product = action.payload;
            if (product.unit === 0) return error("No existen mas Stocks de este producto")
            const productRepeat = state.cart.find(productsInCart => productsInCart.id === product.id && (productsInCart.color !== product.color || productsInCart.size !== product.size))
            // const productRepeat = state.cart.find(productsInCart => productsInCart.id === product.id && productsInCart.color !== product.color && productsInCart.size !== product.size)
            if (productRepeat) return info("No se puede agregar mas variaciones de este articulo");
            if (!productRepeat) {
                const productExist = state.cart.find(productsInCart => productsInCart.id === product.id )
                if (productExist) {
                    productExist.cantidad +=1
                }else {
                    state.cart = [...state.cart, product]
                }
                
                encode(VITE_C_CART, state.cart)
            }
        },
        removeToCart: (state, action:PayloadAction<ProductsInCart>) => {
            const product = action.payload;
            const productInCart = state.cart.find(productsInCart => productsInCart.id === product.id);
            if (productInCart && productInCart.cantidad >= 1) productInCart.cantidad -=1;
            if(productInCart && productInCart.cantidad <= 0) {
                state.cart = state.cart.filter(products => products.id !== productInCart.id)
            }
            encode(VITE_C_CART, state.cart)
        },
        deleteFromCart: (state, action:PayloadAction<ProductsInCart>) => {
            const product = action.payload;
            state.cart = state.cart.filter(productsInCart => !(productsInCart.id === product.id));

            encode(VITE_C_CART, state.cart)
        },
        deleteAllCart: (state) => {
            state.cart = []
            encode(VITE_C_CART, state.cart)
        } 
    }
})

export const { addToCart, removeToCart, deleteFromCart, deleteAllCart} = cartSlice.actions;

export default cartSlice.reducer;