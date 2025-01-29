import React from "react";
import SidebarComponent from "./SidebarComponent";

const SearchMovieComponent = () => {
  return (
    <div className="flex">
      <div>
        <SidebarComponent />
      </div>

      {/* <div className='h-screen flex-1 p-7'>
        <h1 className='center'>
          User can create / view their Watchlists here
        </h1>
      </div> */}

      <div className="container">
        <h2 className="text-center header"> Search Movie </h2>
        <p>
          <a href="single-movie/1">Click to go to Single Movie Page</a>
        </p>
      </div>
    </div>
  );
};

export default SearchMovieComponent;
