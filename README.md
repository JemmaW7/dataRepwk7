# Lab 4: React - HTTP & Hooks Data Representation & Querying

The following exercises are related to the use of React.

## Exercise 1: Setting up Git Repository

**Create a Git Repository:** First, create a folder for your React project and initialize it as a Git repository using `git init`. This will allow you to track changes to your project and collaborate effectively.

```bash
git init
```

Stage all files and create the first commit:

```bash
git add .
git commit -m "Initial commit"
```

After staging and committing, rename the default branch to `main` (since Git now uses `main` as the default branch name for new repositories):

```bash
git branch -M main
```

Finally, push the repository to GitHub by linking it to a remote GitHub repository:

```bash
git remote add origin <your-github-repo-url>
git push -u origin main
```

---

## 2. (a) In last week’s lab we built a React Application that embedded components that exchange data. The final solution to last week’s lab can be found at:  
https://github.com/Data-Rep-MERN-Application/lab_three.

However, you should use your lab solution from last week. Clone this application if you did not finish the application last week.

### To clone the application:
```bash
git clone https://github.com/Data-Rep-MERN-Application/lab_three
```
We then need to run:
```bash
npm install
# This will install all the prerequisites for the application.
```

### (b) Add **Axios** to our project. **Axios** is a Promise-based HTTP client used to make requests to a server. It allows you to send asynchronous HTTP requests (such as GET or POST requests) to REST endpoints and handle responses. Axios is often preferred for fetching data in React applications because of its ease of use, ability to transform requests and responses, and support for older browsers compared to the native `fetch` API.

- **Key Features of Axios:**
  - Supports HTTP requests: `GET`, `POST`, `PUT`, `DELETE`, etc.
  - Automatically transforms JSON data.
  - Intercepts requests and responses.
  - Supports request timeout and cancellation.
  - Provides built-in CSRF protection.

Install Axios by running:
```bash
npm install axios
```

### (c) Use the React hook, useEffect, to synchronize a component with an external system.  
Reference: https://react.dev/reference/react/useEffect

### (d) In this lifecycle hook, make an HTTP GET call that will return the JSON data from (https://jsonblob.com/api/jsonblob/1287718524221775872) and assign it to the component state. Use the React hook useState:  
Reference: https://react.dev/reference/react/useState

### What is `useState`?

`useState` is a built-in hook in React that allows you to add state variables to functional components. Before `useState`, managing state in components was only possible in class components, but with this hook, functional components can now store and manage state as well. 

- **Syntax:**
  ```javascript
  const [state, setState] = useState(initialValue);
  ```
  - `state`: This is the current state value, which you can use in your component.
  - `setState`: This is a function that allows you to update the state value.
  - `initialValue`: This is the initial value of the state when the component is first rendered.

For example:
```javascript
const [count, setCount] = useState(0);
```
This creates a `count` state variable with an initial value of `0`, and `setCount` is the function that will be used to update `count`.

In the solution below, `useState` is used to store data returned from an API and manage the state of the application.

### Solution:
```javascript
//Read.js

import Movies from "./movies";
import { useEffect, useState } from "react";
import axios from "axios";

function Read() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('<my_api_url>')
      .then((response) => {
        setMovies(response.data.movies);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>This is my Read Component.</h2>
      <Movies myMovies={movies} />
    </div>
  );
}

export default Read;
```

## 3. (a) Modify the Create component so that it now includes a form that will upload data to a server. An example of this can be found at:  
https://react.dev/reference/react-dom/components#form-components. 

The application should now look like this:

### (b) The application should handle the new events from the button click and log the information submitted in the form to the console as shown below.  
Hint: The code for the movie title input control is:
```html
<div className="form-group">
  <label>Add Movie Title: </label>
  <input type="text"
    className="form-control"
    value={title}
    onChange={(e) => { setTitle(e.target.value) }} 
  />
</div>
```

### Solution:
```javascript
// create.js

import { useState } from "react";

function Create() {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title);
  }

  return (
    <div>
      <h2>This is my Create Component.</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Add Movie Title: </label>
          <input type="text"
            className="form-control"
            value={title}
            onChange={(e) => { setTitle(e.target.value) }}
          />
        </div>
        <input type="submit" value="Add Movie" />
      </form>
    </div>
  );
}

export default Create;
```

### (c) Extend the above code to include fields for **Movie Year** and **Movie Poster**.

- Add a form input field for **Movie Year**, where users can input the release year of the movie.
- Add a form input field for **Movie Poster**, where users can provide a URL to the movie poster.

Make sure that these new fields are managed using React's `useState` and that the input values are logged to the console upon form submission.

---
