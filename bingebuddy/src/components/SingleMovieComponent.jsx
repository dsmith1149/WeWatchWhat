import React from "react";
import SidebarComponent from "./SidebarComponent";

const SingleMovieComponent = () => {
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
        <h2 className="text-center header"> Individual Movie Page </h2>
      </div>
    </div>
  );
};

export default SingleMovieComponent;
