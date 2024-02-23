import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarForResetPasswordPage from "../components/NavbarForResetPasswordPage";
import fcmlogo from "../images/logo/fcmlogo.jpeg";
import "../styles/Login.css";

function ResetPassword() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div>
      <NavbarForResetPasswordPage />
      <div className="row">
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
            <div className="card-header p-5">Reset Password</div>
            <div className="card-body">
              <form>
                <div className="form-group p-1">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                   <button type="submit" className="custom-login-loginbutton">
                    Submit
                  </button>
                  <button type="button" className="custom-login-loginbutton" onClick={handleBack}>
                    Back
                  </button>
                 
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
