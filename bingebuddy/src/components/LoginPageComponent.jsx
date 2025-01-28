import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { useAuth } from "./AuthContext";

const LoginPageComponent = () => {
  const { setAuth, authUser, setAuthUser, isLoggedIn, setIsLoggedIn } =
    useAuth();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const [loginSuccess, setLoginSuccess] = useState(false); // --- DELETE LATER ---

  // const { user, logout } = useContext(AuthContextComponent);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const loginData = { username, password };

    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        loginData,

        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data.accessToken;
      setAuth({ loginData, accessToken });
      setIsLoggedIn(true);
      setAuthUser({ loginData });
      setUserName("");
      setPassword("");
      // setLoginSuccess(true); // --- DELETE LATER ---

      if (response.status === 200) {
        console.log("Login successful");
        navigate("/dashboard-main/1");
      } else {
        setIsLoggedIn(false);
        setAuthUser(null);

        const errorData = await response.json();
        setError(errorData.message && "Login failed for user. Please retry!");
        console.log("Login failed");
      } // end of if
    } catch (error) {
      if (!error?.response) {
        setError("No Server Response");
        console.error("No Server Response", error);
      } else if (error.response?.status === 400) {
        setError("Missing username or Password");
        console.error("Missing username or Password", error);
      } else if (error.response?.status === 401) {
        setError("Unauthorized");
        console.error("Anauthorized", error);
      } else {
        setError("Login failed");
        console.error("Login error", error);
      }
    }
    //setLoginSuccess(true);
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
            </div>
            <div className="input-container">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
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
