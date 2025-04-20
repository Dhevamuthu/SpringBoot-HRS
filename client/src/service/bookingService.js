import axios from "axios";
import { base } from "../api/api";


const header = {
    'Content-Type': 'application/json'
};


export const addBooking = async(bookingData)=>{
    const response = await axios.post(`${base}bookings/create`,bookingData,header);
    return response;
}