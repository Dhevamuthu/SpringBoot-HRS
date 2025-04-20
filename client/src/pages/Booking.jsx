import React, { useState, useEffect, useRef } from "react";
import { Button, TextField, Card, CardContent } from "@mui/material";
import "./Booking.css"; 
import { useSelector} from "react-redux";
import {findGuestByPhone,createGuest} from "../service/guestServie.js"
import { updateRoomBooking } from "../service/roomService.js";
import { addBooking } from "../service/bookingService.js";
import { useDispatch } from "react-redux";
import { updateRoomRedux } from "../store/roomSclice.js";
import { useNavigate } from "react-router-dom";
const Booking = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCreateGuest,setIsCreateGuest] = useState(false);
  const [arrivalDate, setArrivalDate] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestDetails,setGuestDetails] = useState({});
  const [phone, setPhone] = useState("");
 const addedRooms = useSelector((state) => state.cartData.carts);
  const [stayDuration, setStayDuration] = useState("");

  const guestNameRef = useRef(null);
  const phoneRef = useRef(null);
  const arrivalDateRef = useRef(null);
  const arrivalTimeRef = useRef(null);
  const departureDateRef = useRef(null);
  const departureTimeRef = useRef(null);

  useEffect(() => {
    const now = new Date();
    setArrivalDate(now.toISOString().split("T")[0]); 
    setArrivalTime(now.toTimeString().slice(0, 5)); 
  }, []);

  useEffect(() => {
    if (arrivalDate && arrivalTime && departureDate && departureTime) {
      calculateStayDuration();
    }
  }, [arrivalDate, arrivalTime, departureDate, departureTime]);

  const calculateStayDuration = () => {
    const arrival = new Date(`${arrivalDate}T${arrivalTime}`);
    const departure = new Date(`${departureDate}T${departureTime}`);

    if (arrival >= departure) {
      setStayDuration("Invalid Dates");
      return;
    }

    const diffMs = departure - arrival;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    setStayDuration(
      diffDays > 0 ? `${diffDays} days ${diffHours} hr` : `${diffHours} hr`
    );
  };

  const handleBooking = async() => {

    if(arrivalDate>departureDate) alert("invalid date");

    const curDate = `${departureDate}T${departureTime}`;
    if(isCreateGuest){
      try {
        const response = await createGuest({guestName,phone});
        console.log(response.data);
        setGuestName(response.data.guestName)
        setGuestDetails(response.data);
      } catch (error) {
        console.log(error.response);
         alert("phone Number already Taken")
         return;
      }
      navigate('/rooms')
    }
    
    try {
      const responses  = await Promise.all(
         addedRooms.map((data)=> updateRoomBooking(data.rid,{bookedUntill : curDate}))
      );

      console.log(responses);

      responses.forEach(element => {
        dispatch(updateRoomRedux({room : element.data}))
      });

      const formateBookingData = {
        guest : {
          gid : guestDetails.gid
        },
        guestName,
        bookedDate : `${arrivalDate}T${arrivalTime}`,
        bookedUntill : curDate,
        rooms : addedRooms

      }
      const bookingResponse = await addBooking(formateBookingData);
      navigate(-1);
      
      
    } catch (error) {
      console.log(error);
      
    }
    
    alert("Booking Confirmed!");
  };

  const handleKeyPress = (event, nextRef) => {
    if (event.key === "Enter") {
      event.preventDefault();
      nextRef?.current?.focus();
    }
  };

  const verifyNumber = async()=>{
    if(phone.length===10){
      try {
        const response = await findGuestByPhone(phone);
        console.log(response.data);
        setGuestDetails(response.data);
        setIsCreateGuest(false);
        setGuestName(response.data.guestName);
        
      } catch (error) {
        console.log(error.response);
        setGuestName("");
        setIsCreateGuest(true);
      }
     
    }else alert("Moble number has 10 digit");
  }

  return (
    <div className="booking-container">
      <Card className="booking-card">
        <CardContent>
          <h2 className="title">Hotel Booking</h2>
          <div className="phone-container">
          <TextField
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, arrivalDateRef)}
            inputRef={phoneRef}
            fullWidth
            margin="normal"
          />
          <button className="verify-number" onClick={verifyNumber}>verify</button>
          </div>
          <TextField
            label="Guest Name"
            fullWidth
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, phoneRef)}
            inputRef={guestNameRef}
            margin="normal"
          />
          
          <TextField
            label="Arrival Date"
            type="date"
            fullWidth
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, arrivalTimeRef)}
            inputRef={arrivalDateRef}
            margin="normal"
          />
          <TextField
            label="Arrival Time"
            type="time"
            fullWidth
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, departureDateRef)}
            inputRef={arrivalTimeRef}
            margin="normal"
          />
          <TextField
            label="Departure Date"
            type="date"
            fullWidth
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, departureTimeRef)}
            inputRef={departureDateRef}
            margin="normal"
          />
          <TextField
            label="Departure Time"
            type="time"
            fullWidth
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, null)}
            inputRef={departureTimeRef}
            margin="normal"
          />
          <div className="stay-duration">
            <strong>Stay Duration:</strong> {stayDuration}
          </div>
          <div className="room-list">
            <strong>Added Rooms:</strong> {addedRooms.map((data,idx)=> {
              if(idx==addedRooms.length-1) return data.roomNumber;
              else return `${data.roomNumber} |`;
            })}
          </div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleBooking}
            style={{ backgroundColor: "blue" }}
          >
            Book
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Booking;
