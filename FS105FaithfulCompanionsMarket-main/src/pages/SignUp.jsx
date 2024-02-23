import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import NavbarForLoginPage from '../components/NavbarForLoginPage';
import Preloader1 from "../components/Preloader";
import fcmlogo from "../images/logo/fcmlogo.jpeg";
import "../styles/SignUpPage.css";

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/HomePage'; // Default redirect to homepage

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

 const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };


  return (
    <div>
      <NavbarForLoginPage />
      <div className="container">
        <div className="row">
          {/* Column for the image */}
          <div className="col-md-6">
            <img
              src={fcmlogo}
              alt="Description"
              className="img-fluid" // Bootstrap class for responsive images
            />
          </div>
          {/* Column for the form */}
          <div className="col-md-6">
            <div className="card custom-signup-box">
              <div className="card-header p-5">Sign up for <em className="fw-bold fs-3">FREE</em> membership!</div>
              <div className="card-body">
                <form onSubmit={submitHandler}>
                  <div className="form-group p-1">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
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
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                  </div>
                  <button type="submit" className="custom-signup-registermembershipbuttton" disabled={isLoading}>
                    Register membership
                  </button>

                  {isLoading && <Preloader1 />}

                  <Link to={redirect ? `/signup?redirect=${redirect}` : '/signup'}>
                    <button className="custom-signup-takeatour">
                      Still not so sure? Take a tour in our online shop!
                    </button>
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

export default SignUp;
