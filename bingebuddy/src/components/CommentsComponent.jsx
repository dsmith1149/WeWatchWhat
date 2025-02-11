import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const CommentsComponent = ({ reviewId }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("Token");

  useEffect(() => {
    if (!token) {
      setError("You must be logged in to view comments.");
      return;
    }

    fetchComments();
  }, [reviewId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/reviews/${reviewId}/comments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(response.data);
    } catch (error) {
      setError("Failed to load comments.");
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      setError("Comment cannot be empty.");
      return;
    }
  
    const token = localStorage.getItem("Token");
    if (!token) {
      setError("You must be logged in to comment.");
      return;
    }
  
    try {
      console.log("Sending Token:", token); // Debugging
  
      const response = await axios.post(
        `http://localhost:8080/reviews/${reviewId}/comments`,
        { content: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Comment Response:", response.data);
      setComments([...comments, { content: commentText, createdAt: new Date() }]);
      setCommentText("");
      setError(""); // Clear errors if successful
    } catch (error) {
      console.error("Error adding comment:", error.response?.data || error.message);
      setError(error.response?.data || "Failed to add comment.");
    }
  };
  

  return (
    <div className="p-4">
      <h3>Comments</h3>

      {error && <p className="text-red-500">{error}</p>}

      <div>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write your comment..."
          className="border p-2 w-full"
        />
        <button onClick={handleAddComment} className="bg-blue-500 text-white px-4 py-2 mt-2">
          Add Comment
        </button>
      </div>

      <div className="mt-4">
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment, idx) => (
            <div key={idx} className="border-b py-2">
              <p>{comment.content}</p>
              <span className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsComponent;
