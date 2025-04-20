import { createSlice } from "@reduxjs/toolkit";

const cartSlice = new createSlice({
    name : "cart",
    initialState : {
        carts : []
    },
    reducers : {
        addCart : (state,action)=>{
            state.carts = [...state.carts,action.payload];
        },
        removeCart : (state,action)=>{
            state.carts = state.carts.filter((cart)=>{
                if(cart.rid!==action.payload.rid) return cart;
            })
        },
        emptyCart : (state)=>{
            state.carts = [];
        }
    }
})

export const {addCart,removeCart,emptyCart } = cartSlice.actions;

export default cartSlice.reducer;