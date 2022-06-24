import Title from "./Components/Title";
import Movies from "./Components/Movies";
import Search from "./Components/Search";
import MovieFilteredContainer from "./Components/MovieFilteredContainer";
import {BrowserRouter , Routes, Route } from "react-router-dom";


import './App.css';

function App() {
  return (
      <>
          <div className="App">
            <BrowserRouter>
                <Title />
                  <Routes>
                    <Route path="/" element={<Movies />} />
                    <Route path="/searchMovie" element={<Search />} />
                    <Route path="/MovieFilteredContainer" element={<MovieFilteredContainer />} />
                  </Routes>
            </BrowserRouter>
          </div>
      </>
  );
}

export default App;
