import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import MovieCard from "./MovieCard";
import Loading from "./Loading"
import StarsRating from './StarsRating';
import "./css/movies.css";
import "./css/formContainer.css";

const API_url="https://api.themoviedb.org/3/movie/popular?api_key=c9b77bcacc73e615cac9ff002be7f83a&language=en-US&page=1";


function Movies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(API_url)
        .then(response =>response.json())
        .then(data=>{console.log(data);
            setMovies(data.results)
            setLoading(false)})
        }, [])
    
    return (
        <>
            {
                loading ? <Loading />
                :
                <>
                <Link to="/searchMovie" className="d-flex justify-content-center align-items-center">
                    <button className="text-light btn-movieStart d-flex justify-content-center align-items-center">Busca una película</button>
                </Link>              
                <StarsRating className="d-flex justify-content-center"/>
                <Link to="/MovieFilteredContainer" className="d-flex justify-content-start align-items-center">
                    <button className="text-light btn-movieStart d-flex justify-content-center align-items-center">Películas filtradas</button>
                </Link>  
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

export default Movies