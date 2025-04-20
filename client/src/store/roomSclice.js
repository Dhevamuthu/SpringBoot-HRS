import { createSlice } from "@reduxjs/toolkit";

const roomSclice = new createSlice({
    name : "room",
    initialState : {
        hotelId : "",
        rooms : []
    },
    reducers : {
        initRoomRedux : (state,action)=>{
            state.rooms = action.payload.rooms;
            state.hotelId = action.payload.hotelId;
        },
        addRoomRedux : (state,action)=>{
            state.rooms = [...state.rooms,action.payload];
        },
        updateRoomRedux : (state,action)=>{
            state.rooms = state.rooms.map((room)=>{
                if(room.rid===action.payload.room.rid){
                    return action.payload.room;
                }else return room;
            })
        },
        setRoomEmpty : (state)=>{
            state.rooms = [];
        }
    }
});


export const {initRoomRedux,addRoomRedux,updateRoomRedux,setRoomEmpty} = roomSclice.actions;
export default roomSclice.reducer;