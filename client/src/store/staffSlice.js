import { createSlice } from "@reduxjs/toolkit";

const staffSclice = new createSlice({
    name : "staff",
    initialState : {
        staff : {
            staffName : "",
            email : "",
            token : "",
            isLogin : false,
            sid : ""
        }
    },
    reducers : {
        initStaff : (state,action)=>{
            state.staff = action.payload;
            state.staff = {...state.staff , isLogin : true};
        },

        removeStaff : (state)=>{
            state.staff = {
                staffName : "",
                email : "",
                token : "",
                isLogin : false,
                sid : ""
            }
        }
    }
});


export const {initStaff,removeStaff} =  staffSclice.actions;
export default  staffSclice.reducer;