import React, { Component } from "react";
import "./App.css";
import MovieBox from "./components/MovieBox.js";
import $ from "jquery";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    //console.log("inisitial");
    // const movies = [
    //   {
    //     id: 0,
    //     poster:
    //       "https://image.tmdb.org/t/p/w185_and_h278_bestv2/3iFm6Kz7iYoFaEcj4fLyZHAmTQA.jpg",
    //     title: "the avenger ingitai",
    //     overview: "hfoieijqefejfe"
    //   },
    //   {
    //     id: 1,
    //     poster:
    //       "https://image.tmdb.org/t/p/w185_and_h278_bestv2/ydUpl3QkVUCHCq1VWvo2rW4Sf7y.jpg",
    //     title: "the avenger",
    //     overview: "hfoieijqefejfe"
    //   }
    // ];
    // var movieBoxes = [];
    // movies.forEach(movie => {
    //   console.log(movie.id);
    //   const movieBox = <MovieBox movie={movie} />;
    //   movieBoxes.push(movieBox);
    //   this.state = { rows: movieBoxes };
    // });

    this.displayAll();
  }
  displayAll() {
    const urlString =
      "https://api.themoviedb.org/3/discover/movie?api_key=4ccda7a34189fcea2fc752a6ee339500";

    $.ajax({
      url: urlString,
      success: searchResults => {
        console.log("fetch data success");
        const results = searchResults.results;
        var movieBoxes = [];
        results.forEach(movie => {
          movie.poster = "https://image.tmdb.org/t/p/w185" + movie.poster_path;
          // console.log(movie.poster_path);
          const movieBox = <MovieBox key={movie.id} movie={movie} />;
          movieBoxes.push(movieBox);
        });
        this.setState({ rows: movieBoxes });
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });
  }
  performSearch(searchTerm) {
    const urlString =
      "https://api.themoviedb.org/3/search/movie?api_key=4ccda7a34189fcea2fc752a6ee339500&query=" +
      searchTerm;

    $.ajax({
      url: urlString,
      success: searchResults => {
        console.log("fetch data success");
        const results = searchResults.results;
        var movieBoxes = [];
        results.forEach(movie => {
          movie.poster = "https://image.tmdb.org/t/p/w185" + movie.poster_path;
          //console.log(movie.poster_path);
          const movieBox = <MovieBox key={movie.id} movie={movie} />;
          movieBoxes.push(movieBox);
        });
        this.setState({ rows: movieBoxes });
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });
  }
  searchChangeHandler(event) {
    //console.log(event.target.value);
    const searchTerm = event.target.value;
    if (searchTerm.trim() === "") {
      //console.log("empty here");
      this.displayAll();
    } else {
      this.performSearch(searchTerm);
    }
  }
  render() {
    return (
      <div className="App">
        <table className="titleBar">
          <tbody>
            <tr>
              <td>Movie Search</td>
            </tr>
          </tbody>
        </table>
        <input
          style={{
            fontSize: 24,
            display: "block",
            width: "100%",
            paddingTop: 8,
            paddingBottom: 8
          }}
          onChange={this.searchChangeHandler.bind(this)}
          placeholder="Enter search term"
        />
        <div className="button-div">
          <button>Popular</button>
          <button>Toprated</button>
          <button>Upcoming</button>
          <button>Playing</button>
        </div>
        <div
          style={{
            position: "relative",
            maxHeight: "550px",
            overflowY: "scroll",
            overflowX: "hidden"
          }}
        >
          {this.state.rows}
        </div>
      </div>
    );
  }
}

export default App;
