import { createSlice } from "@reduxjs/toolkit";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie" 
const { VITE_C_USER } = import.meta.env

interface AuthSlice {
    user:UserTypes
}

interface UserTypes {
    role: string | null;
    token: string | undefined;   
}

let initialState:AuthSlice = {

    user: {
        role: null,
        token: undefined
    }
}
const userInfoCookie = Cookies.get(VITE_C_USER)
if (userInfoCookie) {
    const token = atob(userInfoCookie)
    const infoUser:UserTypes = JSON.parse(atob(token.split('.')[1])).usuario
    
    initialState.user = {
        role: infoUser?.role,
        token: token
    }
}


// console.log(initialState.user);
const authSlice = createSlice ({
    name:"auth",
    initialState:initialState,
    reducers:{
        deleteUser: (state) => {
            state.user = {
                role: null,
                token: undefined
            }
        }
    }
})

export const { deleteUser } = authSlice.actions;

export default authSlice.reducer;