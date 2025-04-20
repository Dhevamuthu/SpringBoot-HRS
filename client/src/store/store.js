import { configureStore } from "@reduxjs/toolkit";
import staffSlice from "./staffSlice";
import hotelSclice from "./hotelSclice";
import roomSclice from "./roomSclice";
import cartSlice from "./cartSlice";

const store = configureStore({
    reducer : {
    staffData : staffSlice,
    hotelData : hotelSclice,
    roomsData : roomSclice,
    cartData : cartSlice
    }
})


export default store;