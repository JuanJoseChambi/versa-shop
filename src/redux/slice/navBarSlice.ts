import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavBarSliceInter {
    sought: string;
    
}

const initialState:NavBarSliceInter = {
    sought: ""
}

const navBarSlice = createSlice ({
    name:"navBar",
    initialState:initialState,
    reducers:{
        search: (state, action: PayloadAction<string>) => {
            const text = action.payload;
            state.sought = text
        },
        clear: (state) => {
            state.sought = "";
        }
    }
})

export const { search, clear } = navBarSlice.actions;

export default navBarSlice.reducer;