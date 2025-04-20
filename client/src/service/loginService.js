import axios from "axios";
import { base } from "../api/api";

const Header = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const login = async (user) => {
  try {
    const response = await axios.post(`${base}auth/login`, user, Header);
    return response;
  } catch (error) {
    alert("Click on New staff? Register ");
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

export const signup = async (user) => {
  try {
    const response = await axios.post(`${base}auth/create`, user, Header);
    return response;
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    throw error;
  }
};
