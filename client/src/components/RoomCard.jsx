import React from "react";
import "./RoomCard.css";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart, removeCart } from "../store/cartSlice";

const RoomCard = ({ room }) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartData = useSelector((state)=>state.cartData.carts);

  const isCart = cartData.some((cart)=> cart.rid===room.rid);

  const handleEdit = () => {
    navigate("/addroom", { state: room });
  };

  const addToCart = ()=>{
    dispatch(addCart({rid : room.rid,roomNumber : room.roomNumber}));
  }
  const removeFromCart = ()=>{
    dispatch(removeCart({rid : room.rid,roomNumber : room.roomNumber}));
  }

  return (
    <div className="room-card">
      <FaEdit className="edit-icon" onClick={handleEdit} />

      <span className="room-number">Room No : {room.roomNumber}</span>

      <img src={room.image} alt={`Room ${room.roomNumber}`} className="room-image" />

      <div className="room-info">
        <p className="room-description">{room.roomDesc}</p>
        <span className="room-price">₹{room.price}</span>
        {room.bookedUntill==null || room.bookedUntill<(new Date()).toISOString().slice(0,16) ?
        <button className="book-now" onClick={()=>{ 
          if(isCart) removeFromCart();
          else addToCart();
        }}>{isCart ? "Remove From Cart" : "Add To Cart"}</button>
      : <h3 className="booked">Booked</h3>}
      </div>
    </div>
  );
};

export default RoomCard;
