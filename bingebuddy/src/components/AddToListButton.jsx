const AddToListButton = (prop) => {
    const handleclick = () => {
        //todo export prop with ajax to the backend
        console.log(prop)
    }
    return(
    <button onClick={handleclick}>click to add to your watchlist</button>
    )
}
export default AddToListButton