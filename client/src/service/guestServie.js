import axios from "axios";
import { base } from "../api/api";


const header = {
    'Content-Type': 'application/json'
};
export const findGuestByPhone = async(number)=>{
    const response = await axios.get(`${base}guest/${number}`,header);
    return response;
}

export const createGuest = async (guest) => {
    const response = await axios.post(`${base}guest/create`,guest,header);
    return response; 
}