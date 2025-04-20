import React from "react";
import RoomCard from "../components/RoomCard";
import "./Rooms.css";
import { FaPlus ,FaShoppingCart} from "react-icons/fa";
import { Link ,useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";

const Rooms = () => {
  const roomsData = useSelector((state) => state.roomsData);
  const navigate = useNavigate();
  const cartData = useSelector((state)=> state.cartData.carts);

  const handleCart = ()=>{
    if(cartData.length===0) alert("empty Cart");
    else navigate("/booking")
  }
  
  return (
    <div className="rooms-container">
      <h1 className="rooms-heading">Available Rooms</h1>
      {roomsData.rooms.length >= 1 ? <div className="rooms-list">
        {roomsData.rooms.map((room,idx) => (
          <RoomCard key={idx} room={room} />
        ))}
      </div> : <p style={{textAlign:"center"}}>No Room Available</p>}
      <p className="cart-count">{cartData.length}</p>
        <FaShoppingCart className="cart" onClick={handleCart}/>
      <Link
          to="/addroom"
          className="floating-button"
        >
  <FaPlus />
</Link>
 
    </div>
  );
};

export default Rooms;
