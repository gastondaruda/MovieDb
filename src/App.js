import {BrowserRouter , Routes, Route, Navigate, HashRouter } from "react-router-dom";
import Movies from "./Components/Movies";
import Search from "./Components/Search";
import NavbarComponent from "./Components/Navbar/Navbar";
import { TvSeries } from "./Components/Tv/TvSeries";
import ItemDetails from "./Components/ItemDetail/ItemDetail";
import GenresMovie from "./Components/Genres/GenresMovie";
import Actor from "./Components/ActorComponent/ActorMovie";
import SerieDetails from "./Components/SerieDetail/SerieDetails";
import SerieSeasonNumber from "./Components/SerieDetail/SerieSeasonNumber";
import './App.css';

function App() {
  return (
      <>
          <div className="App">
            <HashRouter>
                <NavbarComponent />
                  <Routes>
                    <Route path="/" element={<Movies />} />
                    {/*<Route path="/GenreMovie/:genre" element={<GenresMovie />} />*/}
                    <Route path="/searchMovie" element={<Search />} />
                    <Route path="/actor/:idActor" element={<Actor />} />
                    <Route path="/details/:id" element={<ItemDetails />} />
                    <Route path="/TvSeries" element={<TvSeries />} />
                    <Route path="/TvDetails/:id" element={<SerieDetails />} />
                    <Route path="/TvDetails/:tv_id/:season_number" element={<SerieSeasonNumber />} />
                    <Route path="/*" element={<Navigate to="/" />} />
                  </Routes>
            </HashRouter>
          </div>
      </>
  );
}

export default App;
