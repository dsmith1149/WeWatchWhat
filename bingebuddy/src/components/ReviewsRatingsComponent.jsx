import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import CommentsComponent from "./CommentsComponent";

const ReviewsRatingsComponent = ({ imdbId }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [reviewScore, setReviewScore] = useState("5");
  const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("Token"));

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const extractedUserId = decodedToken.userId || decodedToken.sub; 
        setUserId(extractedUserId);
        console.log("Decoded User ID:", extractedUserId);
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
  }, [token]);

  useEffect(() => {
    if (!imdbId) return;

    fetch(`http://localhost:8080/movies/${imdbId}/reviews`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch reviews. Status: ${res.status}`);
        return res.json();
      })
      .then((data) => setReviews(data))
      .catch((err) => console.error("Failed to load reviews:", err));
  }, [imdbId, token]);

  const handleAddReview = () => {
    if (!userId || !imdbId) {
      alert("You must be logged in to add a review!");
      console.error("Error: Missing userId or imdbId", { userId, imdbId });
      return;
    }

    const requestHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    console.log("Request Headers:", requestHeaders);

    fetch(`http://localhost:8080/movies/${imdbId}/reviews`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({
        userId: userId,
        content: reviewText,
        rating: reviewScore,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to add review. Status: ${res.status}`);

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return res.json();
        } else {
          return res.text();
        }
      })
      .then((data) => {
        console.log("Review Response:", data);
        setReviews([...reviews, { content: reviewText, rating: reviewScore }]);
        setReviewText("");
        setReviewScore("");
      })
      .catch((err) => {
        console.error("Failed to add review:", err);
        alert("Failed to add review.");
      });


  };


  return (
    <div>
      <h2>Reviews & Ratings</h2>
      <div>
        <h3>Add a Review</h3>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
        />
        <select value={reviewScore} onChange={(e) => setReviewScore(e.target.value)}>
          {[...Array(5)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1} Stars
            </option>
          ))}
        </select>
        <button onClick={handleAddReview}>Submit Review</button>
      </div>
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="border p-4">
            <p>{review.content}</p>
            <span>⭐ {review.rating}</span>

            <CommentsComponent reviewId={review.id} />
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewsRatingsComponent;

