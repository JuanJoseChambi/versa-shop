import { createSlice } from "@reduxjs/toolkit";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie" 
const { VITE_C_USER } = import.meta.env

interface AuthSlice {
    user:UserTypes
}

interface UserTypes {
    email: string | undefined;
    name: string | undefined;
    lastname: string | undefined;
    nickname: string | undefined;
    role: string | null;
    id: string | undefined;
    user_id?: string | undefined;
    token: string | undefined;   
}

// const infoUser = useDecode()
let initialState:AuthSlice = {

    user: {
        email: undefined,
        name: undefined,
        lastname: undefined,
        nickname: undefined,
        role: null,
        id: undefined,
        token: undefined
    }
}
const userInfoCookie = Cookies.get(VITE_C_USER)
if (userInfoCookie) {
    const token = atob(userInfoCookie)
    const infoUser:UserTypes = JSON.parse(atob(token.split('.')[1])).usuario
    // console.log(infoUser);
    
    initialState.user = {
        email: infoUser?.email,
        name: infoUser?.name,
        lastname: infoUser?.lastname,
        nickname: infoUser?.nickname,
        role: infoUser?.role,
        id: infoUser?.user_id,
        token: token
    }
}


console.log(initialState.user);
const authSlice = createSlice ({
    name:"auth",
    initialState:initialState,
    reducers:{
        deleteUser: (state) => {
            state.user = {
                email: undefined,
                name: undefined,
                lastname: undefined,
                nickname: undefined,
                role: null,
                id: undefined,
                token: undefined
            }
        }
    }
})

export const {} = authSlice.actions;

export default authSlice.reducer;