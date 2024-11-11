import { useState } from "react";
import axios from 'axios'; // import axios to make HTTP requests


const Create = () => {

    // state hooks to manage form input values
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [poster, setPoster] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent default form behavior
        
        // log the form data to the console
        console.log(`Title: ${title}, Year: ${year}, Poster: ${poster}`);
        
        // create a movie object to send to the backend
        const movie = {
          title: title,
          year: year,
          poster: poster
        };
        
        // send movie data to backend using axios POST request
        axios.post('http://localhost:4000/api/movies', movie)
          .then((res) => console.log(res.data)) // log success response
          .catch((err) => console.log(err.data)); // log error response
      };

    return (
        <div>
            <h3>Hello from create component!</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Add Movie Title: </label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Movie Year: </label>
                    <input type="text"
                        className="form-control"
                        value={year}
                        onChange={(e) => { setYear(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Movie Poster: </label>
                    <input type="text"
                        className="form-control"
                        value={poster}
                        onChange={(e) => { setPoster(e.target.value) }}
                    />
                </div>
                <div>
                    <input type="submit" value="Add Movie"></input>
                </div>
            </form>
        </div>
    );
}
export default Create;