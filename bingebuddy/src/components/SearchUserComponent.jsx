import React from "react";
import SidebarComponent from "./SidebarComponent";

const SearchUserComponent = () => {
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
        <h2 className="text-center header"> Search for a User! </h2>
      </div>
    </div>
  );
};

export default SearchUserComponent;
