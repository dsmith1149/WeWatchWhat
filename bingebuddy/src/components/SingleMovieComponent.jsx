import React, { useEffect, useState } from "react";
import SidebarComponent from "./SidebarComponent";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ReviewsRatingsComponent from "./ReviewsRatingsComponent";  

const SingleMovieComponent = () => {
  const { imdbId } = useParams(); 
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  let userId = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.sub.toString();
    } catch (err) {
      console.error("Error decoding token:", err);
    }
  }

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log("🎬 Loading movie with IMDb ID:", imdbId);

  
  useEffect(() => {
    if (!imdbId) return;

    fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=a6836b7c`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "False") {
          setError("Movie not found.");
        } else {
          setMovie(data);
        }
      })
      .catch(() => setError("Failed to fetch movie details."))
      .finally(() => setLoading(false));
  }, [imdbId]);

 
  const handleAddToWatchlist = () => {
    if (!userId) {
      alert("You must be logged in to add to your watchlist!");
      return;
    }

    fetch(`http://localhost:8080/user-watchlists?imdbId=${imdbId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        alert("Movie added to watchlist!");
        navigate("/dashboard-watchlists/" + userId); 
      })
      .catch(() => alert("Failed to add to watchlist."));
  };

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex">
      <SidebarComponent />
      <div className="container p-6">
        {movie ? (
          <>
   
            <h2 className="text-center text-3xl font-bold">{movie.Title}</h2>
            <div className="flex justify-center mt-4">
              <img src={movie.Poster} alt={movie.Title} className="rounded-lg shadow-lg w-64" />
            </div>

         
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
              onClick={handleAddToWatchlist}
            >
              ➕ Add to Watchlist
            </button>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 ml-2"
              onClick={() => navigate(`/user-reviews/${imdbId}`)} 
            >
              ✍️ Write a Review
            </button>

           
            <ReviewsRatingsComponent imdbId={imdbId} />
          </>
        ) : (
          <p className="text-red-500">Movie not found.</p>
        )}
      </div>
    </div>
  );
};

export default SingleMovieComponent;





