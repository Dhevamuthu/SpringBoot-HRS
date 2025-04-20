import React, { useState } from "react";
import "./HotelForm.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addHotel } from "../service/hotelService";
import { addHotelRedux } from "../store/hotelSclice";

const HotelForm = () => {
  const location = useLocation();
  const staffData = useSelector((state) => state.staffData.staff);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const curHotel = location.state || {
    hotelName: "",
    hotelAddress: "",
    hotelCity: "",
    hotelState: "",
    pincode: "",
  };

  const [formData, setFormData] = useState({
    hotelName: curHotel.hotelName,
    hotelAddress: curHotel.hotelAddress,
    hotelCity: curHotel.hotelCity,
    hotelState: curHotel.hotelState,
    pincode: curHotel.pincode,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Generate preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    const formattedHotel = {
      ...formData,
      staff: {
        sid: staffData.sid,
      },
    };

    // Convert JSON to string and append
    formDataToSend.append("hotel", JSON.stringify(formattedHotel));

    // Append image
    if (image) {
      formDataToSend.append("image", image);
    }

    try {
      const response = await addHotel(formDataToSend);
      if (response.status === 200) {
        dispatch(addHotelRedux(response.data));
        navigate(-1);
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Hotel Registration</h2>
      <form onSubmit={handleSubmit} className="hotel-form">
        <div className="form-row">
          <div className="form-group full-width">
            <label>Hotel Name</label>
            <input
              type="text"
              name="hotelName"
              value={formData.hotelName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label>Hotel Address</label>
            <textarea
              name="hotelAddress"
              value={formData.hotelAddress}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              name="hotelState"
              value={formData.hotelState}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="hotelCity"
              value={formData.hotelCity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Pincode</label>
            <input
              type="number"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <label>Upload Hotel Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {/* Image Preview */}
        {preview && <img src={preview} alt="Preview" className="image-preview" />}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HotelForm;
