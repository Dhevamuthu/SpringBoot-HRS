import { createSlice } from "@reduxjs/toolkit";
import { addHotel } from "../service/hotelService";

const hotelSlice = new createSlice({
    name : "hotel",
    initialState : {
        hotels : []
    },
    reducers : {
        initHotel : (state,action)=>{
            state.hotels = action.payload;
        },
       addHotelRedux : (state,action)=>{
          state.hotels = [...state.hotels,action.payload];
       },
       setHotelEmpty : (state)=>{
        state.hotels = [];
       }     
}});

export const {initHotel,addHotelRedux,setHotelEmpty} = hotelSlice.actions;
export default hotelSlice.reducer;
