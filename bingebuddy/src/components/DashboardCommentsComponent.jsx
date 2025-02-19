import React, { useEffect, useState } from "react";
import SidebarComponent from "./SidebarComponent";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const DashboardCommentsComponent = () => {
  const [userComments, setUserComments] = useState([]); // Store multiple comments
  const [errors, setErrors] = useState("");

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      // Debugging: Check if token is correct
      console.log("Token being sent:", token);

      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken); // Debugging JWT claims

      // Send authenticated request
      const response = await axios.get("http://localhost:8080/user-comments", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setErrors(error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="flex">
      <SidebarComponent />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">User Comments</h2>

        {errors && <p className="text-red-500">{errors}</p>}

        <table className="table-auto border-collapse border border-gray-500">
          <thead>
            <tr>
              <th className="border border-gray-500 px-4 py-2">Comment</th>
              <th className="border border-gray-500 px-4 py-2">Updated / Created</th>
            </tr>
          </thead>
          <tbody>
            {userComments.length > 0 ? (
              userComments.map((comment) => (
                <tr key={comment.id}>
                  <td className="border border-gray-500 px-4 py-2">{comment.content}</td>
                  <td className="border border-gray-500 px-4 py-2">{new Date(comment.updatedAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-4">No comments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardCommentsComponent;


