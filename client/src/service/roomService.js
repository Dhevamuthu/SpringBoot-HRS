import axios from "axios";
import {base} from "../api/api.js";
import { useSelector } from "react-redux";


const header = {
    'Content-Type': 'application/json',
};

export const addRoom = async(room)=>{
    header["Content-Type"] = "multipart/form-data";
    const response = await axios.post(`${base}room/create`,room,header);
    return response;
}

export const updateRoom = async(id,room)=>{
    header["Content-Type"] = "multipart/form-data";
    const response = await axios.put(`${base}room/${id}`,room,header);
    return response;
}

export const getRomByHotel = async(id)=>{
    
    const response = await axios.get(`${base}room/getById/${id}`,header);
    return response;
}

export const updateRoomBooking = async(id,bookingDate)=>{
    const response = await axios.put(`${base}room/updateBooking/${id}`,bookingDate,header);
    return response;
}

