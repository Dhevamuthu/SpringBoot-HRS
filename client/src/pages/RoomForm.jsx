import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import "./RoomForm.css";
import { useLocation } from "react-router-dom";
import { addRoom, updateRoom } from "../service/roomService";
import { useDispatch, useSelector } from "react-redux";
import { addRoomRedux, updateRoomRedux } from "../store/roomSclice";

const RoomForm = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const curRoom = location.state || {
    roomNumber: "",
    roomDesc: "",
    price: ""
  };

  const hotelId = useSelector((state) => state.roomsData.hotelId);

  const [formData, setFormData] = useState({
    roomNumber: curRoom.roomNumber,
    roomDesc: curRoom.roomDesc,
    price: curRoom.price,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hotel Id: " + hotelId);

    const formattedData = {
      ...formData,
      hotel: {
        hid: hotelId,
      }
    };

    const formDataToSend = new FormData();
    formDataToSend.append("room", JSON.stringify(formattedData));
    if (image) {
      formDataToSend.append("image", image);
    }

    try {
      if (curRoom.roomNumber == "") {
        const response = await addRoom(formDataToSend);
        if (response.status === 200) {
          dispatch(addRoomRedux(response.data));
          navigate(-1);
        }else alert("not to add");
      } else {
        const response = await updateRoom(curRoom.rid, formDataToSend);
        console.log(response.data);
        if (response.status === 200) {
          dispatch(updateRoomRedux({ room: response.data }));
          setTimeout(() => {
            navigate(-1);
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error);
    }

    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Room Registration</h2>
      <form onSubmit={handleSubmit} className="room-form">
        <label>Room Number</label>
        <input
          type="text"
          name="roomNumber"
          value={formData.roomNumber}
          onChange={handleChange}
          required
        />

        <label>Room Description</label>
        <textarea
          name="roomDesc"
          value={formData.roomDesc}
          onChange={handleChange}
          required
        />

        <label>Room Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        {/* Image Upload Section */}
        <label>Upload Room Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {/* Image Preview */}
        {preview && <img src={preview} alt="Preview" className="image-preview" />}

        <button type="submit">
          {curRoom.roomNumber !== "" ? "Update" : "Submit"}
        </button>
      </form>

      <Link to="/addroom" className="floating-button">
        <FaPlus />
      </Link>
    </div>
  );
};

export default RoomForm;
