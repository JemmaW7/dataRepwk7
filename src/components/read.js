import Movies from "./movies";  // Import the Movies component to display the list of movies
import { useEffect, useState } from "react";  // Import hooks from React
import axios from "axios";  // Import Axios for making HTTP requests

const Read = () => {

  //tore the list of movies fetched from the server
  const [movies, setMovies] = useState([]);  // Initialize `movies` as an empty array

  // useEffect hook to fetch the list of movies when the component mounts
  useEffect(() => {
    // Make an HTTP GET request to the backend API to fetch movies
    axios.get('http://localhost:4000/api/movies')
      .then((response) => {
        console.log(response.data);  // Log the response data (movies list)
        setMovies(response.data);  // Update the state with the fetched movies
      })
      .catch((error) => {
        console.log(error);  // Log any errors encountered during the request
      });
  }, []);  

  return (
    <div>
      <h3>Hello from read component!</h3>
      <Movies myMovies={movies} /> 
    </div>
  );
}

export default Read; 
