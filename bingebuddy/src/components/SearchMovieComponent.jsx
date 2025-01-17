import {useState } from "react";

export default function SearchMovie() {
  let tMovies = [];
  let sMovies = [];
  let initial = [];
  let title = "";
  let poster = "";
  let movieID = "";

  const [searchTerm, setSearchTerm] = useState("");
  const[showMovies, setShowMovies] = useState(initial)

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const displayMovies = function(movie){
    return <ul><ul>{movie[0]}</ul> 
    <a href={movie[2]}><img src={movie[1]}></img></a></ul>
  }
     
  const handleSubmit = () => {
    const fetchData = async () => {
      const result = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=a6836b7c`)
      result.json().then(json => {
        for(let item in json["Search"]){
          title = json["Search"][item]["Title"]
          poster = json["Search"][item]["Poster"]
          movieID = json["Search"][item]["imdbID"]
          tMovies = [title, poster, movieID]
          sMovies.push(tMovies)
        }
        initial = sMovies
        setShowMovies(initial)
        sMovies=[];
      })
    }
    fetchData()
  }

  return(
    <div>
      <h1>Enter the name of a movie!</h1>
      <b>
          <input type="text" value={searchTerm} onChange={handleSearch}/>
          <input type="submit" onClick={handleSubmit}/>
      </b>
      <ul>{showMovies.map(displayMovies)}</ul>
    </div>
  )
}
