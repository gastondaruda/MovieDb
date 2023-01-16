import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Loading from "./Loader/Loading";
import MovieCard from "./MovieCard";

const API_url="https://api.themoviedb.org/3/movie/popular?api_key=c9b77bcacc73e615cac9ff002be7f83a&language=en-US&page=1";

function MovieFilteredContainer(){
    const [movieFilter, setMovieFilter] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(API_url)
        .then(response =>response.json())
        .then(data=>{console.log(data);
            setMovieFilter(data.results)
            setLoading(false)})
        }, [])

    return(
                <>
                    <Link to="/" className="d-flex justify-content-center align-items-center">
                        <button className="text-light btn-movieStart">Películas más populares</button>
                    </Link> 
                    {
                        loading ? <Loading />
                        :
                        <>
                        <h3 className="d-flex justify-content-center  align-items-center text-light">Movie Filtered Container-incompleto</h3>
                        <div className='moviesContainer'>
                        {
                        movieFilter.filter((item) => item.vote_average >7 && item.vote_average <9).map((movieResult) => <MovieCard 
                        key={movieResult.id}
                        title={movieResult.original_title}
                        image={movieResult.poster_path}
                        vote_average={movieResult.vote_average}
                        release_date={movieResult.release_date}
                        overview={movieResult.overview}
                    />)
                    }
                    </div>
                    </>
                    }
                </>
        )


}

export default MovieFilteredContainer