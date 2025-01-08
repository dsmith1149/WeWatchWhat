
const SearchMovieComponent = () => {
  return (
    <div>
        <h1 className='center'>             
            Search for a Movie!
        </h1>
        <form>
          <label>
          Search:
          <input type="text" name="movieName"/>
          </label>
          <input type="submit" value="Submit"/>
        </form>
        <script src="search.js"/>
          
        
      </div>
  )
}

export default SearchMovieComponent
