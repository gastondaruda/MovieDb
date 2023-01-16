import React, {useState} from "react";
import { Link } from "react-router-dom";
import Loading from "./Loader/Loading"
import MovieCard from "./MovieCard";
import {FaSearch} from "react-icons/fa";

function Search(){
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const searchMovie = async(e)=>{
        e.preventDefault();
        console.log("Searching");
        setLoading(true)
        try{
            const url=`https://api.themoviedb.org/3/search/movie?api_key=c9b77bcacc73e615cac9ff002be7f83a&query=${search}`;
            const res= await fetch(url);
            const data= await res.json();
            console.log(data);
            setMovies(data.results);
            setLoading(false)
        }
        catch(e){
            console.log(e)
        }
    }
    const changeHandler=(e)=>{
        setSearch(e.target.value);
    }
    return(
        <>
            <Link to="/" className="d-flex justify-content-center align-items-center">
                <button className="text-light btn-movieStart">Películas más populares</button>
            </Link>
            <form 
                onSubmit={searchMovie} 
                className="d-flex justify-content-center align-items-center flex-column">
                    <h3 className="text-light">¿Qué película estás buscando?</h3>
                    <div className=''>
                        <input 
                            type="text" 
                            placeholder="Buscar película..."
                            value={search} 
                            onChange={changeHandler} 
                            className="inputSearch">
                        </input>
                        <button 
                            type="submit" 
                            className='btnSearch'>
                                <FaSearch />
                        </button>
                    </div>
                </form>
                {
                loading ? <Loading />
                :
                <>
                            
            
            <div className='moviesContainer'>
                {
                    movies.map((movieResult) =>
                    <MovieCard 
                        key={movieResult.id}
                        title={movieResult.original_title}
                        image={movieResult.poster_path}
                        vote_average={movieResult.vote_average}
                        release_date={movieResult.release_date}
                        overview={movieResult.overview}
                    />
                    )
                }
            </div>
                </>
            }
            </>

    )
}

export default Search