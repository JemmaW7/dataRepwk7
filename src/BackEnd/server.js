// Importing required modules
const express = require('express');
const app = express();  // Initialize an Express application
const port = 4000;  // Define the port number for the server

// Route to handle GET request for the root URL
app.get('/', (req, res) => {
    res.send('Hello World');  // Sends a simple response "Hello World" when the root URL is visited
});

// Enable CORS (Cross-Origin Resource Sharing) to allow cross-origin requests
const cors = require('cors');
app.use(cors());  // Use CORS middleware to allow requests from other origins

// Middleware to parse JSON data from incoming requests
app.use(express.json());  // Built-in middleware to automatically parse JSON requests

// Custom middleware to set CORS headers (could be redundant with `cors()` above)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  // Allow requests from any origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");  // Allow specific HTTP methods
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  // Allow specific headers
  next();  // Pass control to the next middleware or route handler
});

// Connect to MongoDB database using Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://jwUSER:jemma@datarlab.in1rd.mongodb.net/');  // MongoDB Atlas connection string

// Define a Mongoose schema for Movie data
const movieSchema = new mongoose.Schema({
    title: String,  // Movie title
    year: String,   // Release year of the movie
    poster: String  // URL for the movie's poster
});
 
// Create a Mongoose model for the Movie schema
const Movie = mongoose.model('Movie', movieSchema);

// Route to create a new movie (POST request)
app.post('/api/movies', async (req, res) => {
    console.log("Movie added: " + req.body.title);  // Log the title of the movie being added

    const { title, year, poster } = req.body;  // Destructure the data from the request body
   
    const newMovie = new Movie({ title, year, poster });  // Create a new movie object
    await newMovie.save();  // Save the new movie to the database
   
    res.status(201).json({ message: 'Movie created successfully', movie: newMovie });  // Send a success response with the new movie
});

// Route to fetch a list of all movies (GET request)
app.get('/api/movies', async (req, res) => {
    const movies = await Movie.find({});  // Fetch all movies from the database
    res.json(movies); 
});

// Route to fetch a specific movie by its ID (GET request)
app.get('/api/movie/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);  // Find a movie by ID from the database
    res.send(movie);  
});


// app.get('/api/movies', (req, res) => {
//     const myMovies = [ // array of movie objects
//         {
//             "Title": "Avengers: Infinity War",
//             "Year": "2018",
//             "imdbID": "tt4154756",
//             "Type": "movie",
//             "Poster": "https://example.com/poster1.jpg"
//         },
//         {
//             "Title": "Captain America: Civil War",
//             "Year": "2016",
//             "imdbID": "tt3498820",
//             "Type": "movie",
//             "Poster": "https://example.com/poster2.jpg"
//         },
//         {
//             "Title": "World War Z",
//             "Year": "2013",
//             "imdbID": "tt0816711",
//             "Type": "movie",
//             "Poster": "https://example.com/poster3.jpg"
//         }
//     ];
//     res.status(201).json({ myMovies }); 
// });


app.post('/api/movies', (req, res) => {
    const movie = req.body;  // Get the movie data from the request body
    res.status(201).json(movie);  
});

// Middleware for parsing URL-encoded data and JSON
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));  // Middleware for parsing URL-encoded data
app.use(bodyParser.json());  // Middleware for parsing JSON data

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);  // Log when the server is successfully running
});
