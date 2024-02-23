import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import NavbarForLoginPage from "../components/NavbarForLoginPage";
import fcmlogo from "../images/logo/fcmlogo.jpeg";
import "../styles/Login.css";
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from "../slices/authSlice";
import { toast } from 'react-toastify';
import Preloader1 from "../components/Preloader";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/HomePage'; // Default redirect to homepage

useEffect (()=> {
  if (userInfo) {
    navigate(redirect);
  }
}, [userInfo, redirect, navigate]);



  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('submit');
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
 


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };



  return (
    <div>
      <NavbarForLoginPage />
      <div className="container">
        <div className="row justify-content-center">
          {/* Column for the image */}
          <div className="col-md-6">
            <img
              src={fcmlogo}
              alt="Description"
              className="img-fluid" // Bootstrap class for responsive images1`
            />
          </div>

          <div className="col-md-6">
            <div className="card custom-login-box">
              <div className="card-header p-5">Login</div>
              <div className="card-body">
                <form onSubmit={submitHandler}>
                  <div className="form-group p-1">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <button type="submit" className="custom-login-loginbutton"
                    >
                    Login
                  </button>

                  {isLoading && <Preloader1 />}

                  <Link to={redirect ? `/signup?redirect=${redirect}` : '/signup'}>
                    <button className="custom-login-registerbutton">
                      Don't have an account yet? Sign up here!
                    </button>
                  </Link>
                  <br></br>
                  <Link to="/resetpassword" style={{ textDecoration: "none", color: "black" }}>
                    <em className="custom-login-forgotpassword">Forgot your password? No worries. Reset now!</em>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
