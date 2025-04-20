import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { emptyCart  } from "../store/cartSlice";
import { setRoomEmpty } from "../store/roomSclice";
import { setHotelEmpty } from "../store/hotelSclice";
import { removeStaff } from "../store/staffSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginDropDown,setLoginDropDown] = useState(false);

  const handleLogOut = ()=>{
        dispatch(emptyCart());
        dispatch(setRoomEmpty());
        dispatch(setHotelEmpty());
        dispatch(removeStaff());
        navigate("/");
  }

  const userData = useSelector((state) => state.staffData.staff)
  

  return (
    <header className="header">
      <div className="logo">BookMate</div>
      <nav className="nav">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
          <NavLink to="/hotels" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Hotels</NavLink>
          {userData.isLogin ?
          (<div className="dropdown" onMouseEnter={() => setLoginDropDown(true)} onMouseLeave={() => setLoginDropDown(false)}>
            <p className="nav-link"> Welcome {userData.staffName}</p>
            {loginDropDown && (
              <div className="dropdown-menu">
                <button className="logout" onClick={handleLogOut}>Log Out</button>
              </div>
            )}
          </div>) : (<NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Login/SignUp</NavLink>)}
          </nav>
    </header>
  );
};

export default Header;
