import { useState } from "react";
import React from "react";
import SidebarComponent from "./SidebarComponent";
import { useNavigate } from "react-router-dom";

const DashboardProfileComponent = () => {
  const [email, setEmail] = useState("");
  // const[userName, setUserName] = useState('')
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [genre1, setGenre1] = useState("");
  const [genre2, setGenre2] = useState("");

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    navigate("/add-user");
  };

  return (
    <div className="flex">
      <div>
        <SidebarComponent />
      </div>

      <div className="container">
        <h1 className="center">User Profile</h1>
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  {/* Generated automatically, user doesn't have to type in */}
                  <label className="form-label"> Email: </label>
                  <input
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    value={email}
                    className={`form-control`}
                    disabled
                    // readOnly
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> First Name: </label>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    name="firstName"
                    value={firstName}
                    className={`form-control`}
                    disabled
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Last Name: </label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    name="lastName"
                    value={lastName}
                    className={`form-control`}
                    disabled
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Genre of your choice: </label>
                  <input
                    type="text"
                    placeholder="Enter Genre"
                    name="genre1"
                    value={genre1}
                    className={`form-control`}
                    disabled
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">
                    Another Genre of your choice (optional):{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Another Genre"
                    name="genre2"
                    value={genre2}
                    className={`form-control`}
                    disabled
                  ></input>
                </div>
                <button className="btn btn-success" onClick={handleClick}>
                  Click to Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfileComponent;
