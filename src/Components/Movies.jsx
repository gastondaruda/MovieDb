import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {Button,Accordion} from 'react-bootstrap';
import MovieCard from "./MovieCard";
import Loading from "./Loader/Loading";
import MovieNav from './MovieNav/MovieNav';
import "./css/movies.css";
import "./css/formContainer.css";


const api_key = "c9b77bcacc73e615cac9ff002be7f83a"
const API_img="https://image.tmdb.org/t/p/w500/";
const popular_movies=`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`;
const topRated_movies=`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`
const upcoming_movies=`https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=1`;
const genresMovie = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US` 
const generosMovies = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=`

function Movies() {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [movieTitle, setMovieTitle] = useState("")
    const [loading, setLoading] = useState(true);
    const [searchName, setSearchName] = useState("")

    
useEffect(() => {
    fetch(popular_movies)
    .then(response =>response.json())
    .then(data=>{console.log(data, "popular movies")
        setMovieTitle("Películas populares")
        setMovies(data.results)}
        )
    .catch(err => console.log(err))
    .finally(() => setLoading(false))
    }, [])


useEffect(() => {
    fetch(genresMovie)
    .then(response => response.json())
    .then(data => {
        setGenres(data.genres)
        console.log(data.genres, "genero de películas")
    })
}, [])


    const popularMovies = () => {
        fetch(popular_movies)
                .then(response =>response.json())
                .then(data=>{console.log(data.total_results, "all popular movies")
                    setMovieTitle("Películas populares")
                    setMovies(data.results)})
                .catch(err => console.log(err))
                .finally(() => setLoading(false))
    }

    const UpcomingMovies = () => {
        setLoading(true)
            fetch(upcoming_movies)
            .then(response =>response.json())
            .then(data=>{
                console.log(data, "upcoming movies")
                setMovieTitle("Proximamente")
                setMovies(data.results)})
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
        }

    const topRatedMovies = () => {
        setLoading(true)
            fetch(topRated_movies)
            .then(response =>response.json())
            .then(data=>{
                console.log(data, "top rated movies")
                setMovieTitle("Mas valoradas")
                setMovies(data.results)})
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    const changeHandler=(e)=>{
        setSearchName(e.target.value);
        console.log(searchName)
    }

    const searchMovies = (e)=>{
        e.preventDefault();
        setLoading(true)
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=c9b77bcacc73e615cac9ff002be7f83a&query=${searchName}`)
        .then(data => data.json())
        .then(data=>{
            console.log(data, "buscando...")
            setMovies(data.results.sort(function(a,b){return b.vote_average - a.vote_average}))
            setSearchName("")})
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
}

const genreSearch = (id,genre) => {
    setLoading(true)
    console.log("Buscando por género..." + id)
    fetch(generosMovies+id)
    .then(response => response.json())
    .then(data => {
        console.log(data.results)
        setMovies(data.results)
        setMovieTitle(genre)
    })
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
}

    return (
        <>
            <MovieNav
                        className="w-100 bg-color"
                        popular={() => popularMovies()}
                        topRated={() => topRatedMovies()}
                        upcoming={() => UpcomingMovies()}
                        value={searchName}
                        handleName={changeHandler}
                        search={searchMovies}
                        genresSearch={() => genreSearch()}
                        arrGenres={genres}
                        filterGenres={() => console.log()}
                    />
                        <ul className="text-white d-flex flex-wrap gap-1 genresContainer bg-color">
                            {genres.map((genero) => {
                                return(
                                    <li key={genero.id} className="list-style-none">
                                        <Button variant="warning" onClick={() => genreSearch(genero.id, genero.name)}>{genero.name}</Button>
                                    </li>
                                )
                            })}
                        </ul>
                {
                    loading ? <Loading />
                    :
                    <>
                    {/*
                        <Link to="/searchMovie" className="d-flex justify-content-center align-items-center">
                            <button className="text-light btn-movieStart d-flex justify-content-center align-items-center">
                                Busca una película
                            </button>
                        </Link>*/
                    }
                        <div className="bg-color">
                            <h3 className="color-fff">{movieTitle}</h3>
                            <div className='moviesContainer d-flex justify-content-around aling-items-center flex-wrap gap-1'>
                                {
                                    movies.map((movieResult) =>
                                        <MovieCard 
                                            key={movieResult.id}
                                            title={movieResult.original_title}
                                            image={API_img+movieResult.poster_path}
                                            vote_average={movieResult.vote_average}
                                            release_date={movieResult.release_date}
                                            overview={movieResult.overview}
                                            movieId={movieResult.id}
                                            movie={true}
                                            tv={false}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </>
                }
        </>
            )
        }
    

export default Movies