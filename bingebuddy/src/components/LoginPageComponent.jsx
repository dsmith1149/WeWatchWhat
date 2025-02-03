import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { useAuth } from "./AuthContext";
import validator from "validator";

const LoginPageComponent = () => {
  // const { setAuth, authUser, setAuthUser, isLoggedIn, setIsLoggedIn } =
  //   useAuth();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // -------- Checks for errors after 200 msg ----------

  // const { user, logout } = useContext(AuthContextComponent);

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const errorsCopy = { ...errors };

  const navigate = useNavigate();
  const { login } = useAuth();

  let i = 0; // Counter to track login-password

  const handleChangeUsername = (e) => {
    e.preventDefault();
    setUserName(e.target.value);
    setErrors("", "");
    setError("");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
    setErrors("", "");
    setError("");
  };

  // --- start of Validation ---
  function validateForm(username, password) {
    if (username.trim() && password.trim()) {
      // if characters in username-password, set errorsCopy to empty
      errorsCopy.username = "";
      errorsCopy.password = "";
    } else {
      errorsCopy.username = "Enter Email & Password"; // if either email or password is empty, display a generic msg for both
      //errorsCopy.password = "Enter Password";
      console.log("Enter Email & Password");
      i++;
      console.log("Value in i : " + i);
      return;
    }
    if (!validator.isEmail(username)) {
      errorsCopy.username = "Please enter a valid email"; // msg displayed
      console.log("Please enter a valid email");
      console.log("Value in i : " + i);
      i++;
      return;
    }

    if (password.length < 5 || !/\d/.test(password)) {
      errorsCopy.password =
        "Password must contain a number & be atleast 8 characters";
      console.log("Password must contain a number & be atleast 8 characters");
      i++;
      console.log("Value in i : " + i);
      return;
    }
  } // --- End of validateForm() ---

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Server side errors
    setErrors("", ""); // username-password validation

    validateForm(username, password);

    setErrors(errorsCopy);

    if (i <= 0) {
      const loginData = { username, password };
      console.log(loginData);

      // http://localhost:8080/login

      try {
        const response = await axios.post(
          "http://localhost:8080/loginjwt",
          loginData,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        const accessToken = response?.data.token;
        localStorage.setItem("Token", accessToken);

        //setAuth({ loginData, accessToken });
        // setIsLoggedIn(true);
        // setAuthUser({ loginData });
        setUserName("");
        setPassword("");

        if (response.status === 200) {
          login(); // useAuth Login-Logout
          console.log("Login successful");
          navigate("/dashboard-main/1");
        } else {
          const errorData = await response.json();
          console.log(
            "From catch after try axios: Login failed for user. Please retry!"
          );
          setError(
            errorData.message &&
              "From else after 200 msg: Login failed for user. Please retry!"
          ); // check if this msg is displayed
          console.log("Login failed");
        } // end of if
      } catch (error) {
        setError("Error logging in! Please retry.");
        console.error("Error logging in! Please retry.", error);

        //navigate("/");
      }
    }
  };

  return (
    <div>
      <form>
        <div className="container login-container">
          <div className="login-form">
            <h2 className="text-center header">Login to your Account</h2>

            <div className="input-container">
              <input
                type="email"
                placeholder="Enter email"
                value={username}
                required
                onChange={handleChangeUsername}
              />
              {errorsCopy.username && (
                <div className="invalid-feedback"> {errorsCopy.username} </div>
              )}
            </div>
            <div className="input-container">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                required
                onChange={handleChangePassword}
              />
              {errorsCopy.password && (
                <div className="invalid-feedback"> {errorsCopy.password} </div>
              )}
            </div>
            <div className="input-container">
              <button
                className="btn btn-primary mb-2 login-button"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>

            <div className="login-link">
              <p className="registration-link">
                Don't have an account?{" "}
                <a href="/signup">Click here to SignUp</a>
              </p>
            </div>
          </div>

          <p className="cerror" name="errorlabel">
            {errorsCopy.username}
            <br />
            {errorsCopy.password}
            {error}
          </p>
        </div>
      </form>

      <div className="flex">
        {/* <div className="row g-0 mt-5"> */}
        <div className="home-image"></div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default LoginPageComponent;
