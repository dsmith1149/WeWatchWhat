import { useEffect, useState } from "react";


export default function SearchMovie() {
  const results = [];
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    
  }
    // const handleSubmit = () => {
    //   let title = ""
    //   fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=a6836b7c`).then(function(response){
    //     response.json().then(function(json){
    //       console.log(json)
    //       for (let list in json.Search){
    //          title = json["Search"][list]["Title"]
    //          results.push(title)
    //          console.log(results)
             
    //       }
    //     })
    //     })
        
    //   }
      
  const handleSubmit = () => {
    const fetchData = async () => {
      const result = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=a6836b7c`)
      result.json().then(json => {
        for(item in json["Search"]){
          result.push(json["Search"][item]["Title"])
        }
      })
    }
    fetchData();
  }

  return(
    <div>
      <h1>Enter the name of a movie!</h1>
      <b>
          <input type="text" value={searchTerm} onChange={handleSearch}/>
          <input type="submit" onClick={handleSubmit}/>
      </b>
      <ol>

      </ol>
      
     
    </div>
  )
}
