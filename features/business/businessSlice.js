import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "business",
    initialState: {
        business: null
    },
    reducers: {
        setBusiness: (state, action) => {
            state.product = action.payload
        },
        addBusiness: (state, action) => {
            state.product.push(action.payload)
        }
    }
})

//action creators
export const { setBusiness, addBusiness } = businessSlice.actions


//selectors
export const selectBusiness = mainState => mainState.business.business

export default businessSlice.reducer