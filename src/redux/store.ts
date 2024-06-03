import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice";
import authSlice from "./slice/authSlice";
import preferenceProfileSlice from "./slice/preferenceProfileSlice";
import navBarSlice from "./slice/navBarSlice";

 const store = configureStore({
    reducer:{
        cart:cartSlice,
        auth:authSlice,
        preferenceProfile: preferenceProfileSlice,
        navBar:navBarSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store