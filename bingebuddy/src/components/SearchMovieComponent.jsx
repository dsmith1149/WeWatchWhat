import { useState } from "react";

export default function SearchMovie() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }
 
  const handleSubmit = (event) => {
    let input = searchTerm;
    alert(1+input)
    let url = `https://www.omdbapi.com/?s=${input}&apikey=a6836b7c`
    alert(2 + url)
    const fetchPromise = fetch(url);
    fetchPromise.then(function(response){
      alert(3+response)
    })
    }
  
  return(
    <div>
      <h1>Enter the name of a movie!</h1>
      <form onSubmit={handleSubmit}>
        
          <input type="text" value={searchTerm} onChange={handleSearch}/>
          <input type="submit"/>
        <b id="movie-data"/>
        
    
      </form>
    </div>
  )
}



// import {useState} from 'react';
// export default function MovieSearch() {
//   const [searchTerm, setSearchTerm] =useState;

// const SearchMovieComponent = () => {
//   return (
//     <div>
//         <h1 className='center'>             
//             Search for a Movie!
//         </h1>
//         <form>
//           <label>
//           Search:
//           <input type="text" name="movieName"/>
//           </label>
//           <button>search</button>
//         </form>
        
//         <script src="search.js"/>
          
        
//       </div>
//   )
// }}

// export default SearchMovieComponent
