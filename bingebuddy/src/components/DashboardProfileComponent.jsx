import { useState, useEffect } from "react";
import React from "react";
import SidebarComponent from "./SidebarComponent";
import { useNavigate, useParams } from "react-router-dom";

const DashboardProfileComponent = () => {
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
    const loadData = async (e) => {
      //e.preventDefault();
      //navigate("/add-user");

      setErrors(errorsCopy);
      console.log(userData);

      try {
        const response = await axios.get("http://localhost:8080/user/1");

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setErrors(error.message);
      }
    };
    //loadData());
  });

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
                  <label className="form-label"> Username: </label>
                  <input
                    type="text"
                    placeholder="Email"
                    name="username"
                    value={userData.username}
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
                  <label className="form-label"> Genre of your choice: </label>
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
                    Another Genre of your choice (optional):{" "}
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfileComponent;
