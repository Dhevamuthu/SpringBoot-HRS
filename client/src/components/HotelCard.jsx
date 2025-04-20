import React from "react";
import "./HotelCard.css";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {getRomByHotel} from "../service/roomService.js"
import { useDispatch, useSelector } from "react-redux";
import { initRoomRedux } from "../store/roomSclice.js";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  
  const HandleExplore = async()=>{
    try {

      const response = await getRomByHotel(hotel.hid);
      if(response.status===200){
        console.log(response.data);
         dispatch(initRoomRedux({hotelId : hotel.hid, rooms : response.data}));
         navigate("/rooms");
      }
      
    } catch (error) {
      alert(error.message);
    }
  }

  const handleEdit = ()=>{
      navigate("/addhotel");
  }
  return (
    <div className="hotel-card">
      <div className="image-container">
        <img src={(hotel.image===null || hotel.image==="")?"https://th.bing.com/th/id/OIP.OqySqWhQQK7CNJLF6jViYQAAAA?rs=1&pid=ImgDetMain":hotel.image} alt={hotel.hotelName} className="hotel-image" />
        <FaEdit className="edit-icon"  onClick={handleEdit}/> {/* Edit icon */}
      </div>
      <h2 className="hotel-name">{hotel.hotelName}</h2>
      <p className="hotel-address">{hotel.hotelAddress}</p>
      <p className="hotel-state">{hotel.hotelState}</p>
      <button className="explore-btn" onClick={HandleExplore}>EXPLORE</button>
    </div>
  );
};

export default HotelCard;
