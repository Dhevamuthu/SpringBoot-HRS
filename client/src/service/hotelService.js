import axios from "axios";
import { base } from "../api/api";

export const addHotel = async (hotel) => {
  try {
    const response = await axios.post(`${base}hotel/create`, hotel, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (error) {
    console.error("Error adding hotel:", error.response?.data || error.message);
    throw error;
  }
};
