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
  const [error, setError] = useState("");

  const [loginSuccess, setLoginSuccess] = useState(false); // --- DELETE LATER ---
  // const { user, logout } = useContext(AuthContextComponent);

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  // --- start of Validation ---
  function validateForm(username, password) {
    let i = 0;

    if (!validator.isEmail(username)) {
      console.log("Please enter a valid email");
      i++;
      // setLoginSuccess(false);
    }

    if (!password) {
      console.log("Enter Password");
      i++;
      // setLoginSuccess(false);
    }
    // if (password.length < 8) {
    if (password.length < 5) {
      console.log("Password must be atleast 8 characters");
      i++;
      // setLoginSuccess(false);
    }
    if (!/\d/.test(password)) {
      console.log("Password must include a number");
      i++;
      // setLoginSuccess(false);
    }

    if (i > 0) {
      setLoginSuccess(false);

      const errorsCopy = { ...errors };

      if (username.trim()) {
        errorsCopy.username = "";
      } else {
        errorsCopy.username = "Enter a Email";
        // valid = "false";
      }

      if (password.trim()) {
        errorsCopy.password = "";
      } else {
        errorsCopy.password = "Enter a password";
        // valid = "false";
      }

      setErrors(errorsCopy);
      console.log("Incorrect email or password. Please enter correct details.");
    } else {
      setLoginSuccess(true);
    }
    return;
  } // --- End of Validation ---

  // const passwordValidator = (password) => {

  // }; // end of password validation

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    validateForm(username, password);

    // } // end validateForm()

    if (loginSuccess) {
      const loginData = { username, password };
      console.log(loginData);

      try {
        const response = await axios.post(
          "http://localhost:8080/login",
          loginData,

          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        // const accessToken = response?.data.accessToken;
        // setAuth({ loginData, accessToken });
        // setIsLoggedIn(true);
        // setAuthUser({ loginData });
        setUserName("");
        setPassword("");
        // setLoginSuccess(true); // --- DELETE LATER ---

        if (response.status === 200) {
          login(); // useAuth Login-Logout
          console.log("Login successful");
          navigate("/dashboard-main/1");
        } else {
          // setIsLoggedIn(false);
          // setAuthUser(null);

          const errorData = await response.json();
          setError(errorData.message && "Login failed for user. Please retry!");
          console.log("Login failed");
        } // end of if
      } catch (error) {
        const errorData = await response.json();
        setError(errorData.message && "Login failed for user. Please retry!");
        console.log("Login failed");

        setError("Error! Please retry.");
        console.error("Error! Please retry.", error);

        //navigate("/");
      }
    }
  };

  // --- DELETE LATER ---
  // if (loginSuccess) {
  //   return (
  //     <div className="centered-container">
  //       <div className="login-container">
  //         <h1>Logged in successfully</h1>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div>
      <div className="flex">
        {/* <div className="row g-0 mt-5"> */}
        <div className="home-image"></div>
        {/* </div> */}
      </div>

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
                onChange={(e) => setUserName(e.target.value)}
              />
              {errors.username && (
                <div className="invalid-feedback"> {errors.username} </div>
              )}
            </div>
            <div className="input-container">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <div className="invalid-feedback"> {errors.password} </div>
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
            {error && { error }}
            <div className="login-link">
              <p className="registration-link">
                Don't have an account?{" "}
                <a href="/signup">Click here to SignUp</a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPageComponent;
