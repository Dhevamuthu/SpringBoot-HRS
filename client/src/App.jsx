import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Hotels from "./pages/Hotels";
import Rooms from "./pages/Rooms";
import Booking from "./pages/Booking";
import RoomForm from "./pages/RoomForm";
import HotelForm from "./pages/HotelForm";
import Header from "./pages/Header";
import Homepage from "./pages/Homepage";
import "./App.css";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        
        <Route path="/login" element={<Login />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/addhotel" element={<HotelForm />} />
        <Route path="/addroom" element={<RoomForm />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
      
    </>
  );
}

export default App;
