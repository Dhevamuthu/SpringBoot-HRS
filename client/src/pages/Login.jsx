import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { login, signup } from "../service/loginService";
import { initStaff } from "../store/staffSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "./Login.css";
import { initHotel } from "../store/hotelSclice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [staff, setStaff] = useState({
    staffName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const updateData = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   if (isLogin) {
  //     try {
  //       console.log("Attempting login with:", staff); // Debugging line
  //       const response = await login({
  //         email: staff.email,
  //         password: staff.password,
  //       });

  //       console.log("Login response:", response); // Debugging line

  //       if (response && response.status === 200) {
  //         const { hotels, ...staffData } = response.data;
  //         console.log("Hotels:", hotels);

  //         dispatch(initStaff(staffData));
  //         dispatch(initHotel(hotels));
  //         navigate("/hotels");
  //       } else {
  //         console.log("Unexpected response structure:", response);
  //       }
  //     } catch (error) {
  //       console.error("Login error:", error.response?.data || error.message);
  //     }
  //   } else {
  //     try {
  //       console.log("Attempting signup with:", staff); // Debugging line
  //       const response = await signup({
  //         staffName: staff.staffName,
  //         email: staff.email,
  //         password: staff.password,
  //       });

  //       console.log("Signup response:", response); // Debugging line

  //       if (response && response.status === 201) {
  //         navigate("/login");
  //       } else {
  //         alert("Internal Server Error");
  //       }
  //     } catch (error) {
  //       alert(error.response?.data?.message || "Signup failed");
  //     }
  //   }
  // };

  const handleLogin = async(e)=>{
    e.preventDefault();

    if(isLogin){
        try {
          const response = await login({
            "email" : staff.email,
            "password" : staff.password
          }
        );
          if(response.status==200){
              const {hotels,...staffData} = response.data;
              console.log(hotels);
              
              dispatch(initStaff(staffData));
              dispatch(initHotel(hotels))
              navigate('/hotels');
          }
          
        } catch (error) {
          console.log(error.response.status);
        }
  }else{

    try {
      const response = await signup({
        staffName : staff.staffName,
        email : staff.email,
        password :staff.password
      });
  
      if(response.status==201){
        setIsLogin(true)
      }else alert("Internal Server Error");
    }
       catch (error) {
         alert(error.response.data.message);
    }
  }
  }

  return (
    <MDBContainer fluid className="login-container">
      <MDBRow className="align-items-center justify-content-center">
      
        <MDBCol md="6" className="image-side"></MDBCol>
        <MDBCol md="4" className="login-box">
          {/* App Name */}
          <h2 className="app-name text-center">BOOKMATE</h2>
          <p className="app-quote text-center">Welcome Staff! Login to continue</p>

          <div className="login-form">
            {!isLogin && (
              <>
                <MDBInput
                  wrapperClass="mb-3"
                  label="Your Name"
                  value={staff.staffName}
                  name="staffName"
                  type="text"
                  onChange={updateData}
                />
              </>
            )}
            <MDBInput
              wrapperClass="mb-3"
              label="Email address"
              id="email"
              value={staff.email}
              name="email"
              type="email"
              size="sm"
              onChange={updateData}
            />
            <MDBInput
              wrapperClass="mb-3"
              label="Password"
              id="password"
              value={staff.password}
              name="password"
              type="password"
              size="sm"
              onChange={updateData}
            />
            {!isLogin && (
              <>
                <MDBInput
                  wrapperClass="mb-3"
                  label="Repeat your password"
                  value={staff.confirmPassword}
                  name="confirmPassword"
                  type="password"
                  onChange={updateData}
                />
              </>
            )}

            <div className="d-flex justify-content-between mx-2 mb-3 remember-forgot">
              <p className="forgot-password" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "New Staff? Register" : "Already Have Account?"}
              </p>
            </div>

            <MDBBtn className="w-100 login-btn" onClick={handleLogin}>
              {isLogin ? "Log in" : "Sign Up"}
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
