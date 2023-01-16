import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import MovieCard from "./MovieCard";
import Loading from "./Loader/Loading";
import "./css/movies.css";
import "./css/formContainer.css";
import CarouselComponent from './Carousel/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MovieNav from './MovieNav/MovieNav';




const api_key = "c9b77bcacc73e615cac9ff002be7f83a"
const popular_movies=`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`;
const topRated_movies=`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`
const upcoming_movies=`https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=1`; 

function Movies() {
    const [movies, setMovies] = useState([]);
    const [movieTitle, setMovieTitle] = useState("")
    const [loading, setLoading] = useState(true);
    const [searchName, setSearchName] = useState("")

    useEffect(() => {
                fetch(popular_movies)
                .then(response =>response.json())
                .then(data=>{console.log(data, "popular movies")
                    setMovieTitle("Películas populares")
                    setMovies(data.results)
                    setLoading(false)})
                }, [])

    const popularMovies = () => {
        fetch(popular_movies)
                .then(response =>response.json())
                .then(data=>{console.log(data, "popular movies")
                    setMovieTitle("Películas populares")
                    setMovies(data.results)
                    setLoading(false)})
    }

    const UpcomingMovies = () => {
        setLoading(true)
            fetch(upcoming_movies)
            .then(response =>response.json())
            .then(data=>{console.log(data, "upcoming movies")
            setMovieTitle("Proximamente")
            setMovies(data.results)
            setLoading(false)
        })
    }

    const topRatedMovies = () => {
        setLoading(true)
            fetch(topRated_movies)
            .then(response =>response.json())
            .then(data=>{console.log(data, "top rated movies")
            setMovieTitle("Mas valoradas")
            setMovies(data.results)
            setLoading(false)
        })
    }

    const getId = (id) => {
        console.log("id")
        //let result = .find(movie => movie.id === id)
        //return result
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
        .then(data=>{console.log(data, "buscando...")
            setMovies(data.results)
            setLoading(false)
            setSearchName("")}
            )


    }


    return (
        <>
            
            <MovieNav
                        className="w-100"
                        popular={() => popularMovies()}
                        topRated={() => topRatedMovies()}
                        upcoming={() => UpcomingMovies()}
                        value={searchName}
                        handleName={changeHandler}
                        search={searchMovies}

                    />
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
                        <h3 className="color-fff">{movieTitle}</h3>
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
                                        getId={() => getId(movieResult.id)}
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