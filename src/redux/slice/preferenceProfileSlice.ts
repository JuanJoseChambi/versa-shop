import { createSlice, PayloadAction } from "@reduxjs/toolkit"; //PayloadAction
import { ProfilePurchase } from "../../interfaces/components";
import { useEncode } from "../../hooks/useEncode";
const { VITE_N_PREFERENCE_PROFILE } = import.meta.env

interface ProfilePurchaseState {
    profilePurchase:ProfilePurchase
}

const {decode, encode} = useEncode()

const preferenceProfile = decode(VITE_N_PREFERENCE_PROFILE)


const initialState:ProfilePurchaseState = {
    profilePurchase: preferenceProfile ? preferenceProfile : {
        name: "",
        email: "",
        lastname: "",
        phone: "",
        gender: "",
        street: "",
        number: "",
        houseApartament: "",
        neighborhood: "",
        city: "",
        receives: ""
    }
}


const preferenceProfileSlice = createSlice ({
    name:"preferenceProfile",
    initialState:initialState,
    reducers:{
        updateProfileProperty: (state, action: PayloadAction<{ property: keyof ProfilePurchase; value: string }>) => {
            const { property, value } = action.payload;
            state.profilePurchase[property] = value;
            encode(VITE_N_PREFERENCE_PROFILE, state.profilePurchase)
        }
    }
})

export const {updateProfileProperty} = preferenceProfileSlice.actions;

export default preferenceProfileSlice.reducer;