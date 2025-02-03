import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import DashboardProfileComponent from "./DashboardProfileComponent";

const DecodeTokenComponent = () => {
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    const decodeToken = () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          throw new Error("No token found");
        }

        const decodedToken = jwt_decode(token);
        setSubject(decodedToken.subject);
      } catch (error) {
        console.error("Error decoding token", error);
      }
    };

    decodeToken();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <DashboardProfileComponent subject={subject} />
      {/* {subject ? <p>Subject: {subject}</p> : <p>Loading...</p>} */}
    </div>
  );
};

export default DecodeTokenComponent;
