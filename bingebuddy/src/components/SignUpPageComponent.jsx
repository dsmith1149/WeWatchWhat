import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const SignUpPageComponent = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      console.log("Passwords do not match");
      setError("Passwords do not match!");
      return;
    }
    setError("");

    try {
      console.log(userData);

      // Testing this part out...
      // const response = await axios.post('http://localhost:8080/api/users/add-user-login', userData);

      const response = await axios.post(
        "http://localhost:8080/register",
        userData
      );
      if (response.status == 201) {
        console.log("user registered: ", response.data);
        console.log(userData);
      } else {
        const errorText = await response.text();
        setError(errorText);
      }
    } catch (error) {
      setError("An eror occurred during user registration");
      console.log("Registration error: ", error);
    }
    setRegistrationSuccess(true);
  };

  if (registrationSuccess) {
    return (
      <div className="centered-container">
        <div className="login-container">
          <h1> Registered successfully</h1>
          <p>
            To complete signup enter <a href="/add-user">your details </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container login-container">
      <form>
        <div className="login-form">
          <h2 className="text-center header">Create BingeBuddy Account</h2>

          <div className="input-container">
            <input
              type="email"
              placeholder="Email"
              name="username"
              value={userData.username}
              required
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={userData.password}
              required
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={userData.confirmPassword}
              required
              onChange={handleChange}
            />
          </div>

          {error && { error }}

          <button
            className="btn btn-primary mb-2 login-button"
            onClick={handleRegistration}
          >
            SignUp
          </button>

          <div className="login-link">
            <p className="registration-link">
              Already have an account? <a href="/">Login here</a>
            </p>
          </div>
        </div>

        <div className="flex">
          {/* <div className="column g-0 mt-5"> */}
          <div className="home-image"></div>
          {/* </div> */}
        </div>
      </form>
    </div>
  );
};

export default SignUpPageComponent;
