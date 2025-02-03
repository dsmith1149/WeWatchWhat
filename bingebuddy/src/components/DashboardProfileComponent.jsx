import { useState, useEffect } from "react";
import React from "react";
import SidebarComponent from "./SidebarComponent";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DashboardProfileComponent = (subject) => {
  // const [username, setUserName] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [genre, setGenre1] = useState("");
  // const [anotherGenre, setGenre2] = useState("");

  const [userData, setUserData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    genre: "",
    anotherGenre: "",
  });

  const { id } = useParams();

  const [errors, setErrors] = useState();

  const navigator = useNavigate();

  useEffect(() => {
    console.log("From useEffect");
    loadData();
  });

  const loadData = async (e) => {
    //e.preventDefault();
    //navigate("/add-user");

    console.log("From loadData");

    try {
      console.log("From Try");

      const token = localStorage.getItem("Token");
      if (!token) {
        setErrors("Cannot get user profile at this time");
        console.log("Cannot get user profile at this time");
        throw new Error("Failed to fetch user profile");
      }

      //
      console.log("Subject " + subject);

      const response = await axios.get(
        "http://localhost:8080/user-profile/{subject}",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData(response.data);
    } catch (error) {
      setErrors(error.message);
    }

    console.log("From Try2");
    console.log(response);
    console.log(userData);
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
                <div>
                  {errors ? (
                    <label className="form-label">Errors: {errors} </label>
                  ) : (
                    <>
                      <div className="form-group mb-2">
                        {/* Generated automatically, user doesn't have to type in */}
                        <label className="form-label"> Username: </label>
                        <input
                          type="text"
                          placeholder="Email"
                          name="username"
                          value={userData.username}
                          className={`form-control`}
                          disabled
                          //readOnly
                        ></input>
                      </div>
                      <div className="form-group mb-2">
                        <label className="form-label"> First Name: </label>
                        <input
                          type="text"
                          placeholder="Enter Last Name"
                          name="lastName"
                          value={userData.firstName}
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
                          value={userData.lastName}
                          className={`form-control`}
                          disabled
                        ></input>
                      </div>
                      <div className="form-group mb-2">
                        <label className="form-label">
                          Genre of your choice:
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Genre"
                          name="genre"
                          value={userData.genre}
                          className={`form-control`}
                          disabled
                        ></input>
                      </div>
                      <div className="form-group mb-2">
                        <label className="form-label">
                          Another Genre of your choice (optional):
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Another Genre"
                          name="genre2"
                          value={userData.anotherGenre}
                          className={`form-control`}
                          disabled
                        ></input>
                      </div>
                      {/* <button className="btn btn-success" onClick={handleClick}>
                  Click to Update
                </button> */}
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfileComponent;
