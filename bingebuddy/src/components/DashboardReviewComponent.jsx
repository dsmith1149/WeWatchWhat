import React, { useEffect, useState } from "react";
import SidebarComponent from "./SidebarComponent";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const DashboardReviewComponent = () => {
  const [userReviews, setUserReviews] = useState([]);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      // Debugging: Check if token is correct
      console.log("Token being sent:", token);

      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken); // Debugging JWT claims

      const userId = decodedToken.userId || decodedToken.sub; // Ensure correct claim

      // Send authenticated request
      const response = await axios.get(`http://localhost:8080/user-reviews`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setErrors(error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="flex">
      <SidebarComponent />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">User Reviews</h2>
        {errors && <p className="text-red-500">{errors}</p>}
        <table className="table-auto border-collapse border border-gray-500">
          <thead>
            <tr>
              <th className="border border-gray-500 px-4 py-2">Review</th>
              <th className="border border-gray-500 px-4 py-2">Updated / Created</th>
            </tr>
          </thead>
          <tbody>
            {userReviews.length > 0 ? (
              userReviews.map((review) => (
                <tr key={review.id}>
                  <td className="border border-gray-500 px-4 py-2">{review.content}</td>
                  <td className="border border-gray-500 px-4 py-2">{new Date(review.updatedAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-4">No reviews found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardReviewComponent;


