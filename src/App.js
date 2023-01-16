import {BrowserRouter , Routes, Route } from "react-router-dom";
import Title from "./Components/Title";
import Movies from "./Components/Movies";
import Search from "./Components/Search";
import MovieFilteredContainer from "./Components/MovieFilteredContainer";
import NavbarComponent from "./Components/Navbar/Navbar";
import './App.css';
import { TvSeries } from "./Components/Tv/TvSeries";

function App() {
  return (
      <>
          <div className="App">
            <BrowserRouter>
                <NavbarComponent />
                  <Routes>
                    <Route path="/MovieDb" element={<Movies />} />
                    <Route path="/searchMovie" element={<Search />} />
                    <Route path="/MovieFilteredContainer" element={<MovieFilteredContainer />} />
                    <Route path="/TvSeries" element={<TvSeries />} />
                  </Routes>
            </BrowserRouter>
          </div>
      </>
  );
}

export default App;
