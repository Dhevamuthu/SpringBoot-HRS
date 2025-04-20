import React, { useState } from "react";
import HotelCard from "../components/HotelCard";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Hotels.css";


const Hotels = () => {
  const [search, setSearch] = useState("");

  const hotelsData = useSelector((state) => state.hotelData.hotels);
  const filteredHotels = hotelsData.filter((hotel) =>
    hotel.hotelName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="hotels-container">
      <input
        type="text"
        placeholder="Search Hotels..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="hotel-list">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel,key) => <HotelCard key={key} hotel={hotel} />)
        ) : (
          <p className="no-results">No hotels found.</p>
        )}
      </div>
      <Link to="/addhotel" className="floating-button">
        <FaPlus />
      </Link> 
    </div>
  );
};

export default Hotels;
