import { createSlice, PayloadAction } from "@reduxjs/toolkit"; //PayloadAction
import { ProfilePurchase } from "../../interfaces/components";
import { useEncode } from "../../hooks/useEncode";
const { VITE_N_PREFERENCE_PROFILE } = import.meta.env

interface ProfilePurchaseState {
    profilePurchase:ProfilePurchase
}

const {decode, encode} = useEncode()

const preferenceProfile = decode(VITE_N_PREFERENCE_PROFILE)

const structureDefault = {
    id:"",
    name: "",
    email: "",
    lastname: "",
    phone: "",
    // gender: "",
    methodOfDelivery:"",
    postalCode:"",
    street: "",
    number: "",
    houseApartament: "",
    neighborhood: "",
    
    city: "",
    country:"",
    discountCode:"",
    discount:""
    // receives: "",
}

const initialState:ProfilePurchaseState = {
    profilePurchase: preferenceProfile ? preferenceProfile : structureDefault
}


const preferenceProfileSlice = createSlice ({
    name:"preferenceProfile",
    initialState:initialState,
    reducers:{
        updateProfileProperty: (state, action: PayloadAction<{ property: keyof ProfilePurchase; value: string }>) => {
            const { property, value } = action.payload;
            state.profilePurchase[property] = value;
            encode(VITE_N_PREFERENCE_PROFILE, state.profilePurchase)
        },
        deletePreferenceProfile: (state) => {
            state.profilePurchase = structureDefault
            encode(VITE_N_PREFERENCE_PROFILE, state.profilePurchase)
        }, 
        deleteOnePreferenceProfile: (state, action: PayloadAction<{ property: keyof ProfilePurchase; value: string }>) => {
            const { property, value } = action.payload;
            state.profilePurchase[property] = value;
            encode(VITE_N_PREFERENCE_PROFILE, state.profilePurchase)
        }
    }
})

export const {updateProfileProperty, deletePreferenceProfile, deleteOnePreferenceProfile} = preferenceProfileSlice.actions;

export default preferenceProfileSlice.reducer;